const fs = require('fs');

const logoMap = {
    // Standard direct links (to be used with no-referrer policy)
    "Nova Esports": "https://liquipedia.net/commons/images/e/ee/Nova_Esports_allmode.png",
    "4AM": "https://liquipedia.net/commons/images/d/d4/Four_Angry_Men_allmode.png",
    "Four Angry Men": "https://liquipedia.net/commons/images/d/d4/Four_Angry_Men_allmode.png",
    "ZEUS Esports": "https://liquipedia.net/commons/images/a/a2/Zeus_Esports_allmode.png",
    "Natus Vincere": "https://liquipedia.net/commons/images/d/d0/Natus_Vincere_2021_allmode.png",
    "Bigetron RA": "https://liquipedia.net/commons/images/5/52/Bigetron_RA_allmode.png",
    "RRQ Athena": "https://liquipedia.net/commons/images/a/a7/Rex_Regum_QE_allmode.png",
    "Secret Jin": "https://liquipedia.net/commons/images/3/3d/Team_Secret_allmode.png",
    "Alpha7 Esports": "./assets/logos/alpha7_esports.png",
    "S2G Esports": "./assets/logos/s2g_esports.png",
    "DRS Gaming": "./assets/logos/drs_gaming.png",
    "Stalwart Esports": "./assets/logos/stalwart_esports.png",
    "GodLike Stalwart": "./assets/logos/stalwart_esports.png",
    "IHC Esports": "./assets/logos/ihc_esports.png",
    "Vampire Esports": "./assets/logos/vampire_esports.png",
    "Dplus KIA": "./assets/logos/dplus.png",
    "Dplus": "./assets/logos/dplus.png",
    "Titan Esports Club": "./assets/logos/titan_esports_club.png",
    "Tianba": "./assets/logos/tianba.png",
    "Team Weibo": "./assets/logos/team_weibo.png",
    "Six Two Eight": "./assets/logos/six_two_eight.png",
    "Falcons Force": "https://liquipedia.net/commons/images/3/3d/Falcons_Force_allmode.png",
    "The Infinity": "https://liquipedia.net/commons/images/d/d5/The_Infinity_allmode.png",
    "Team Secret": "https://liquipedia.net/commons/images/3/3d/Team_Secret_allmode.png",
    "D'Xavier": "https://liquipedia.net/commons/images/c/c5/D%27Xavier_allmode.png",
    "Nigma Galaxy": "https://liquipedia.net/commons/images/7/77/Nigma_Galaxy_allmode.png",
    "Klas Digital Athletics": "https://liquipedia.net/commons/images/d/df/Klas_Digital_Athletics_allmode.png",
    "Futbolist": "https://liquipedia.net/commons/images/8/8a/Futbolist_allmode.png",
    "A1 eSports": "https://liquipedia.net/commons/images/9/9f/A1_eSports_allmode.png",
    "Major Pride": "https://liquipedia.net/commons/images/b/ba/Major_Pride_allmode.png",
    "4Merical Vibes": "./assets/logos/4merical_vibes.png",
    "Buriram United": "https://liquipedia.net/commons/images/0/07/Buriram_United_Esports_allmode.png",
    "FaZe Clan": "https://liquipedia.net/commons/images/d/d1/FaZe_Clan_2022_allmode.png"
};

const teamMetadata = {
    "Nova Esports": {r: "PEL", c: "cn", q: "PEL Points"},
    "4AM": {r: "PEL", c: "cn", q: "PEL Points"},
    "Four Angry Men": {r: "PEL", c: "cn", q: "PEL Points"},
    "ZEUS Esports": {r: "South Asia", c: "mn", q: "PMPL SA"},
    "Natus Vincere": {r: "Europe", c: "ua", q: "PMPL CIS"},
    "Bigetron RA": {r: "Southeast Asia", c: "id", q: "PMPL SEA"},
    "RRQ Athena": {r: "Southeast Asia", c: "th", q: "PMPL SEA"},
    "Secret Jin": {r: "Southeast Asia", c: "th", q: "PMPL SEA"},
    "Alpha7 Esports": {r: "Americas", c: "br", q: "PMPL Americas"},
    "S2G Esports": {r: "Europe", c: "tr", q: "PMPL Europe"},
    "DRS Gaming": {r: "South Asia", c: "np", q: "PMPL SA"},
    "Stalwart Esports": {r: "South Asia", c: "mn", q: "PMPL SA"},
    "GodLike Stalwart": {r: "South Asia", c: "mn", q: "PMPL SA"},
    "IHC Esports": {r: "South Asia", c: "mn", q: "PMPL SA"},
    "Vampire Esports": {r: "Southeast Asia", c: "th", q: "PMWI"},
    "Dplus KIA": {r: "Korea", c: "kr", q: "PMPS"},
    "Dplus": {r: "Korea", c: "kr", q: "PMPS"},
    "Titan Esports Club": {r: "PEL", c: "cn", q: "PEL"},
    "Tianba": {r: "PEL", c: "cn", q: "PEL"},
    "Team Weibo": {r: "PEL", c: "cn", q: "PEL"},
    "Six Two Eight": {r: "PEL", c: "cn", q: "PEL"},
    "Falcons Force": {r: "MEA", c: "sa", q: "PMPL MEA"},
    "The Infinity": {r: "Southeast Asia", c: "th", q: "PMPL SEA"},
    "Team Secret": {r: "Southeast Asia", c: "my", q: "PMPL SEA"},
    "D'Xavier": {r: "Southeast Asia", c: "vn", q: "PMPL SEA"},
    "Nigma Galaxy": {r: "MEA", c: "iq", q: "PMPL MEA"},
    "Klas Digital Athletics": {r: "Europe", c: "tr", q: "PMPL Europe"},
    "Futbolist": {r: "Europe", c: "tr", q: "PMPL Europe"},
    "A1 eSports": {r: "Europe", c: "at", q: "PMPL Europe"},
    "Major Pride": {r: "Europe", c: "ee", q: "PMPL Europe"},
    "4Merical Vibes": {r: "South Asia", c: "np", q: "PMPL SA"},
    "Buriram United": {r: "Southeast Asia", c: "th", q: "PMPL SEA"},
    "FaZe Clan": {r: "Southeast Asia", c: "th", q: "PMPL SEA"}
};

const getLogo = (name) => logoMap[name] || `https://placehold.co/60x60/333/00f2ff?text=${name.substring(0,3).toUpperCase()}`;

const yearsData = {
    2020: {
        winner: "Nova Esports", runnerUp: "4AM", prize: 1200000, 
        mvp: {name: "Suk", team: "4AM"},
        maps: ["Erangel", "Miramar", "Sanhok"],
        host: {city: "Dubai", country: "UAE", venue: "Coca-Cola Arena", map: "https://www.google.com/maps/search/?api=1&query=Coca-Cola+Arena+Dubai"},
        teams: ["Nova Esports", "4AM", "ZEUS Esports", "Natus Vincere", "Bigetron RA", "Secret Jin", "RRQ Athena", "Klas Digital Athletics", "Alpha7 Esports", "Aero Wolf LIMAX", "Futbolist", "Blue Bees", "Abrupt Slayers", "A1 eSports", "Power888", "Loops Esports"]
    },
    2021: {
        winner: "Nova Esports", runnerUp: "Natus Vincere", prize: 3490000, 
        mvp: {name: "Order", team: "Nova Esports"},
        maps: ["Erangel", "Miramar", "Sanhok"],
        host: {city: "Online", country: "Global", venue: "Virtual Arena", map: "#"},
        teams: ["Nova Esports", "Natus Vincere", "Nigma Galaxy", "Six Two Eight", "Alpha7 Esports", "GodLike Stalwart", "S2G Esports", "D'Xavier", "The Infinity", "Team Secret", "Buriram United", "FaZe Clan", "Kaos Next Rüya", "Bigetron RA", "Futbolist", "STE"]
    },
    2022: {
        winner: "S2G Esports", runnerUp: "DRS Gaming", prize: 4000000, 
        mvp: {name: "TOP", team: "GodLike Stalwart"},
        maps: ["Erangel", "Miramar", "Sanhok"],
        host: {city: "Jakarta", country: "Indonesia", venue: "JIExpo Kemayoran", map: "https://www.google.com/maps/search/?api=1&query=JIExpo+Kemayoran+Jakarta"},
        teams: ["S2G Esports", "DRS Gaming", "Alpha7 Esports", "GodLike Stalwart", "IHC Esports", "Vampire Esports", "T2K Esports", "iNCO Gaming", "Influence Chemin", "Geekay Esports", "Buriram United", "Four Angry Men", "TJB Esports", "Fire Flux", "STE", "Bigetron RA"]
    },
    2024: {
        winner: "Alpha7 Esports", runnerUp: "Vampire Esports", prize: 3000000, 
        mvp: {name: "Revo", team: "Alpha7 Esports"},
        maps: ["Erangel", "Miramar", "Sanhok"],
        host: {city: "London", country: "United Kingdom", venue: "ExCeL London", map: "https://www.google.com/maps/search/?api=1&query=ExCeL+London+United+Kingdom"},
        teams: ["Alpha7 Esports", "Vampire Esports", "Dplus KIA", "Major Pride", "Stalwart Esports", "Falcons Force", "NRX Motorsports", "RUKH", "FaZe Clan", "Guild Esports", "Natus Vincere", "Team Secret", "IHC Esports", "Brute Force", "YALLA", "4Merical Vibes"]
    },
    2025: {
        winner: "Dplus KIA", runnerUp: "Alpha7", prize: 3000000, 
        mvp: {name: "Mafioso", team: "Alpha7 Esports"},
        maps: ["Rondo", "Erangel", "Miramar"],
        host: {city: "Tokyo", country: "Japan", venue: "Ariake Arena", map: "https://www.google.com/maps/search/?api=1&query=Ariake+Arena+Tokyo+Japan"},
        teams: ["Dplus KIA", "Alpha7 Esports", "Falcons Force", "DRS Gaming", "Natus Vincere", "Team Weibo", "Stalwart Esports", "IHC Esports", "Brute Force", "FaZe Clan", "NRX Motorsports", "YALLA", "Major Pride", "Team Secret", "RRQ", "Vampire Esports"]
    }
};

Object.entries(yearsData).forEach(([year, data]) => {
    const payload = {
        tournament_info: {
            year: parseInt(year),
            name: `PUBG Mobile Global Championship ${year}`,
            prize_pool: data.prize,
            winner: data.winner,
            runner_up: data.runnerUp,
            mvp: data.mvp,
            maps: data.maps,
            host_city: data.host.city,
            host_country: data.host.country,
            venue: data.host.venue,
            map_url: data.host.map
        },
        teams: data.teams.map(t => {
            const meta = teamMetadata[t] || {r: "Global", c: "un", q: "Qualifier"};
            return {
                name: t,
                region: meta.r,
                countryCode: meta.c,
                qualification: meta.q,
                players: ["Sylas", "Calse", "RayZ", "HamsiG", "For1st"],
                logo: getLogo(t)
            }
        }),
        topPlayers: [
            { rank: 1, name: data.mvp.name, team: data.mvp.team, elims: 50, damage: 9000, assists: 20 },
            { rank: 2, name: "Killer", team: data.runnerUp, elims: 42, damage: 8200, assists: 15 },
            { rank: 3, name: "Sniper", team: data.winner, elims: 38, damage: 7500, assists: 10 }
        ]
    };
    fs.writeFileSync(`./data/pmgc_${year}_data.json`, JSON.stringify(payload, null, 2));
});

// Update 2023 
const path23 = './data/pmgc_2023_data.json';
if(fs.existsSync(path23)) {
    const data23 = JSON.parse(fs.readFileSync(path23));
    data23.tournament_info.maps = ["Erangel", "Miramar", "Sanhok"];
    data23.tournament_info.host_city = "Istanbul";
    data23.tournament_info.host_country = "Turkey";
    data23.tournament_info.venue = "Ülker Sports and Event Hall";
    data23.tournament_info.map_url = "https://www.google.com/maps/search/?api=1&query=Ülker+Sports+Arena+Istanbul";
    data23.teams = data23.teams.map(t => {
        t.logo = getLogo(t.name);
        const meta = teamMetadata[t.name];
        if(meta) { t.qualification = meta.q; t.region = meta.r; t.countryCode = meta.c; }
        return t;
    });
    fs.writeFileSync(path23, JSON.stringify(data23, null, 2));
}
console.log("Updated hosting info and map URLs for all years.");
