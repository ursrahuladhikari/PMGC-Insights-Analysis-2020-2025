const fs = require('fs');

// Fix name mismatches in 2023 — JSON uses "Team Weibo", "Loops", no "Persija EVOS"
const path2023 = 'data/pmgc_2023_data.json';
const data2023 = JSON.parse(fs.readFileSync(path2023, 'utf8'));

// Print names that are finalists (to verify mismatches)
const nameMap2023 = {
    "Team Weibo": { rank: 8, points: 110 },
    "Loops": { rank: 12, points: 77 }
};

data2023.teams.forEach(team => {
    if (nameMap2023[team.name]) {
        team.finalsRank = nameMap2023[team.name].rank;
        team.totalPoints = nameMap2023[team.name].points;
        team.isFinalist = true;
    }
});
fs.writeFileSync(path2023, JSON.stringify(data2023, null, 2));
console.log('Patched 2023 name mismatches');

// Check all years finalist counts
['2020','2021','2022','2023','2024','2025'].forEach(y => {
    const d = JSON.parse(fs.readFileSync('data/pmgc_'+y+'_data.json','utf8'));
    const cnt = d.teams.filter(t => t.isFinalist).length;
    console.log(y + ': ' + cnt + ' finalists');
});
