const fs = require('fs');
const path = require('path');

const LOGO_MAP = {
    // 2024 mappings
    "Regnum Carya Bra": "Regnum_Carya_Bra",
    "VOIN DONKEY ID": "VOIN_DONKEY_ID",
    "Tong Jia Bao Esports": "Tong_Jia_Bao_Esports",
    "ThunderTalk Gaming": "ThunderTalk_Gaming",
    "Falcons Force": "Falcons_Force",
    "The Vicious": "The_Vicious",
    "De Muerte": "De_Muerte",
    // 2025 mappings
    "Alpha Gaming": "Alpha_Gaming",
    "ULF Esports": "ULF_Esports",
    "Regnum Carya Esports": "Regnum_Carya_Esports",
    "Madbulls": "MadBulls",
    "GOAT Team": "GOAT_Team",
    "Kara Esports": "Kara_Esports",
    "Team Flash": "Team_Flash",
    "Alter Ego Ares": "Alter_Ego_Ares"
};

async function run() {
    const fetch = (await import('node-fetch')).default;
    const YEARS = [2020, 2021, 2022, 2023, 2024, 2025];
    
    for (const year of YEARS) {
        const dataPath = path.join('data', `pmgc_${year}_data.json`);
        if (!fs.existsSync(dataPath)) continue;
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        console.log(`\n--- Fetching logos for ${year} ---`);
        for (let team of data.teams) {
            if (!team.isFinalist) continue; // Only finalists to save time
            
            // Check if file exists locally
            const slug = team.name.toLowerCase().replace(/[^a-z0-9]/g, '_');
            const localPath = path.join('assets', 'logos', `${slug}.png`);
            if (fs.existsSync(localPath)) {
                console.log(`  Skipping ${team.name} (exists)`);
                continue;
            }

            const wikiTitle = LOGO_MAP[team.name] || team.name.replace(/ /g, '_');
            console.log(`  Downloading logo for ${team.name}...`);
            
            try {
                const url = `https://liquipedia.net/pubgmobile/api.php?action=query&titles=${wikiTitle}&redirects=1&prop=revisions&rvprop=content&format=json&formatversion=2`;
                const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
                const json = await res.json();
                
                if (json.query && json.query.pages[0].revisions) {
                    const content = json.query.pages[0].revisions[0].content;
                    const imgMatch = content.match(/\|(?:image|logo|image_light)\s*=\s*([^|\n}]+)/i);
                    if (imgMatch) {
                        const fileName = imgMatch[1].trim();
                        const fileUrl = `https://liquipedia.net/pubgmobile/api.php?action=query&titles=File:${fileName}&prop=imageinfo&iiprop=url&format=json&formatversion=2`;
                        const fileRes = await fetch(fileUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
                        const fileJson = await fileRes.json();
                        const finalUrl = fileJson.query.pages[0].imageinfo[0].url;
                        
                        // Download the file
                        const imgRes = await fetch(finalUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
                        const buffer = await imgRes.buffer();
                        fs.writeFileSync(localPath, buffer);
                        console.log(`    ✅ Saved to ${localPath}`);
                    }
                }
            } catch (e) {
                console.log(`    ❌ Failed: ${e.message}`);
            }
            // Delay to avoid blocks
            await new Promise(r => setTimeout(r, 3000));
        }
    }
}
run();
