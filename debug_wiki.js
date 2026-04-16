import fetch from 'node-fetch';

async function test() {
    console.log("Starting test...");
    const url = 'https://liquipedia.net/pubgmobile/api.php?action=query&titles=PUBG_Mobile_Global_Championship/2023&prop=revisions&rvprop=content&rvslots=main&format=json&formatversion=2';
    try {
        const res = await fetch(url, {
            headers: {
                'User-Agent': 'PMGCDashboard/1.0 (Educational project)'
            }
        });
        console.log("Status:", res.status);
        if (!res.ok) {
            console.error("Response not OK");
            return;
        }
        const data = await res.json();
        const content = data.query.pages[0].revisions[0].slots.main.content;
        console.log("Content length:", content.length);
        console.log("First 500 chars:", content.substring(0, 500));
    } catch (e) {
        console.error("Error during fetch:", e);
    }
}

test();
