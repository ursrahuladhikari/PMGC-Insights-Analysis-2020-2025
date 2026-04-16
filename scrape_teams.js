import * as cheerio from 'cheerio';
import fs from 'fs';

const YEARS = [
    { year: 2020, url: 'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2020' },
    { year: 2021, url: 'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2021' },
    { year: 2022, url: 'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2022' },
    { year: 2023, url: 'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2023' },
    { year: 2024, url: 'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2024' },
    { year: 2025, url: 'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2025' }
];

// Maps Liquipedia country names/flags to ISO 2-letter codes
const COUNTRY_MAP = {
    'Thailand': 'th', 'Indonesia': 'id', 'Malaysia': 'my', 'Philippines': 'ph',
    'Vietnam': 'vn', 'Myanmar': 'mm', 'Cambodia': 'kh', 'Singapore': 'sg',
    'China': 'cn', 'Korea': 'kr', 'South Korea': 'kr', 'Japan': 'jp', 'Taiwan': 'tw',
    'Turkey': 'tr', 'Russia': 'ru', 'Kazakhstan': 'kz', 'Ukraine': 'ua',
    'Romania': 'ro', 'Germany': 'de', 'France': 'fr', 'Serbia': 'rs',
    'Brazil': 'br', 'Argentina': 'ar', 'Chile': 'cl', 'Mexico': 'mx', 'Peru': 'pe',
    'United States': 'us', 'USA': 'us', 'Canada': 'ca',
    'India': 'in', 'Pakistan': 'pk', 'Nepal': 'np', 'Bangladesh': 'bd', 'Sri Lanka': 'lk',
    'Saudi Arabia': 'sa', 'UAE': 'ae', 'Iraq': 'iq', 'Jordan': 'jo', 'Egypt': 'eg',
    'Morocco': 'ma', 'Algeria': 'dz', 'Libya': 'ly',
    'Mongolia': 'mn', 'Uzbekistan': 'uz', 'Kyrgyzstan': 'kg',
    'South Africa': 'za', 'Nigeria': 'ng',
    'International': 'un', 'Mixed': 'un', 'Various': 'un'
};

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchPage(url) {
    const fetch = (await import('node-fetch')).default;
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
}

function extractFlagCode(flagEl, $) {
    // Try to extract from img src like "/commons/images/3/3d/Flag_Thailand.png"
    const imgSrc = $(flagEl).find('img').attr('src') || '';
    const alt = $(flagEl).find('img').attr('alt') || '';
    const title = $(flagEl).find('a').attr('title') || '';

    const name = alt || title;
    if (COUNTRY_MAP[name]) return COUNTRY_MAP[name];

    // Try extracting from img filename
    for (const [country, code] of Object.entries(COUNTRY_MAP)) {
        if (imgSrc.includes(country.replace(' ', '_')) || imgSrc.toLowerCase().includes(code + '.png')) {
            return code;
        }
    }
    return null;
}

async function scrapeYear(year, url) {
    console.log(`\n=== ${year} ===`);
    const html = await fetchPage(url);
    const $ = cheerio.load(html);
    const teams = [];

    // Liquipedia uses .teamcard or similar structures
    // Try multiple selectors
    const teamCards = $('.teamcard, .template-box, .table-team');

    console.log(`  Found ${teamCards.length} team cards via .teamcard`);

    teamCards.each((i, card) => {
        const $card = $(card);

        // Team name - usually in a center/b tag or link
        let name = $card.find('center b a, center b, .teamcard-name, th a').first().text().trim();
        if (!name) name = $card.find('a[title]').first().attr('title') || '';

        // Country/flag
        let countryCode = null;
        const flagEl = $card.find('.flag, [class*="flag"]').first();
        if (flagEl.length) {
            countryCode = extractFlagCode(flagEl, $);
        }
        // Try from img alt containing country
        if (!countryCode) {
            $card.find('img').each((_, img) => {
                const alt = $(img).attr('alt') || '';
                if (COUNTRY_MAP[alt]) { countryCode = COUNTRY_MAP[alt]; return false; }
            });
        }

        // Players - usually in a list
        const players = [];
        $card.find('td a[href*="player"], td a[href*="User"]').each((_, el) => {
            const p = $(el).text().trim();
            if (p && p.length < 40) players.push(p);
        });

        // Region from qualification / header above
        const region = $card.closest('table').prev('h3,h2').text().trim() ||
                       $card.find('.teamcard-region').text().trim() || 'Unknown';

        if (name) {
            teams.push({ name, countryCode, players: players.slice(0, 6), region });
        }
    });

    // Fallback: scrape from the participants table
    if (teams.length === 0) {
        console.log('  Trying participants table fallback...');
        $('table').each((_, table) => {
            const $table = $(table);
            const headers = $table.find('th').map((_, th) => $(th).text().trim().toLowerCase()).get();
            const hasTeam = headers.some(h => h.includes('team'));
            if (!hasTeam) return;

            $table.find('tr').each((_, row) => {
                const $row = $(row);
                const cells = $row.find('td');
                if (cells.length < 2) return;

                let name = '', countryCode = null, region = '';

                cells.each((ci, cell) => {
                    const $cell = $(cell);
                    const text = $cell.text().trim();
                    const flag = $cell.find('[class*="flag"], img[alt]').first();

                    if (flag.length && !countryCode) {
                        const alt = flag.find('img').attr('alt') || $(flag).attr('alt') || '';
                        countryCode = COUNTRY_MAP[alt] || null;
                    }

                    if ($cell.find('a[href*="team"], b a').length && !name) {
                        name = $cell.find('b a, a').first().text().trim();
                    }
                    if (text.match(/qual|pmpl|region/i) && !region) region = text;
                });

                if (name) teams.push({ name, countryCode, players: [], region });
            });
        });
    }

    // Dump ALL text with "team" nearby to help debug
    if (teams.length === 0) {
        console.log('  No teams parsed — dumping page links for debugging:');
        let links = [];
        $('a[href*="pubgmobile/"]').each((_, el) => {
            const href = $(el).attr('href') || '';
            const text = $(el).text().trim();
            if (text.length > 2 && text.length < 60 && !href.includes('Category')) {
                links.push(`  LINK: ${text} => ${href}`);
            }
        });
        console.log(links.slice(0, 30).join('\n'));
    } else {
        console.log(`  Extracted ${teams.length} teams`);
        teams.forEach(t => console.log(`    - ${t.name} [${t.countryCode || '??'}] | ${t.region}`));
    }

    return teams;
}

async function run() {
    for (const { year, url } of YEARS) {
        try {
            const teams = await scrapeYear(year, url);
            fs.writeFileSync(`teams_raw_${year}.json`, JSON.stringify(teams, null, 2), 'utf8');
        } catch (e) {
            console.error(`ERROR ${year}:`, e.message);
        }
        await sleep(3500);
    }
    console.log('\nDone! Check teams_raw_YEAR.json files');
}

run();
