import * as cheerio from 'cheerio';
import fs from 'fs';

async function fetchLiquipedia(year) {
    const fetch = (await import('node-fetch')).default;
    let url = `https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/${year}`;
    if (year === 2021) url = 'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2021/Grand_Finals';
    
    console.log(`Fetching ${url}...`);
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (!res.ok) return null;
    return await res.text();
}

function parseTalentHTML(html) {
    const $ = cheerio.load(html);
    let section = $('#Broadcast_Talent').parent();
    
    if (section.length === 0) {
        section = $('#Broadcast_Talents').parent();
    }
    
    if (section.length === 0) return [];
    
    let currentLanguage = "Global";
    let currentRole = "Hosts";
    
    // We will dump text, and use regex to heuristically build objects.
    let textDump = "";
    
    section.nextAll().each((i, el) => {
        if ($(el).is('h2') || $(el).is('h3') && $(el).text().includes('Format')) {
            return false;
        }
        if ($(el).hasClass('template-box') || $(el).find('table').length > 0) {
            textDump += $(el).text() + "\n====\n";
        } else {
            textDump += $(el).text() + "\n";
        }
    });

    return textDump;
}

async function run() {
    for (let year of [2020, 2021, 2022, 2023, 2024]) {
        const html = await fetchLiquipedia(year);
        if (html) {
            const rawText = parseTalentHTML(html);
            if (typeof rawText === 'string' && rawText.length > 0) {
                fs.writeFileSync(`talent_raw_${year}.txt`, rawText, 'utf8');
                console.log(`Saved talent_raw_${year}.txt (${rawText.length} chars)`);
            } else {
                console.log(`No talent content found for ${year}`);
            }
        } else {
            console.log(`Failed to fetch ${year}`);
        }
        // Rate limit - Liquipedia blocks rapid requests
        await new Promise(r => setTimeout(r, 3000));
    }
}

run();
