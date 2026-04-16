const fs = require('fs');
const path = require('path');

const years = [2020, 2021, 2022, 2023, 2024, 2025];
let renamedCount = 0;

years.forEach(year => {
    const file = path.join('data', `pmgc_${year}_data.json`);
    if (fs.existsSync(file)) {
        let changed = false;
        const data = JSON.parse(fs.readFileSync(file, 'utf8'));
        data.teams.forEach(team => {
            if (team.name === 'Fa') {
                team.name = 'FaZe Clan';
                changed = true;
                renamedCount++;
            }
        });
        if (changed) {
            fs.writeFileSync(file, JSON.stringify(data, null, 2));
        }
    }
});

console.log(`Renamed Fa to FaZe Clan in ${renamedCount} places.`);
