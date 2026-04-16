import fs from 'fs';
const path2021 = 'data/pmgc_2021_data.json';
const data = JSON.parse(fs.readFileSync(path2021, 'utf8'));

const fixMap = {
    'Fa': 'FaZe Clan',
    'SuperMassive Bla': 'SuperMassive Blaze',
    'Beşiktaş Esports': 'Beşiktaş Esports', // Ensure no encoding issues
    '1907 Fenerbahçe Esports': '1907 Fenerbahçe Esports',
    'Kaos Next Rüya': 'Kaos Next Rüya'
};

data.teams.forEach(t => {
    if (fixMap[t.name]) {
        t.name = fixMap[t.name];
    }
});

fs.writeFileSync(path2021, JSON.stringify(data, null, 2));
console.log('Fixed 2021 team names');
