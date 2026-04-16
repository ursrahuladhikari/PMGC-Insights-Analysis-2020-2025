import fs from 'fs';
import path from 'path';

const logos_2020 = {
    "Bigetron RA": "https://liquipedia.net/commons/images/5/58/Bigetron_by_Vitality_full_lightmode.png",
    "Futbolist": "https://liquipedia.net/commons/images/0/05/Futbolist_2021_lightmode.png",
    "Elites United Team": "https://liquipedia.net/commons/images/c/cc/Elites_United_Team.png",
    "Aerowolf LIMAX": "https://liquipedia.net/commons/images/7/7c/Aerowolf.png",
    "Secret Jin": "https://liquipedia.net/commons/images/7/79/Secret_Jin_lightmode.png",
    "RRQ Athena": "https://liquipedia.net/commons/images/1/1e/Rex_Regum_Qeon_allmode.png",
    "POWER888 KPS": "https://liquipedia.net/commons/images/3/31/POWER888_ESPORTS_2020_allmode.png",
    "Team Secret": "https://liquipedia.net/commons/images/4/45/Team_Secret_full_lightmode.png",
    "Abrupt Slayers": "https://liquipedia.net/commons/images/d/d0/Abrupt_Slayers_2021.png",
    "DRS Gaming": "https://liquipedia.net/commons/images/e/e0/DRS_GAMING_2021_allmode.png",
    "A1 eSports": "https://liquipedia.net/commons/images/d/da/A1_RG_Esports_lightmode.png",
    "Loops": "https://liquipedia.net/commons/images/2/25/Loops_Esports_2021_allmode.png",
    "The Unnamed": "https://liquipedia.net/commons/images/6/66/The_Unnamed.png",
    "Execute Esports": "https://liquipedia.net/commons/images/1/10/Execute_Esports_2020.png",
    "A7 eSports": "https://liquipedia.net/commons/images/f/fa/A7_eSports_lightmode.png",
    "Natus Vincere": "https://liquipedia.net/commons/images/3/3f/Natus_Vincere_2021_lightmode.png",
    "Klas Digital Athletics": "https://liquipedia.net/commons/images/c/c1/Digital_Athletics.png",
    "GODSENT": "https://liquipedia.net/commons/images/6/6e/GODSENT_full_allmode.png",
    "Konina Power": "https://liquipedia.net/commons/images/8/8e/Konina_Power_full_lightmode.png",
    "Four Angry Men": "https://liquipedia.net/commons/images/5/58/Four_Angry_Men_lightmode.png",
    "Nova Esports": "https://liquipedia.net/commons/images/e/ee/Nova_Esports_LATAM_allmode.png",
    "BLUE BEES": "https://liquipedia.net/commons/images/3/33/Blue_Bees_2019_lightmode.png",
    "Archer Gaming": "https://liquipedia.net/commons/images/a/a8/Archer_Gaming_lightmode.png",
    "Zeus Esports": "https://liquipedia.net/commons/images/9/9a/IHC_ESPORTS_allmode_full.png"
};

const dataPath = path.join('data', 'pmgc_2020_data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

data.teams.forEach(team => {
    if (logos_2020[team.name]) {
        team.logo = logos_2020[team.name];
    }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
console.log("Final update: All 2020 logos successfully linked to Liquipedia CDN.");
