const fs = require('fs');

const data2024 = JSON.parse(fs.readFileSync('data/pmgc_2024_data.json'));

const map2024 = {
    "Alter Ego Ares": "900px-Alter_Ego_2022_allmode.png",
    "D'Xavier": "900px-Dingoz_Xavier_2024_allmode.png",
    "RRQ RYU": "75px-Rex_Regum_Qeon_allmode.png",
    "Bigetron Knights": "900px-Bigetron_by_Vitality_full_darkmode.png",
    "Falcons Force": "75px-Team_Falcons_2022_allmode.png",
    "The Vicious LATAM": "The_Vicious_Esports_2024_darkmode.png",
    "Regnum Carya Bra": "731px-Regnum_Carya_x_Bra_Esports_2024_darkmode.png",
    "RC BRA Esports": "731px-Regnum_Carya_x_Bra_Esports_2024_darkmode.png",
    "CAG OSAKA": "432px-CYCLOPS_athlete_gaming_allmode.png"
};

data2024.teams.forEach(t => {
    if (map2024[t.name]) {
        t.logo = './assets/PMGC_2024/' + map2024[t.name];
        console.log('Fixed:', t.name);
    }
});

fs.writeFileSync('data/pmgc_2024_data.json', JSON.stringify(data2024, null, 2));
