import * as cheerio from 'cheerio';
import fs from 'fs';

async function scrape(year, url) {
    const fetch = (await import('node-fetch')).default;
    console.log(`\n========== ${year} ==========`);
    console.log(`Fetching ${url}...`);
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } });
    console.log('HTTP Status:', res.status);
    if (!res.ok) return;

    const html = await res.text();
    const $ = cheerio.load(html);

    // Print ALL h2/h3 headings
    console.log('\n--- All headings ---');
    $('h1, h2, h3, h4').each((i, el) => {
        console.log(`  ${el.tagName.toUpperCase()}: [${$(el).attr('id') || '(no id)'}] ${$(el).text().trim()}`);
    });

    // Find any heading containing "broadcast" or "caster" or "talent" or "commentat"
    console.log('\n--- Broadcast-related anchors ---');
    $('[id]').each((i, el) => {
        const id = $(el).attr('id') || '';
        const text = $(el).text().trim();
        if (id.toLowerCase().match(/broadcast|caster|talent|commentat|analyst/)) {
            console.log(`  id="${id}" text="${text.substring(0,80)}"`);
        }
    });

    // Try to find broadcast section and extract text
    const broadcastHeadings = [];
    $('h2, h3').each((i, el) => {
        const text = $(el).text().trim().toLowerCase();
        if (text.includes('broadcast') || text.includes('caster') || text.includes('talent') || text.includes('commentat')) {
            broadcastHeadings.push(el);
        }
    });

    console.log(`\nFound ${broadcastHeadings.length} broadcast-related heading(s)`);

    if (broadcastHeadings.length > 0) {
        let out = '';
        $(broadcastHeadings[0]).parent().nextAll().each((i, el) => {
            const tag = el.tagName;
            const text = $(el).text().trim();
            if (tag === 'h2') return false;
            if (tag === 'h3' && text.match(/(Format|Results|Prize|Participants|Schedule)/)) return false;
            if (text.length > 0) out += text + '\n';
        });
        if (out.length > 50) {
            fs.writeFileSync(`talent_raw_${year}.txt`, out, 'utf8');
            console.log(`\nSaved talent_raw_${year}.txt (${out.length} chars)`);
            console.log('\n--- Preview ---');
            console.log(out.substring(0, 2000));
        }
    }
}

async function run() {
    await scrape(2020, 'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2020');
    await new Promise(r => setTimeout(r, 3000));
    await scrape(2021, 'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2021');
}

run();
