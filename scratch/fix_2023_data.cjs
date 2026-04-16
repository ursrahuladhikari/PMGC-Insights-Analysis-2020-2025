const fs = require('fs');

const path2023 = 'data/pmgc_2023_data.json';
const data = JSON.parse(fs.readFileSync(path2023, 'utf8'));

const fixMap = {
    'Fa': 'FaZe Clan',
    'IHC': 'IHC Esports'
};

data.teams.forEach(t => {
    if (fixMap[t.name]) {
        t.name = fixMap[t.name];
    }
});

// Re-run standings update after name fix
const standings2023 = [
    "IHC Esports",
    "Stalwart Esports",
    "Alpha7 Esports",
    "4Merical Vibes",
    "D'Xavier",
    "FaZe Clan",
    "Nongshim RedForce",
    "Weibo Gaming",
    "Titan Esports Club",
    "Six Two Eight",
    "S2G Esports",
    "Loops Esports",
    "Persija EVOS",
    "Major Pride",
    "Yoodo Alliance",
    "Morph GPX"
];

data.teams.forEach(team => {
    const rank = standings2023.indexOf(team.name);
    if (rank !== -1) {
        team.finalsRank = rank + 1;
        team.isFinalist = true;
    } else {
        team.isFinalist = false;
        team.finalsRank = null;
    }
});

fs.writeFileSync(path2023, JSON.stringify(data, null, 2));
console.log('Fixed 2023 names and updated standings');
