const fs = require('fs');
const https = require('https');
const path = require('path');

const logoMap = {
    "nova_esports": "https://liquipedia.net/commons/images/e/ee/Nova_Esports_allmode.png",
    "4am": "https://liquipedia.net/commons/images/d/d4/Four_Angry_Men_allmode.png",
    "zeus_esports": "https://liquipedia.net/commons/images/a/a2/Zeus_Esports_allmode.png",
    "natus_vincere": "https://liquipedia.net/commons/images/d/d0/Natus_Vincere_2021_allmode.png",
    "bigetron_ra": "https://liquipedia.net/commons/images/5/52/Bigetron_RA_allmode.png",
    "rrq_athena": "https://liquipedia.net/commons/images/a/a7/Rex_Regum_QE_allmode.png",
    "secret_jin": "https://liquipedia.net/commons/images/3/3d/Team_Secret_allmode.png",
    "alpha7_esports": "https://liquipedia.net/commons/images/8/82/Alpha7_Esports_allmode.png",
    "s2g_esports": "https://liquipedia.net/commons/images/f/f6/S2G_Esports_allmode.png",
    "fire_flux": "https://liquipedia.net/commons/images/0/05/Fire_Flux_Esports_allmode.png",
    "drs_gaming": "https://liquipedia.net/commons/images/e/e0/DRS_GAMING_2021_allmode.png",
    "godlike_stalwart": "https://liquipedia.net/commons/images/8/8a/Stalwart_Esports_allmode.png",
    "stalwart_esports": "https://liquipedia.net/commons/images/8/8a/Stalwart_Esports_allmode.png",
    "ihc_esports": "https://liquipedia.net/commons/images/4/4b/IHC_Esports_allmode.png",
    "vampire_esports": "https://liquipedia.net/commons/images/d/df/Vampire_Esports_allmode.png",
    "dplus_kia": "https://liquipedia.net/commons/images/5/5a/Dplus_allmode.png",
    "buriram_united": "https://liquipedia.net/commons/images/0/07/Buriram_United_Esports_allmode.png",
    "faze_clan": "https://liquipedia.net/commons/images/d/d1/FaZe_Clan_2022_allmode.png",
    "nigma_galaxy": "https://liquipedia.net/commons/images/7/77/Nigma_Galaxy_allmode.png",
    "t2k_esports": "https://liquipedia.net/commons/images/e/e9/Train_to_Kill_allmode.png",
    "dxavier": "https://liquipedia.net/commons/images/c/c5/D%27Xavier_allmode.png",
    "rrq": "https://liquipedia.net/commons/images/a/a7/Rex_Regum_QE_allmode.png",
    "team_weibo": "https://liquipedia.net/commons/images/8/89/Team_Weibo_allmode.png",
    "major_pride": "https://liquipedia.net/commons/images/b/ba/Major_Pride_allmode.png",
    "titan_esports_club": "https://liquipedia.net/commons/images/4/4b/Titan_Esports_Club_allmode.png",
    "tianba": "https://liquipedia.net/commons/images/e/e9/Tianba_allmode.png",
    "six_two_eight": "https://liquipedia.net/commons/images/6/6f/Six_Two_Eight_allmode.png",
    "gaimin_gladiators": "https://liquipedia.net/commons/images/a/a0/Gaimin_Gladiators_allmode.png",
    "hail_esports": "https://liquipedia.net/commons/images/b/be/HAIL_Esports_allmode.png"
};

const dir = path.join(__dirname, 'assets', 'logos');
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
}

function download(name, url) {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(path.join(dir, `${name}.png`));
        https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
            if (response.statusCode === 301 || response.statusCode === 302) {
                // Follow redirects manually if needed, but liquipedia direct images usually don't redirect much
                download(name, response.headers.location).then(resolve).catch(reject);
                return;
            }
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded ${name}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(path.join(dir, `${name}.png`), () => {});
            reject(err);
        });
    });
}

(async () => {
    for (const [name, url] of Object.entries(logoMap)) {
        try {
            await download(name, url);
        } catch (err) {
            console.error(`Error downloading ${name}: ${err.message}`);
        }
        await new Promise(r => setTimeout(r, 500)); // Be nice to servers
    }
    console.log("Finished logo downloads.");
})();
