const fs = require('fs');
const path = require('path');

const dataPath = path.join('data', 'pmgc_2023_data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
const assetsDir = path.join('assets', 'PMGC_2023');
const files = fs.readdirSync(assetsDir);

let count = 0;
data.teams.forEach(team => {
    let searchName = team.name.toLowerCase().replace(/[^a-z0-9]/g, '');
    let match = files.find(f => {
        let normalizedFile = f.toLowerCase().replace(/[^a-z0-9]/g, '');
        // handle things like 'fa' meaning 'faze clan'
        if (searchName === 'fa' && normalizedFile.includes('faze')) return true;
        return normalizedFile.includes(searchName) || searchName.includes(normalizedFile.replace('png',''));
    });

    if (match) {
        team.logo = `./assets/PMGC_2023/${match}`;
        count++;
    }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log(`Updated ${count} logos for year 2023 based on actual folder contents.`);
