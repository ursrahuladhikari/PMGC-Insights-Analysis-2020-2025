const fs = require('fs');

function checkYear(year) {
    const path = `data/pmgc_${year}_data.json`;
    if (!fs.existsSync(path)) return;
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    const finalists = data.teams.filter(t => t.isFinalist);
    console.log(`Year ${year}: Found ${finalists.length} finalists`);
    
    const missingRank = finalists.filter(t => t.finalsRank === null);
    if (missingRank.length > 0) {
        console.log(`Warning: ${missingRank.length} finalists in ${year} have no rank!`);
        missingRank.forEach(t => console.log(' - ' + t.name));
    }

    const missingPoints = finalists.filter(t => t.totalPoints === null);
    if (missingPoints.length > 0) {
        console.log(`Warning: ${missingPoints.length} finalists in ${year} have no totalPoints!`);
    }
}

[2020, 2021, 2022, 2023, 2024, 2025].forEach(checkYear);
