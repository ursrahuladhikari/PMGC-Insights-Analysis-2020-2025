const fs = require('fs');
const path = require('path');

const years = [2021, 2022, 2024, 2025];

years.forEach(year => {
    const dataPath = path.join('data', `pmgc_${year}_data.json`);
    if (!fs.existsSync(dataPath)) {
        console.log(`File not found: ${dataPath}`);
        return;
    }
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    const assetsDir = path.join('assets', `PMGC_${year}`);
    if (!fs.existsSync(assetsDir)) {
        console.log(`Directory not found: ${assetsDir}`);
        return;
    }
    const files = fs.readdirSync(assetsDir);

    let count = 0;
    data.teams.forEach(team => {
        let searchName = team.name.toLowerCase().replace(/[^a-z0-9]/g, '');
        let match = files.find(f => {
            let normalizedFile = f.toLowerCase().replace(/[^a-z0-9]/g, '');
            return normalizedFile.includes(searchName) || searchName.includes(normalizedFile.replace('png',''));
        });

        // Add specific manual overrides if need be, but for now we do fuzzy matching
        
        if (match) {
            team.logo = `./assets/PMGC_${year}/${match}`;
            count++;
        }
    });

    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    console.log(`Updated ${count} out of ${data.teams.length} logos for year ${year}.`);
});
