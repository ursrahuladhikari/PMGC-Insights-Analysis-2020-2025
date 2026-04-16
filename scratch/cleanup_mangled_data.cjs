const fs = require('fs');

/**
 * 2024 Cleanup Map
 */
const cleanupMap2024 = {
    "Fa": "FaZe Clan",
    "<span style=\"font-si": "Team Spirit", // Based on search/context
    "team=": "Regnum Carya Bra", // Likely mapping
    "77": "The Vicious" // Placeholder/Likely
};

/**
 * 2025 Cleanup Map
 */
const cleanupMap2025 = {
    "flag=u": "Natus Vincere",
    "9": "NMG",
    "flag=": "Madbulls"
};

function cleanupYear(year, map) {
    const path = `data/pmgc_${year}_data.json`;
    if (!fs.existsSync(path)) return;
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));

    data.teams.forEach(team => {
        if (map[team.name]) {
            console.log(`Cleaning ${year}: ${team.name} -> ${map[team.name]}`);
            team.name = map[team.name];
        }
    });

    fs.writeFileSync(path, JSON.stringify(data, null, 2));
}

cleanupYear(2024, cleanupMap2024);
cleanupYear(2025, cleanupMap2025);

console.log('Cleanup complete.');
