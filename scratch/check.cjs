const fs = require('fs');

const years = [2020, 2021];
years.forEach(year => {
    const data = JSON.parse(fs.readFileSync(`data/pmgc_${year}_data.json`));
    console.log(`\n=== Year ${year} ===`);
    let missingOrWeird = [];
    data.teams.forEach(t => {
        if (!fs.existsSync(t.logo)) {
            missingOrWeird.push(`[NOT FOUND] ${t.name}: ${t.logo}`);
        } else if (t.logo.includes('./assets/logos')) {
            missingOrWeird.push(`[STILL IN LOGOS] ${t.name}: ${t.logo}`);
        }
    });

    if (missingOrWeird.length === 0) {
        console.log('All team logos correctly point to an existing local file in PMGC folder.');
    } else {
        console.log(missingOrWeird.join('\n'));
    }
});
