import * as cheerio from 'cheerio';
import fs from 'fs';

async function scrape() {
    const fetch = (await import('node-fetch')).default;
    const url = 'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2025';
    console.log(`Fetching ${url}...`);
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
    console.log('Status:', res.status);
    if (!res.ok) return;
    
    const html = await res.text();
    const $ = cheerio.load(html);
    
    // Find broadcast section
    let anchor = $('#Broadcast_Talent, #Broadcast_Talents').first();
    console.log('Anchor found:', anchor.length > 0);
    
    if (anchor.length === 0) {
        // Try to find any h2/h3 with broadcast in text
        $('h2, h3').each((i, el) => {
            if ($(el).text().toLowerCase().includes('broadcast')) {
                console.log('Found header:', $(el).text());
                anchor = $(el);
            }
        });
    }
    
    let out = "";
    anchor.parent().nextAll().each((i, el) => {
        const text = $(el).text().trim();
        if ($(el).is('h2') || $(el).is('h3') && text.match(/(Format|Results|Prize|Participants|Schedule)/)) {
            return false;
        }
        if (text.length > 0) out += text + "\n";
    });
    
    if (out.length > 0) {
        fs.writeFileSync('talent_raw_2025.txt', out, 'utf8');
        console.log(`Saved talent_raw_2025.txt (${out.length} chars)`);
        console.log('\n--- PREVIEW ---\n');
        console.log(out.substring(0, 3000));
    } else {
        console.log('No talent content found');
        // Dump all h2/h3 for debugging
        console.log('\n--- All H2/H3 headers ---');
        $('h2, h3').each((i, el) => console.log(`  ${el.tagName}: ${$(el).text().trim()}`));
    }
}

scrape();
