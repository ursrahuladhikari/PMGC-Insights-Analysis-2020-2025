import fs from 'fs';
import path from 'path';

const TEAM_MAP_2020 = {
    "Bigetron RA": "Bigetron_by_Vitality",
    "Futbolist": "Futbolist",
    "Elites United Team": "Elites_United_Team",
    "Aerowolf LIMAX": "Aerowolf_LIMAX",
    "Secret Jin": "Secret_Jin",
    "RRQ Athena": "RRQ_Athena",
    "POWER888 KPS": "POWER888_KPS",
    "Team Secret": "Team_Secret",
    "Abrupt Slayers": "Abrupt_Slayers",
    "DRS Gaming": "DRS_Gaming",
    "A1 eSports": "A1_eSports",
    "Loops": "Loops_Esports",
    "The Unnamed": "The_Unnamed",
    "Execute Esports": "Execute_Esports",
    "A7 eSports": "Alpha7_Esports",
    "Natus Vincere": "Natus_Vincere",
    "Klas Digital Athletics": "Digital_Athletics",
    "GODSENT": "GODSENT",
    "Konina Power": "Konina_Power",
    "Four Angry Men": "Four_Angry_Men",
    "Nova Esports": "Nova_Esports_(China)",
    "BLUE BEES": "BLUE_BEES",
    "Archer Gaming": "Archer_Gaming",
    "Zeus Esports": "Zeus_Esports"
};

async function run() {
    const fetch = (await import('node-fetch')).default;
    const dataPath = path.join('data', 'pmgc_2020_data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

    for (let team of data.teams) {
        if (team.logo && team.logo.startsWith('http')) continue;

        const wikiTitle = TEAM_MAP_2020[team.name] || team.name.replace(/ /g, '_');
        console.log(`Processing ${team.name}...`);

        try {
            const url = `https://liquipedia.net/pubgmobile/api.php?action=query&titles=${wikiTitle}&redirects=1&prop=revisions&rvprop=content&format=json&formatversion=2`;
            const res = await fetch(url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            });
            const text = await res.text();
            if (text.startsWith('<!DOCTYPE')) {
                console.log("  🛑 Blocked by WAF. Cooling down...");
                await new Promise(r => setTimeout(r, 10000));
                continue;
            }
            const json = JSON.parse(text);
            const content = json.query.pages[0].revisions[0].content;
            const imgMatch = content.match(/\|(?:image|logo|image_light)\s*=\s*([^|\n}]+)/i);
            if (imgMatch) {
                const fileName = imgMatch[1].trim();
                const fileUrl = `https://liquipedia.net/pubgmobile/api.php?action=query&titles=File:${fileName}&prop=imageinfo&iiprop=url&format=json&formatversion=2`;
                const fileRes = await fetch(fileUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
                const fileJson = await fileRes.json();
                team.logo = fileJson.query.pages[0].imageinfo[0].url;
                console.log(`  ✅ ${team.logo.substring(0, 40)}`);
            }
        } catch (e) {
            console.log(`  ❌ ${e.message}`);
        }
        await new Promise(r => setTimeout(r, 4000));
    }
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
}
run();
