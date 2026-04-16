import * as cheerio from 'cheerio';
import fs from 'fs';

async function scrape() {
    try {
        const fetch = (await import('node-fetch')).default;
        const res = await fetch('https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2023', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'
            }
        });
        const html = await res.text();
        const $ = cheerio.load(html);

        const talentSection = $('#Broadcast_Talent').parent();
        
        let out = "";
        talentSection.nextAll().each((i, el) => {
            if ($(el).is('h2') || $(el).is('h3') && $(el).text().includes('Format')) {
                return false;
            }
            if ($(el).hasClass('template-box')) {
                 out += $(el).text() + "\n";
            } else if ($(el).find('table').length > 0) {
                 $(el).find('tr').each((j, tr) => {
                     let row = "";
                     $(tr).find('th, td').each((k, td) => {
                         row += $(td).text().trim() + " | ";
                     });
                     out += row + "\n";
                 });
            } else {
                 out += $(el).text() + "\n";
            }
        });

        fs.writeFileSync('talent.txt', out);
        console.log("Written to talent.txt");
    } catch (e) {
        console.error(e);
    }
}
scrape();
