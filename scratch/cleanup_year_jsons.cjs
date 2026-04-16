const fs = require('fs');

const cleanupMap = {
    "2020": {
        "flag=mn": "Zeus Esports",
        "notes=8": "Konina Power"
    },
    "2021": {
        "Fa": "FaZe Clan",
        "SuperMassive Bla": "SuperMassive Blaze"
    },
    "2024": {

        "Fa": "FaZe Clan",
        "<span style=\"font-si": "Team Spirit",
        "team=": "Regnum Carya Bra",
        "77": "The Vicious"
    },
    "2025": {
        "flag=u": "Natus Vincere",
        "9": "NMG",
        "flag=": "Madbulls"
    }
};

function cleanup(year) {
    const path = `teams_year_${year}.json`;
    if (!fs.existsSync(path)) return;
    
    let teams = JSON.parse(fs.readFileSync(path, 'utf8'));
    let changed = false;

    teams.forEach(team => {
        if (cleanupMap[year] && cleanupMap[year][team.name]) {
            console.log(`Cleaning ${year}: "${team.name}" -> "${cleanupMap[year][team.name]}"`);
            team.name = cleanupMap[year][team.name];
            changed = true;
        }
    });

    if (changed) {
        fs.writeFileSync(path, JSON.stringify(teams, null, 2), 'utf8');
    }
}

Object.keys(cleanupMap).forEach(cleanup);
console.log('Cleanup of year JSONs complete.');
