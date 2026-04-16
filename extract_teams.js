/**
 * Final PMGC team extractor - fixed link cleaning
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

const REGION_FILTER_MAP = {
    'SEA': 'SEA',
    'South Asia': 'South Asia',
    'PEL': 'PEL',
    'Americas': 'Americas',
    'EMEA': 'EMEA',
    'Europe': 'EMEA',
    'Japan': 'Japan',
    'Korea': 'Korea',
};

function cleanName(raw) {
    if (!raw) return '';
    // Handle [[Link|Display]] or [[Display]]
    let name = raw.replace(/\[\[([^\]|]+\|)?([^\]]+)\]\]/g, '$2');
    // Remove leading [[ if any remain
    name = name.replace(/^\[\[/, '');
    // Remove templates like {{Team|...}}
    name = name.replace(/\{\{[^|}]+\|?([^|}]*)\}\}/g, '$1');
    // Trim pipes and braces
    name = name.replace(/[{}|]/g, '').trim();
    return name;
}

function parseWikitext(wikitext, year) {
    const teams = [];
    const seen = new Set();
    const teamCardRegex = /\{\{TeamCard(?:Small)?\s*\|([\s\S]*?)(?=\{\{TeamCard|\{\{box end|\n\}\}|\z)/gi;
    
    let match;
    while ((match = teamCardRegex.exec(wikitext)) !== null) {
        const block = match[1];
        let name = '';
        const nameM = block.match(/team\s*=\s*([^\n|]+)/i);
        if (nameM) {
            name = cleanName(nameM[1]);
        } else {
            const posM = block.match(/^([^\n|]+)/);
            if (posM) name = cleanName(posM[1]);
        }

        if (!name || name.toLowerCase() === 'team' || seen.has(name.toLowerCase())) continue;

        let countryCode = null;
        const flagM = block.match(/flag\s*=\s*([a-z]{2,3})/i);
        if (flagM) countryCode = flagM[1].toLowerCase();
        
        // Comprehensive ISO mapping
        const isoMap = {'uae':'ae','ksa':'sa','ger':'de','bra':'br','tha':'th','mmr':'mm','nep':'np','ban':'bd','pak':'pk','mas':'my','idn':'id','vnm':'vn','jpn':'jp','kor':'kr','usa':'us','gbr':'gb','uk':'gb','tur':'tr','chn':'cn'};
        if (isoMap[countryCode]) countryCode = isoMap[countryCode];

        const players = [];
        for (let i = 1; i <= 6; i++) {
            const pM = block.match(new RegExp(`\\|p${i}\\s*=\\s*([^\\n|{}]+)`, 'i'));
            if (pM) players.push(cleanName(pM[1]));
        }

        const qualM = block.match(/(?:qualifier|qualification)\s*=\s*([^\n|]+)/i);
        let qual = qualM ? cleanName(qualM[1]) : '';
        
        let region = 'Other';
        for (const [key, val] of Object.entries(REGION_FILTER_MAP)) {
            if (qual.toLowerCase().includes(key.toLowerCase()) || block.toLowerCase().includes(key.toLowerCase())) {
                region = val;
                break;
            }
        }

        seen.add(name.toLowerCase());
        teams.push({
            name,
            countryCode: countryCode && countryCode.length === 2 ? countryCode : 'un',
            players: [...new Set(players)].filter(p => p.length > 1),
            region,
            qualification: qual || 'Global Stage'
        });
    }
    return teams;
}

async function run() {
    const fetch = (await import('node-fetch')).default;
    for (const [year, page] of Object.entries(PAGES)) {
        console.log(`Extracting ${year}...`);
        const res = await fetch(`${BASE}?action=query&titles=${page}&prop=revisions&rvprop=content&rvslots=main&format=json&formatversion=2`);
        const data = await res.json();
        const teams = parseWikitext(data.query.pages[0].revisions[0].slots.main.content, year);
        fs.writeFileSync(`teams_year_${year}.json`, JSON.stringify(teams, null, 2), 'utf8');
        await new Promise(r => setTimeout(r, 1000));
    }
}
run();
