import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const assetsDir = path.join(process.cwd(), 'assets', 'logos');

async function run() {
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });

  const filePath = path.join(assetsDir, 'pmgc_logo.png');
  
  if (fs.existsSync(filePath)) {
    console.log('Logo already exists.');
    await browser.close();
    return;
  }
  
  console.log(`Searching Bing for PMGC logo...`);
  try {
      await page.goto(`https://www.bing.com/images/search?q=${encodeURIComponent('PUBG Mobile Global Championship PMGC 2023 logo png transparent')}&form=HDRSC2`, { waitUntil: 'domcontentloaded' });
      
      await page.waitForSelector('img.mimg', { timeout: 10000 }).catch(() => {});
      
      const firstImageSrc = await page.evaluate(() => {
          const img = document.querySelector('img.mimg');
          return img ? img.src : null;
      });

      if (firstImageSrc) {
          console.log(`Found PMGC logo URL`);
          const viewSource = await page.goto(firstImageSrc);
          fs.writeFileSync(filePath, await viewSource.buffer());
      } else {
          console.log(`No image found for PMGC logo`);
      }
  } catch(e) {
      console.error(`Error:`, e.message);
  }

  console.log('Update complete!');
  await browser.close();
}

run().catch(console.error);
