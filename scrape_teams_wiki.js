/**
 * Uses Liquipedia's public API to get team data for each PMGC year
 * Endpoint: https://liquipedia.net/pubgmobile/api.php (MediaWiki API)
 */
import fs from 'fs';

const BASE = 'https://liquipedia.net/pubgmobile/api.php';

const PAGES = {
    2020: 'PUBG_Mobile_Global_Championship/2020',
    2021: 'PUBG_Mobile_Global_Championship/2021',
    2022: 'PUBG_Mobile_Global_Championship/2022',
    2023: 'PUBG_Mobile_Global_Championship/2023',
    2024: 'PUBG_Mobile_Global_Championship/2024',
    2025: 'PUBG_Mobile_Global_Championship/2025',
};

const FLAG_TO_ISO = {
    'Afghanistan': 'af', 'Algeria': 'dz', 'Argentina': 'ar', 'Armenia': 'am',
    'Australia': 'au', 'Bangladesh': 'bd', 'Belarus': 'by', 'Brazil': 'br',
    'Cambodia': 'kh', 'Canada': 'ca', 'Chile': 'cl', 'China': 'cn',
    'Colombia': 'co', 'Egypt': 'eg', 'France': 'fr', 'Germany': 'de',
    'Honduras': 'hn', 'India': 'in', 'Indonesia': 'id', 'Iraq': 'iq',
    'Ireland': 'ie', 'Japan': 'jp', 'Jordan': 'jo', 'Kazakhstan': 'kz',
    'South Korea': 'kr', 'Korea': 'kr', 'Kyrgyzstan': 'kg', 'Kuwait': 'kw',
    'Libya': 'ly', 'Lithuania': 'lt', 'Malaysia': 'my', 'Mexico': 'mx',
    'Moldova': 'md', 'Mongolia': 'mn', 'Morocco': 'ma', 'Myanmar': 'mm',
    'Nepal': 'np', 'Netherlands': 'nl', 'Nigeria': 'ng', 'Pakistan': 'pk',
    'Peru': 'pe', 'Philippines': 'ph', 'Puerto Rico': 'pr', 'Romania': 'ro',
    'Russia': 'ru', 'Saudi Arabia': 'sa', 'Serbia': 'rs', 'Singapore': 'sg',
    'South Africa': 'za', 'Sri Lanka': 'lk', 'Switzerland': 'ch', 'Syria': 'sy',
    'Taiwan': 'tw', 'Thailand': 'th', 'Turkey': 'tr', 'Ukraine': 'ua',
    'United Arab Emirates': 'ae', 'UAE': 'ae', 'United Kingdom': 'gb', 'UK': 'gb',
    'United States': 'us', 'USA': 'us', 'Uruguay': 'uy', 'Uzbekistan': 'uz',
    'Venezuela': 've', 'Vietnam': 'vn',
};

// Extract teamcard data from wikitext
function parseWikitext(wikitext, year) {
    const teams = [];
    const seen = new Set();

    // Match TeamCard templates: {{TeamCard|...}}
    const teamCardRegex = /\{\{TeamCard(?:Small)?\s*\|([\s\S]*?)(?=\{\{TeamCard|\{\{box end|\n\}\}|\z)/gi;
    
    // Also try direct team table rows
    // Pattern: | [[Team Name]] || {{flag|xx}} || region || qualification
    const tableRowRegex = /\|\s*\[\[([^\]|]+)(?:\|[^\]]+)?\]\]\s*\|[|\s]*\{\{flag\|([a-z]{2})\}\}/gi;

    let match;

    // Try TeamCard templates first
    while ((match = teamCardRegex.exec(wikitext)) !== null) {
        const block = match[1];

        // Team name
        const nameMatch = block.match(/team\s*=\s*([^\n|]+)/i);
        let name = nameMatch ? nameMatch[1].trim().replace(/\[\[|\]\]/g, '') : null;
        if (!name) continue;
        // Clean pipe-links [[TeamName|Display]] → Display or TeamName
        name = name.replace(/\[\[[^\]|]+\|([^\]]+)\]\]/g, '$1');
        name = name.replace(/\[\[([^\]]+)\]\]/g, '$1');
        name = name.trim();

        if (!name || seen.has(name.toLowerCase())) continue;

        // Country via {{flag|xx}} or |p1flag= or |teamflag=
        let countryCode = null;
        const flagMatches = [...block.matchAll(/\{\{flag\|([a-z]{2,3})\}\}/gi)];
        if (flagMatches.length) countryCode = flagMatches[0][1].toLowerCase();
        if (!countryCode) {
            const tfMatch = block.match(/teamflag\s*=\s*([a-z]{2,3})/i);
            if (tfMatch) countryCode = tfMatch[1].toLowerCase();
        }

        // Players
        const players = [];
        const playerRegex = /\|p\d+\s*=\s*([^\n|{]+)/gi;
        let pm;
        while ((pm = playerRegex.exec(block)) !== null) {
            const p = pm[1].trim().replace(/\[\[|\]\]/g, '').split('|').pop().trim();
            if (p && p.length < 30 && !p.match(/^\s*$/) && p !== name) players.push(p);
        }

        // Qualification
        const qualMatch = block.match(/(?:qualifier|qualification|place)\s*=\s*([^\n|]+)/i);
        const qual = qualMatch ? qualMatch[1].trim().replace(/\[\[|\]\]/g, '').replace(/\{\{[^}]+\}\}/g, '').trim() : '';

        seen.add(name.toLowerCase());
        teams.push({ name, countryCode, players: [...new Set(players)].slice(0, 6), qualification: qual });
    }

    if (teams.length > 0) {
        console.log(`  TeamCard parser: ${teams.length} teams`);
        return teams;
    }

    // Fallback: parse table rows with flag templates
    while ((match = tableRowRegex.exec(wikitext)) !== null) {
        const name = match[1].split('|').pop().trim();
        const code = match[2].toLowerCase();
        if (name && !seen.has(name.toLowerCase())) {
            seen.add(name.toLowerCase());
            teams.push({ name, countryCode: code, players: [], qualification: '' });
        }
    }

    // Another fallback: find lines with both team links and flag templates
    const lines = wikitext.split('\n');
    for (const line of lines) {
        if (!line.includes('{{flag|') && !line.includes('{{Flag|')) continue;
        const nameM = line.match(/\[\[([^\]|]+?)(?:\|[^\]]+)?\]\]/);
        const flagM = line.match(/\{\{[Ff]lag\|([a-z]{2,3})\}\}/);
        if (nameM && flagM) {
            const name = nameM[1].trim();
            if (!seen.has(name.toLowerCase()) && name.length > 2 && !name.includes('/')) {
                seen.add(name.toLowerCase());
                teams.push({ name, countryCode: flagM[1].toLowerCase(), players: [], qualification: '' });
            }
        }
    }

    console.log(`  Fallback parser: ${teams.length} teams`);
    return teams;
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function getWikitext(page) {
    const fetch = (await import('node-fetch')).default;
    const params = new URLSearchParams({
        action: 'query',
        titles: page,
        prop: 'revisions',
        rvprop: 'content',
        rvslots: 'main',
        format: 'json',
        formatversion: '2',
    });
    const url = `${BASE}?${params}`;
    const res = await fetch(url, {
        headers: {
            'User-Agent': 'PMGCDashboard/1.0 (Educational project)',
            'Accept': 'application/json'
        }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const pages = data.query?.pages || [];
    const pageData = pages[0];
    if (!pageData || pageData.missing) throw new Error(`Page not found: ${page}`);
    return pageData.revisions?.[0]?.slots?.main?.content || '';
}

async function run() {
    for (const [yearStr, page] of Object.entries(PAGES)) {
        const year = parseInt(yearStr);
        console.log(`\n=== ${year} ===`);
        try {
            const wikitext = await getWikitext(page);
            console.log(`  Wikitext length: ${wikitext.length} chars`);
            
            // Save raw wikitext for inspection
            fs.writeFileSync(`wiki_raw_${year}.txt`, wikitext.substring(0, 20000), 'utf8');
            
            const teams = parseWikitext(wikitext, year);
            
            if (teams.length > 0) {
                console.log(`  ✅ ${teams.length} teams parsed`);
                teams.forEach(t => console.log(`    [${t.countryCode || '??'}] ${t.name}`));
                fs.writeFileSync(`teams_clean_${year}.json`, JSON.stringify(teams, null, 2), 'utf8');
            } else {
                console.log(`  ❌ No teams found — check wiki_raw_${year}.txt`);
            }
        } catch (e) {
            console.error(`  ERROR: ${e.message}`);
        }
        await sleep(3000);
    }
    console.log('\n✅ All done!');
}

run();
