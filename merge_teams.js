import fs from 'fs';
import path from 'path';

const YEARS = [2020, 2021, 2022, 2023, 2024, 2025];

const REGION_FILTER_MAP = {
    'SEA': 'SEA',
    'South Asia': 'South Asia',
    'PEL (China)': 'PEL',
    'PEL': 'PEL',
    'Americas': 'Americas',
    'EMEA': 'EMEA',
    'Europe': 'EMEA',
    'Japan': 'Japan',
    'Korea': 'Korea',
    'Wildcard': 'Other',
    'Qualifier': 'Other',
};

function getRegion(scrapedRegion) {
    if (!scrapedRegion) return 'Other';
    for (const [key, val] of Object.entries(REGION_FILTER_MAP)) {
        if (scrapedRegion.includes(key)) return val;
    }
    return 'Other';
}

function getLogo(teamName) {
    const slug = teamName.toLowerCase().replace(/[^a-z0-9]/g, '_');
    return `./assets/logos/${slug}.png`;
}

YEARS.forEach(year => {
    const dataPath = path.join('data', `pmgc_${year}_data.json`);
    const scrapedPath = `teams_year_${year}.json`;

    if (!fs.existsSync(scrapedPath)) return;

    const scrapedTeams = JSON.parse(fs.readFileSync(scrapedPath, 'utf8'));
    let originalData = { teams: [], players_stats: [], tournament_info: { year } };

    if (fs.existsSync(dataPath)) {
        let content = fs.readFileSync(dataPath, 'utf8');
        // Remove UTF-8 BOM if present
        if (content.charCodeAt(0) === 0xFEFF) {
            content = content.slice(1);
        }
        originalData = JSON.parse(content);
    }

    const newTeams = scrapedTeams.map(st => {
        const existing = originalData.teams.find(t => t.name === st.name);
        return {
            ...existing,
            name: st.name,
            region: getRegion(st.region || ''),
            countryCode: st.countryCode || 'un',
            players: st.players || [],
            qualification: st.qualification || '',
            logo: (existing && existing.logo && existing.logo.startsWith('http')) ? existing.logo : getLogo(st.name)
        };
    });


    originalData.teams = newTeams;

    fs.writeFileSync(dataPath, JSON.stringify(originalData, null, 2), 'utf8');
    console.log(`Updated pmgc_${year}_data.json with ${newTeams.length} teams.`);
});
