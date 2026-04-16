import fs from 'fs';

const path2021 = 'data/pmgc_2021_data.json';
const data = JSON.parse(fs.readFileSync(path2021, 'utf8'));

const standings2021 = [
    "Nova Esports",
    "Natus Vincere",
    "Nigma Galaxy",
    "S2G Esports",
    "D'Xavier",
    "Kaos Next Rüya",
    "Stalwart Esports",
    "Six Two Eight",
    "Alpha7 Esports",
    "The Infinity",
    "DAMWON Gaming",
    "Team Secret",
    "GodLike Esports",
    "4Rivals",
    "1907 Fenerbahçe Esports",
    "Furious Gaming"
];

data.teams.forEach(team => {
    const rank = standings2021.indexOf(team.name);
    if (rank !== -1) {
        team.finalsRank = rank + 1;
        team.isFinalist = true;
    } else {
        team.isFinalist = false;
    }
});

fs.writeFileSync(path2021, JSON.stringify(data, null, 2));
console.log('Updated 2021 standings');
