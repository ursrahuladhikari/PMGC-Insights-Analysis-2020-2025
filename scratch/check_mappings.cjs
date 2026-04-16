const fs = require('fs');

const standings = {
    2020: [ "Nova Esports", "Four Angry Men", "Zeus Esports", "Natus Vincere", "Bigetron RA", "Konina Power", "Team Secret", "Klas Digital Athletics", "A7 eSports", "Secret Jin", "RRQ Athena", "Futbolist", "Aerowolf LIMAX", "POWER888 KPS", "A1 eSports", "Abrupt Slayers" ],
    2021: [ "Nova Esports", "Natus Vincere", "Nigma Galaxy", "S2G Esports", "D'Xavier", "Kaos Next Rüya", "Stalwart Esports", "Six Two Eight", "Alpha7 Esports", "The Infinity", "DAMWON Gaming", "Team Secret", "GodLike Esports", "4Rivals", "1907 Fenerbahçe Esports", "Furious Gaming" ],
    2022: [ "S2G Esports", "DRS Gaming", "Alpha7 Esports", "Godlike Stalwart", "IHC ESPORTS", "Vampire Esports", "iNCO Gaming", "Four Angry Men", "Nova Esports", "Geek Fam", "Buriram United Esports", "Wolves Esports", "Influence Chemin", "Trained To Kill", "Fire Flux Esports", "Alter Ego LIMAX" ],
    2023: [ "IHC Esports", "Stalwart Esports", "Alpha7 Esports", "4Merical Vibes", "D'Xavier", "FaZe Clan", "Nongshim RedForce", "Team Weibo", "Titan Esports Club", "Six Two Eight", "S2G Esports", "Loops", "Persija Evos", "Major Pride", "Yoodo Alliance", "Morph GPX" ],
    2024: [ "Dplus", "RC BRA Esports", "Nigma Galaxy", "INFLUENCE RAGE", "VOIN DONKEY ID", "DRX", "4Merical Vibes", "Team Spirit", "Insilio", "Tong Jia Bao Esports", "Alpha7 Esports", "The Vicious", "ThunderTalk Gaming", "Falcons Force", "Natus Vincere", "Guild Esports" ],
    2025: [ "Alpha7 Esports", "Regnum Carya Esports", "Natus Vincere", "Team Falcons", "D'Xavier", "NMG", "DRX", "ThunderTalk Gaming", "R8 Esports", "Madbulls", "Alter Ego Ares", "ULF Esports", "Dplus", "eArena", "Vampire Esports", "Kara Esports" ]
};

function check(year) {
    try {
        const path = `data/pmgc_${year}_data.json`;
        if (!fs.existsSync(path)) return;
        const data = JSON.parse(fs.readFileSync(path, 'utf8'));
        const yearStandings = standings[year];
        const teams = data.teams || [];
        
        console.log(`\n--- YEAR ${year} ---`);
        const mapped = [];
        const unmapped = [];

        yearStandings.forEach(sName => {
            const found = teams.find(t => {
                const tn = (t.name || "").trim().toLowerCase();
                const sn = (sName || "").trim().toLowerCase();
                return tn === sn || tn.includes(sn) || sn.includes(tn);
            });
            if (found) mapped.push({ s: sName, t: found.name });
            else unmapped.push(sName);
        });

        console.log(`Mapped: ${mapped.length}/16`);
        if (unmapped.length > 0) {
            console.log(`UNMAPPED STANDINGS: ${unmapped.join(', ')}`);
        }
    } catch (e) {
        console.log(`Error in ${year}: ${e.message}`);
    }
}

[2020, 2021, 2022, 2023, 2024, 2025].forEach(check);
