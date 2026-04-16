const fs = require('fs');

const standings2020 = [
  {"name": "Nova Esports", "rank": 1, "points": 319},
  {"name": "Four Angry Men", "rank": 2, "points": 294},
  {"name": "Zeus Esports", "rank": 3, "points": 292},
  {"name": "Natus Vincere", "rank": 4, "points": 241},
  {"name": "Bigetron RA", "rank": 5, "points": 241},
  {"name": "Konina Power", "rank": 6, "points": 239},
  {"name": "Team Secret", "rank": 7, "points": 226},
  {"name": "Klas Digital Athletics", "rank": 8, "points": 221},
  {"name": "Alpha7 Esports", "rank": 9, "points": 214},
  {"name": "Secret Jin", "rank": 10, "points": 194},
  {"name": "RRQ Athena", "rank": 11, "points": 180},
  {"name": "Futbolist", "rank": 12, "points": 178},
  {"name": "Aerowolf LIMAX", "rank": 13, "points": 161},
  {"name": "POWER888 KPS", "rank": 14, "points": 155},
  {"name": "A1 eSports", "rank": 15, "points": 146},
  {"name": "Abrupt Slayers", "rank": 16, "points": 128}
];

const standings2021 = [
  {"name": "Nova Esports", "rank": 1, "points": 222},
  {"name": "Natus Vincere", "rank": 2, "points": 175},
  {"name": "Nigma Galaxy", "rank": 3, "points": 166},
  {"name": "S2G Esports", "rank": 4, "points": 150},
  {"name": "D'Xavier", "rank": 5, "points": 143},
  {"name": "Kaos Next Rüya", "rank": 6, "points": 141},
  {"name": "Stalwart Esports", "rank": 7, "points": 140},
  {"name": "Six Two Eight", "rank": 8, "points": 140},
  {"name": "Alpha7 Esports", "rank": 9, "points": 139},
  {"name": "The Infinity", "rank": 10, "points": 139},
  {"name": "DAMWON Gaming", "rank": 11, "points": 118},
  {"name": "Team Secret", "rank": 12, "points": 116},
  {"name": "GodLike Esports", "rank": 13, "points": 106},
  {"name": "4Rivals", "rank": 14, "points": 96},
  {"name": "1907 Fenerbahçe Esports", "rank": 15, "points": 85},
  {"name": "Furious Gaming", "rank": 16, "points": 71}
];

const standings2022 = [
  {"name": "S2G Esports", "rank": 1, "points": 190},
  {"name": "DRS Gaming", "rank": 2, "points": 158},
  {"name": "Alpha7 Esports", "rank": 3, "points": 156},
  {"name": "GodLike Stalwart", "rank": 4, "points": 156},
  {"name": "IHC Esports", "rank": 5, "points": 144},
  {"name": "Vampire Esports", "rank": 6, "points": 142},
  {"name": "iNCO Gaming", "rank": 7, "points": 142},
  {"name": "Four Angry Men", "rank": 8, "points": 141},
  {"name": "Nova Esports", "rank": 9, "points": 135},
  {"name": "Geek Fam", "rank": 10, "points": 125},
  {"name": "Wolves Esports", "rank": 11, "points": 118},
  {"name": "Buriram United Esports", "rank": 12, "points": 114},
  {"name": "Trained to Kill", "rank": 13, "points": 112},
  {"name": "Alter Ego LIMAX", "rank": 14, "points": 107},
  {"name": "Fire Flux Esports", "rank": 15, "points": 99},
  {"name": "Influence Chemin Esports", "rank": 16, "points": 94}
];

const standings2023 = [
  {"name": "IHC Esports", "rank": 1, "points": 142},
  {"name": "Stalwart Esports", "rank": 2, "points": 138},
  {"name": "Alpha7 Esports", "rank": 3, "points": 131},
  {"name": "4Merical Vibes", "rank": 4, "points": 128},
  {"name": "D'Xavier", "rank": 5, "points": 121},
  {"name": "FaZe Clan", "rank": 6, "points": 120},
  {"name": "Nongshim RedForce", "rank": 7, "points": 112},
  {"name": "Weibo Gaming", "rank": 8, "points": 110},
  {"name": "Titan Esports Club", "rank": 9, "points": 102},
  {"name": "Six Two Eight", "rank": 10, "points": 98},
  {"name": "S2G Esports", "rank": 11, "points": 98},
  {"name": "Loops Esports", "rank": 12, "points": 77},
  {"name": "Persija EVOS", "rank": 13, "points": 74},
  {"name": "Major Pride", "rank": 14, "points": 71},
  {"name": "Yoodo Alliance", "rank": 15, "points": 69},
  {"name": "Morph GPX", "rank": 16, "points": 48}
];

const standings2024 = [
  {"name": "Dplus", "rank": 1, "points": 153},
  {"name": "RC BRA Esports", "rank": 2, "points": 152},
  {"name": "Nigma Galaxy", "rank": 3, "points": 137},
  {"name": "INFLUENCE RAGE", "rank": 4, "points": 117},
  {"name": "VOIN DONKEY ID", "rank": 5, "points": 112},
  {"name": "DRX", "rank": 6, "points": 109},
  {"name": "4Merical Vibes", "rank": 7, "points": 104},
  {"name": "Team Spirit", "rank": 8, "points": 101},
  {"name": "Insilio", "rank": 9, "points": 100},
  {"name": "Tong Jia Bao Esports", "rank": 10, "points": 98},
  {"name": "Alpha7 Esports", "rank": 11, "points": 95},
  {"name": "The Vicious", "rank": 12, "points": 93},
  {"name": "ThunderTalk Gaming", "rank": 13, "points": 81},
  {"name": "Falcons Force", "rank": 14, "points": 71},
  {"name": "Natus Vincere", "rank": 15, "points": 69},
  {"name": "Guild Esports", "rank": 16, "points": 44}
];

const standings2025 = [
  {"name": "Alpha7 Esports", "rank": 1, "points": 142},
  {"name": "ULF Esports", "rank": 2, "points": 133},
  {"name": "Alpha Gaming", "rank": 3, "points": 130},
  {"name": "ThunderTalk Gaming", "rank": 4, "points": 124},
  {"name": "Dplus", "rank": 5, "points": 115},
  {"name": "DRX", "rank": 6, "points": 115},
  {"name": "D'Xavier", "rank": 7, "points": 112},
  {"name": "Alter Ego Ares", "rank": 8, "points": 101},
  {"name": "GOAT Team", "rank": 9, "points": 101},
  {"name": "Regnum Carya Esports", "rank": 10, "points": 99},
  {"name": "Madbulls", "rank": 11, "points": 98},
  {"name": "eArena", "rank": 12, "points": 95},
  {"name": "R8 Esports", "rank": 13, "points": 95},
  {"name": "Kara Esports", "rank": 14, "points": 90},
  {"name": "Vampire Esports", "rank": 15, "points": 80},
  {"name": "Team Flash", "rank": 16, "points": 76}
];

const NAME_MAPPING = {
  "Alpha7 Esports": ["A7 eSports"],
  "IHC Esports": ["IHC ESPORTS"],
  "FaZe Clan": ["Fa"],
  "Weibo Gaming": ["Team Weibo"],
  "Loops Esports": ["Loops"],
  "Stalwart Esports": ["GodLike Stalwart"],
  "Trained to Kill": ["T2K", "T2K Esports", "Trained To Kill"],
  "DAMWON Gaming": ["DK", "Dplus", "DAMWON Gaming"],
  "Kaos Next Rüya": ["Next Rüya", "Next Ruya"],
  "Influence Chemin Esports": ["Influence Rage", "INFLUENCE RAGE", "Influence Chemin"],
  "Aerowolf LIMAX": ["Aerowolf Limax"],
  "Alter Ego LIMAX": ["Alter Ego Limax"],
  "Persija EVOS": ["Persija Evos"],
  "4Merical Vibes": ["4MV"],
  "Zeus Esports": ["ZEUS ESPORTS", "flag=mn"],
  "Konina Power": ["KoninaPower", "notes=8"],
  "A1 eSports": ["A1 Esports"]
};


function applyStandings(year, standings) {
    const path = `data/pmgc_${year}_data.json`;
    if (!fs.existsSync(path)) return;
    const data = JSON.parse(fs.readFileSync(path, 'utf8'));

    data.teams.forEach(t => {
        t.isFinalist = false;
        t.finalsRank = null;
        t.totalPoints = null;
    });

    standings.forEach(s => {
        const team = data.teams.find(t => {
            const matches = [s.name.toLowerCase()];
            if (NAME_MAPPING[s.name]) {
                NAME_MAPPING[s.name].forEach(m => matches.push(m.toLowerCase()));
            }
            for (const [canonical, aliases] of Object.entries(NAME_MAPPING)) {
                if (canonical.toLowerCase() === s.name.toLowerCase() || aliases.some(a => a.toLowerCase() === s.name.toLowerCase())) {
                    matches.push(canonical.toLowerCase());
                    aliases.forEach(a => matches.push(a.toLowerCase()));
                }
            }
            return matches.includes(t.name.toLowerCase());
        });

        if (team) {
            team.isFinalist = true;
            team.finalsRank = s.rank;
            team.totalPoints = s.points;
        } else {
            console.log(`Warning: Team ${s.name} not found in ${year} data!`);
        }
    });

    fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
    console.log(`Updated ${year} standings.`);
}

applyStandings(2020, standings2020);
applyStandings(2021, standings2021);
applyStandings(2022, standings2022);
applyStandings(2023, standings2023);
applyStandings(2024, standings2024);
applyStandings(2025, standings2025);
