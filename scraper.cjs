const fs = require('fs');

const teams = [
    "Nova Esports", "4AM", "ZEUS Esports", "Natus Vincere", "Bigetron RA", "RRQ Athena", 
    "Secret Jin", "Alpha7 Esports", "S2G Esports", "Fire Flux", "DRS Gaming", 
    "GodLike Stalwart", "Stalwart Esports", "IHC Esports", "Vampire Esports", 
    "Dplus KIA", "Buriram United", "FaZe Clan", "iNCO Gaming", "Geekay Esports",
    "Nigma Galaxy", "T2K Esports", "Influence Chemin", "Team Weibo", "YALLA", 
    "D'Xavier", "RRQ", "TJB Esports", "STE"
];

async function getLogoUrl(team) {
    const searchUrl = `https://liquipedia.net/pubgmobile/api.php?action=query&list=search&srsearch=${encodeURIComponent(team)}&utf8=&format=json`;
    const res = await fetch(searchUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const data = await res.json();
    if(!data.query || !data.query.search || data.query.search.length === 0) return null;
    
    const pageTitle = data.query.search[0].title;
    
    const pageUrl = `https://liquipedia.net/pubgmobile/api.php?action=parse&page=${encodeURIComponent(pageTitle)}&prop=text&format=json`;
    const pageRes = await fetch(pageUrl, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    const pageData = await pageRes.json();
    if(!pageData.parse || !pageData.parse.text) return null;
    
    const html = pageData.parse.text['*'];
    const match = html.match(/class="infobox-image"[^>]*>.*?src="(\/commons\/images\/[^"]+)"/is);
    if(match && match[1]) {
        let thumbUrl = match[1];
        if (thumbUrl.includes('/thumb/')) {
            let parts = thumbUrl.replace('/thumb', '').split('/');
            parts.pop();
            return "https://liquipedia.net" + parts.join('/');
        }
        return "https://liquipedia.net" + thumbUrl;
    }
    
    return null;
}

(async () => {
    let mapping = {};
    for(let team of teams) {
        console.log("Fetching: " + team);
        try {
            const url = await getLogoUrl(team);
            if(url) {
                console.log("Found: " + url);
                mapping[team] = url;
            } else {
                console.log("Not found for " + team);
            }
        } catch(e) { console.error(e.message); }
        await new Promise(r => setTimeout(r, 600)); // Delay to not spam API
    }
    fs.writeFileSync('logo_mapping.json', JSON.stringify(mapping, null, 2));
    console.log("Done scraper");
})();
