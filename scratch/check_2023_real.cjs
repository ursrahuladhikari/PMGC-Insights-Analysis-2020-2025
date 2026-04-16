const fs = require('fs');

const data = JSON.parse(fs.readFileSync('data/pmgc_2023_data.json'));
let missing = [];

data.teams.forEach(t => {
    if (!fs.existsSync(t.logo)) {
        missing.push(t.name + ' -> ' + t.logo);
    }
});

fs.writeFileSync('scratch/missing_2023.txt', missing.join('\n'));
