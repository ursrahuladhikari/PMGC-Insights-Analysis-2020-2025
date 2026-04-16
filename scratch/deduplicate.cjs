const fs = require('fs');

function deduplicate(year) {
    const path = `data/pmgc_${year}_data.json`;
    if (!fs.existsSync(path)) return;
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));

    const seen = new Set();
    const uniqueTeams = [];

    data.teams.forEach(team => {
        const key = team.name.trim().toLowerCase();
        if (!seen.has(key)) {
            seen.add(key);
            uniqueTeams.push(team);
        } else {
            console.log(`Removing duplicate in ${year}: ${team.name}`);
        }
    });

    data.teams = uniqueTeams;
    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    console.log(`Deduplicated ${year}: ${data.teams.length} teams remaining.`);
}

[2024, 2025].forEach(deduplicate);
