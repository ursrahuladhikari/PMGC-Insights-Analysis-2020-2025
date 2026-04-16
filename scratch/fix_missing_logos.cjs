const fs = require('fs');
const path = require('path');

const years = [2020, 2021, 2022, 2023, 2024, 2025];
let countFilesCopied = 0;
let countLinksUpdated = 0;

years.forEach(year => {
    const dataPath = path.join('data', `pmgc_${year}_data.json`);
    if (!fs.existsSync(dataPath)) return;
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    const yearDir = path.join('assets', `PMGC_${year}`);
    if (!fs.existsSync(yearDir)) {
        fs.mkdirSync(yearDir, { recursive: true });
    }

    let dirty = false;

    data.teams.forEach(team => {
        if (team.logo.includes('./assets/logos/')) {
            const filename = path.basename(team.logo);
            const sourcePath = path.join('assets', 'logos', filename);
            const destPath = path.join('assets', `PMGC_${year}`, filename);

            if (fs.existsSync(sourcePath)) {
                // copy file
                if (!fs.existsSync(destPath)) {
                    fs.copyFileSync(sourcePath, destPath);
                    countFilesCopied++;
                }

                // update JSON
                team.logo = `./assets/PMGC_${year}/` + filename;
                countLinksUpdated++;
                dirty = true;
            } else {
                console.log(`Source logo not found for ${team.name} (${year}): ${sourcePath}`);
                // if the default doesn't even exist in logos, point it to the PMGC_year anyway because we might add it later
                team.logo = `./assets/PMGC_${year}/` + filename;
                countLinksUpdated++;
                dirty = true;
            }
        }
    });

    if (dirty) {
        fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    }
});

console.log(`Copied ${countFilesCopied} physical files.`);
console.log(`Updated ${countLinksUpdated} links in JSONs.`);
