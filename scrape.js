import * as cheerio from 'cheerio';
import fetch from 'node-fetch';

async function extractFlags() {
  const url = 'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2023';
  const response = await fetch(url);
  const html = await response.text();
  const $ = cheerio.load(html);
  
  const teams = {};
  
  // Find all team cards in the Participants section
  $('.teamcard').each((i, el) => {
    const teamName = $(el).find('.teamcard-inner .teamcard-title a').text().trim();
    if (teamName) {
      // Find the flag icon element in the title or roster
       const img = $(el).find('.teamcard-title .flag img').first();
       let flag = "";
       if (img.length > 0) {
         flag = img.attr('alt');
       } else {
         // Sometimes the flag is not in the title but in the info
         const infoImg = $(el).find('img[alt]').filter((i, el) => $(el).attr('alt').length === 2 || $(el).attr('src').includes('/commons/images/th/'));
         // Just extract whatever looks like a country code
       }
       teams[teamName] = flag;
    }
  });

  console.log(JSON.stringify(teams, null, 2));
}

extractFlags().catch(console.error);
