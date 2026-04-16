const fs = require('fs');

/**
 * MASTER STANDINGS DATA
 */
const standings = {
    2020: [
        { rank: 1, name: "Nova Esports", points: 319 },
        { rank: 2, name: "Four Angry Men", points: 294 },
        { rank: 3, name: "Zeus Esports", points: 292 },
        { rank: 4, name: "Natus Vincere", points: 241 },
        { rank: 5, name: "Bigetron RA", points: 241 },
        { rank: 6, name: "Konina Power", points: 239 },
        { rank: 7, name: "Team Secret", points: 230 },
        { rank: 8, name: "Klas Digital Athletics", points: 221 },
        { rank: 9, name: "A7 eSports", points: 209 },
        { rank: 10, name: "Secret Jin", points: 194 },
        { rank: 11, name: "RRQ Athena", points: 180 },
        { rank: 12, name: "Futbolist", points: 162 },
        { rank: 13, name: "Aerowolf LIMAX", points: 161 },
        { rank: 14, name: "POWER888 KPS", points: 155 },
        { rank: 15, name: "A1 eSports", points: 112 },
        { rank: 16, name: "Abrupt Slayers", points: 111 }
    ],
    2021: [
        { rank: 1, name: "Nova Esports", points: 222 },
        { rank: 2, name: "Natus Vincere", points: 175 },
        { rank: 3, name: "Nigma Galaxy", points: 166 },
        { rank: 4, name: "S2G Esports", points: 150 },
        { rank: 5, name: "D'Xavier", points: 143 },
        { rank: 6, name: "Kaos Next Rüya", points: 141 },
        { rank: 7, name: "Stalwart Esports", points: 140 },
        { rank: 8, name: "Six Two Eight", points: 140 },
        { rank: 9, name: "Alpha7 Esports", points: 139 },
        { rank: 10, name: "The Infinity", points: 139 },
        { rank: 11, name: "DAMWON Gaming", points: 118 },
        { rank: 12, name: "Team Secret", points: 116 },
        { rank: 13, name: "GodLike Esports", points: 106 },
        { rank: 14, name: "4Rivals", points: 96 },
        { rank: 15, name: "1907 Fenerbahçe Esports", points: 85 },
        { rank: 16, name: "Furious Gaming", points: 71 }
    ],
    2022: [
        { rank: 1, name: "S2G Esports", points: 190 },
        { rank: 2, name: "DRS Gaming", points: 158 },
        { rank: 3, name: "Alpha7 Esports", points: 156 },
        { rank: 4, name: "Godlike Stalwart", points: 156 },
        { rank: 5, name: "IHC ESPORTS", points: 144 },
        { rank: 6, name: "Vampire Esports", points: 142 },
        { rank: 7, name: "iNCO Gaming", points: 142 },
        { rank: 8, name: "Four Angry Men", points: 141 },
        { rank: 9, name: "Nova Esports", points: 135 },
        { rank: 10, name: "Geek Fam", points: 125 },
        { rank: 11, name: "Buriram United Esports", points: 121 },
        { rank: 12, name: "Wolves Esports", points: 117 },
        { rank: 13, name: "Influence Chemin", points: 106 },
        { rank: 14, name: "Trained To Kill", points: 105 },
        { rank: 15, name: "Fire Flux Esports", points: 103 },
        { rank: 16, name: "Alter Ego LIMAX", points: 97 }
    ],
    2023: [
        { rank: 1, name: "IHC Esports", points: 142 },
        { rank: 2, name: "Stalwart Esports", points: 138 },
        { rank: 3, name: "Alpha7 Esports", points: 131 },
        { rank: 4, name: "4Merical Vibes", points: 128 },
        { rank: 5, name: "D'Xavier", points: 121 },
        { rank: 6, name: "FaZe Clan", points: 120 },
        { rank: 7, name: "Nongshim RedForce", points: 112 },
        { rank: 8, name: "Weibo Gaming", points: 110 },
        { rank: 9, name: "Titan Esports Club", points: 102 },
        { rank: 10, name: "Six Two Eight", points: 98 },
        { rank: 11, name: "S2G Esports", points: 98 },
        { rank: 12, name: "Loops Esports", points: 77 },
        { rank: 13, name: "Persija EVOS", points: 74 },
        { rank: 14, name: "Major Pride", points: 71 },
        { rank: 15, name: "Yoodo Alliance", points: 69 },
        { rank: 16, name: "Morph GPX", points: 48 }
    ],
    2024: [
        { rank: 1, name: "Dplus", points: 153 },
        { rank: 2, name: "RC BRA Esports", points: 152 },
        { rank: 3, name: "Nigma Galaxy", points: 137 },
        { rank: 4, name: "INFLUENCE RAGE", points: 117 },
        { rank: 5, name: "VOIN DONKEY ID", points: 112 },
        { rank: 6, name: "DRX", points: 109 },
        { rank: 7, name: "4Merical Vibes", points: 104 },
        { rank: 8, name: "Team Spirit", points: 101 },
        { rank: 9, name: "Insilio", points: 100 },
        { rank: 10, name: "Tong Jia Bao Esports", points: 98 },
        { rank: 11, name: "Alpha7 Esports", points: 95 },
        { rank: 12, name: "The Vicious", points: 93 },
        { rank: 13, name: "ThunderTalk Gaming", points: 81 },
        { rank: 14, name: "Falcons Force", points: 71 },
        { rank: 15, name: "Natus Vincere", points: 69 },
        { rank: 16, name: "Guild Esports", points: 44 }
    ],
    2025: [
        { rank: 1, name: "Alpha7 Esports", points: 155 },
        { rank: 2, name: "Regnum Carya Esports", points: 129 },
        { rank: 3, name: "Natus Vincere", points: 128 },
        { rank: 4, name: "Team Falcons", points: 125 },
        { rank: 5, name: "D'Xavier", points: 113 },
        { rank: 6, name: "NMG", points: 111 },
        { rank: 7, name: "DRX", points: 109 },
        { rank: 8, name: "ThunderTalk Gaming", points: 102 },
        { rank: 9, name: "R8 Esports", points: 101 },
        { rank: 10, name: "Madbulls", points: 93 },
        { rank: 11, name: "Alter Ego Ares", points: 89 },
        { rank: 12, name: "ULF Esports", points: 85 },
        { rank: 13, name: "Dplus", points: 73 },
        { rank: 14, name: "eArena", points: 69 },
        { rank: 15, name: "Vampire Esports", points: 56 },
        { rank: 16, name: "Kara Esports", points: 45 }
    ]
};

const nameMaps = {
    2023: {
        "Weibo Gaming": "Team Weibo",
        "Loops Esports": "Loops",
        "Persija EVOS": "Persija Evos"
    },
    2024: {
        "The Vicious": "The Vicious LATAM"
    },
    2025: {
        "Natus Vincere": "flag=u",
        "NMG": "9",
        "Madbulls": "flag="
    }
};

const cleanup2024 = {
    "<span style=\"font-si": "Team Spirit",
    "team=": "Regnum Carya Bra",
    "Fa": "FaZe Clan"
};

function updateFile(year) {
    const path = `data/pmgc_${year}_data.json`;
    if (!fs.existsSync(path)) return;
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));
    const gfStandings = standings[year];
    const yearMap = nameMaps[year] || {};

    data.teams.forEach(team => {
        // Special 2024 cleanup first
        if (year === 2024 && cleanup2024[team.name]) {
            team.name = cleanup2024[team.name];
        }

        let found = gfStandings.find(s => {
            const mappedName = yearMap[s.name] || s.name;
            const tName = team.name.trim().toLowerCase();
            return tName === mappedName.trim().toLowerCase() || tName === s.name.trim().toLowerCase();
        });

        if (found) {
            team.isFinalist = true;
            team.finalsRank = found.rank;
            team.totalPoints = found.points;
            
            // Restore name if mapped (especially for 2025 mangled)
            if (yearMap[found.name] === team.name || ["flag=u", "9", "flag="].includes(team.name)) {
                team.name = found.name;
            }
        } else {
            team.isFinalist = false;
            team.finalsRank = null;
            team.totalPoints = null;
        }
    });

    fs.writeFileSync(path, JSON.stringify(data, null, 2));
    console.log(`Updated ${year} (${data.teams.filter(t=>t.isFinalist).length} finalists)`);
}

[2020, 2021, 2022, 2023, 2024, 2025].forEach(updateFile);
console.log('Master update finished.');
