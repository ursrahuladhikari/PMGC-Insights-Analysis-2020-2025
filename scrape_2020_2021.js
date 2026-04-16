import * as cheerio from 'cheerio';
import fs from 'fs';

async function fetchAndExtract(url, year, label) {
    const fetch = (await import('node-fetch')).default;
    console.log(`Fetching ${label} (${url})...`);
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) { console.log(`HTTP ${res.status} for ${url}`); return null; }
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // Try multiple heading IDs
    let anchor = $('#Broadcast_Talent, #Broadcast_Talents').first();
    if (!anchor.length) { console.log(`No Broadcast Talent section for ${label}`); return null; }
    
    let out = "";
    anchor.parent().nextAll().each((i, el) => {
        const tag = el.tagName;
        if (tag === 'h2') return false;
        if (tag === 'h3' && $(el).text().match(/(Format|Results|Prize|Participants)/)) return false;
        out += $(el).text() + "\n";
    });
    return out;
}

async function run() {
    // 2020 pages
    const pages2020 = [
        'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/Season_Zero',
        'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2020',
        'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2020/East',
        'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2020/West',
    ];
    let found2020 = false;
    for (const url of pages2020) {
        const text = await fetchAndExtract(url, 2020, '2020');
        if (text) { fs.writeFileSync('talent_raw_2020.txt', text, 'utf8'); console.log('Saved 2020'); found2020 = true; break; }
        await new Promise(r => setTimeout(r, 2000));
    }
    if (!found2020) console.log('Could not find 2020 talent section');
    
    await new Promise(r => setTimeout(r, 3000));

    // 2021 pages
    const pages2021 = [
        'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2021',
        'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2021/Grand_Finals',
        'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2021/East',
        'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2021/West',
    ];
    let found2021 = false;
    for (const url of pages2021) {
        const text = await fetchAndExtract(url, 2021, '2021');
        if (text) { fs.writeFileSync('talent_raw_2021.txt', text, 'utf8'); console.log('Saved 2021'); found2021 = true; break; }
        await new Promise(r => setTimeout(r, 2000));
    }
    if (!found2021) console.log('Could not find 2021 talent section');
}

run();
