/**
 * Precise PMGC team scraper - targets the Participants section tables
 * Uses the teamcard-inner structure Liquipedia uses for participants
 */
import * as cheerio from 'cheerio';
import fs from 'fs';

const YEARS = [
    { year: 2020, url: 'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2020' },
    { year: 2021, url: 'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2021' },
    { year: 2022, url: 'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2022' },
    { year: 2023, url: 'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2023' },
    { year: 2024, url: 'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2024' },
    { year: 2025, url: 'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2025' },
];

// Flag image URL → ISO2 mapping from Liquipedia's standard flag names
const FLAG_TO_ISO = {
    'Afghanistan': 'af', 'Algeria': 'dz', 'Argentina': 'ar',
    'Armenia': 'am', 'Australia': 'au', 'Bangladesh': 'bd',
    'Brazil': 'br', 'Cambodia': 'kh', 'Canada': 'ca',
    'Chile': 'cl', 'China': 'cn', 'Colombia': 'co',
    'Egypt': 'eg', 'France': 'fr', 'Germany': 'de',
    'Honduras': 'hn', 'India': 'in', 'Indonesia': 'id',
    'Iraq': 'iq', 'Japan': 'jp', 'Jordan': 'jo',
    'Kazakhstan': 'kz', 'South Korea': 'kr', 'Kyrgyzstan': 'kg',
    'Kuwait': 'kw', 'Libya': 'ly', 'Lithuania': 'lt',
    'Malaysia': 'my', 'Mexico': 'mx', 'Moldova': 'md',
    'Mongolia': 'mn', 'Morocco': 'ma', 'Myanmar': 'mm',
    'Nepal': 'np', 'Netherlands': 'nl', 'Nigeria': 'ng',
    'Pakistan': 'pk', 'Peru': 'pe', 'Philippines': 'ph',
    'Puerto Rico': 'pr', 'Romania': 'ro', 'Russia': 'ru',
    'Saudi Arabia': 'sa', 'Serbia': 'rs', 'Singapore': 'sg',
    'South Africa': 'za', 'Sri Lanka': 'lk', 'Switzerland': 'ch',
    'Syria': 'sy', 'Taiwan': 'tw', 'Thailand': 'th',
    'Turkey': 'tr', 'Ukraine': 'ua', 'United Arab Emirates': 'ae',
    'United Kingdom': 'gb', 'United States': 'us', 'Uruguay': 'uy',
    'Uzbekistan': 'uz', 'Venezuela': 've', 'Vietnam': 'vn',
    'Belarus': 'by', 'Ireland': 'ie',
};

function getCountryCode(imgAlt, imgSrc) {
    // Direct match by alt text
    if (FLAG_TO_ISO[imgAlt]) return FLAG_TO_ISO[imgAlt];

    // Try to extract country name from Liquipedia flag image paths
    // e.g. /commons/images/7/7d/Flag_Thailand.png
    const match = (imgSrc || '').match(/Flag_([A-Za-z_]+)\.png/);
    if (match) {
        const name = match[1].replace(/_/g, ' ');
        if (FLAG_TO_ISO[name]) return FLAG_TO_ISO[name];
    }
    return null;
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function scrapeYear(year, url) {
    const fetch = (await import('node-fetch')).default;
    console.log(`\n=== ${year}: ${url} ===`);
    
    const res = await fetch(url, {
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            'Accept-Language': 'en-US,en;q=0.9'
        }
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    
    const teams = [];
    const seen = new Set();

    // Strategy 1: Parse .teamcard divs (most common Liquipedia structure)
    $('.teamcard').each((_, card) => {
        const $card = $(card);
        
        // Team name: usually in <center><b><a>Name</a></b></center>
        const nameEl = $card.find('center b a, center b').first();
        const name = nameEl.text().trim();
        if (!name || seen.has(name)) return;

        // Country: from flag image in the teamcard header
        let countryCode = null;
        $card.find('img').each((_, img) => {
            const alt = $(img).attr('alt') || '';
            const src = $(img).attr('src') || '';
            const code = getCountryCode(alt, src);
            if (code && !countryCode) countryCode = code;
        });

        // Players: links inside the player rows
        const players = [];
        $card.find('a').each((_, a) => {
            const href = $(a).attr('href') || '';
            const text = $(a).text().trim();
            // Player links typically go to /pubgmobile/Player_name
            if (href.includes('/pubgmobile/') && text && text.length < 30 && text !== name) {
                players.push(text);
            }
        });

        // Region: look for qualifier info
        const qualText = $card.find('small, .teamcard-qualifier').text().trim();

        seen.add(name);
        teams.push({ name, countryCode, players: [...new Set(players)].slice(0, 6), qualification: qualText });
    });

    console.log(`  Strategy 1 (teamcard): ${teams.length} teams`);

    // Strategy 2: Parse participant tables if teamcards not found/few
    if (teams.length < 5) {
        // Find the Participants section
        let inParticipants = false;
        $('h2, h3').each((_, h) => {
            if ($(h).text().match(/Participant|Team|Qualified/i)) inParticipants = true;
        });

        // Parse tables that look like participant lists
        $('table').each((_, table) => {
            const $table = $(table);
            const tableText = $table.text();
            if (!tableText.match(/Qualification|Region|PMPL|Qualifier/i)) return;

            $table.find('tr').each((_, row) => {
                const $row = $(row);
                if ($row.find('th').length) return; // skip headers

                let name = '', countryCode = null, qualification = '', region = '';

                $row.find('td').each((ci, td) => {
                    const $td = $(td);
                    const text = $td.text().trim();

                    // Flag img
                    $td.find('img').each((_, img) => {
                        const alt = $(img).attr('alt') || '';
                        const src = $(img).attr('src') || '';
                        const code = getCountryCode(alt, src);
                        if (code && !countryCode) countryCode = code;
                    });

                    // Team name
                    const teamLink = $td.find('b a, a[href*="team"]').first();
                    if (teamLink.length && !name) name = teamLink.text().trim();

                    // Qualification
                    if (text.match(/PMPL|Qualifier|League|Invited|Direct|Wild/i)) qualification = text;
                });

                if (name && !seen.has(name)) {
                    seen.add(name);
                    teams.push({ name, countryCode, players: [], qualification });
                }
            });
        });

        console.log(`  Strategy 2 (table): ${teams.length} teams total`);
    }

    // Print results
    teams.forEach(t => {
        const flag = t.countryCode ? `[${t.countryCode}]` : '[??]';
        console.log(`  ${flag} ${t.name} | ${t.qualification || '-'}`);
    });

    return teams;
}

async function run() {
    for (const { year, url } of YEARS) {
        try {
            const teams = await scrapeYear(year, url);
            fs.writeFileSync(`teams_raw_${year}.json`, JSON.stringify(teams, null, 2), 'utf8');
            console.log(`  → Saved teams_raw_${year}.json`);
        } catch (e) {
            console.error(`  ERROR ${year}:`, e.message);
        }
        if (YEARS.indexOf(YEARS.find(y => y.year === year)) < YEARS.length - 1) {
            await sleep(3000);
        }
    }
    console.log('\n✅ Done!');
}

run();
