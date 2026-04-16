const fs = require('fs');

const years = [2020, 2021, 2022, 2023, 2024, 2025];
let brokenLogos = [];

years.forEach(year => {
    let dataPath = `data/pmgc_${year}_data.json`;
    if (fs.existsSync(dataPath)) {
        let data = JSON.parse(fs.readFileSync(dataPath));
        data.teams.forEach(t => {
            if (!fs.existsSync(t.logo)) {
                brokenLogos.push(`[${year}] ${t.name} => ${t.logo}`);
            }
        });
    }
});

console.log('Broken logos:');
console.log(brokenLogos.join('\n'));
