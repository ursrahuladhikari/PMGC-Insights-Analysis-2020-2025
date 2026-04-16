const fs = require('fs');

// 2023: missing Persija EVOS (not in data?) — check all non-finalist names
const d23 = JSON.parse(fs.readFileSync('data/pmgc_2023_data.json','utf8'));
const missing23 = ['Persija EVOS','Yoodo Alliance'].filter(n => !d23.teams.find(t => t.name === n));
console.log('2023 missing from JSON:', missing23);

// 2024: check which finalists names don't match
const d24 = JSON.parse(fs.readFileSync('data/pmgc_2024_data.json','utf8'));
const gfNames24 = ["Dplus","RC BRA Esports","Nigma Galaxy","4Merical Vibes","Team Spirit","DRX","VOIN Donkey ID","Falcons Force","Insilio","Natus Vincere","Alpha7 Esports","RCB","Tong Jia Bao Esports","ThunderTalk Gaming","Guild Esports","De Muerte"];
gfNames24.forEach(n => {
    const found = d24.teams.find(t => t.name === n);
    if (!found) console.log('2024 missing:', n, '| similar:', d24.teams.filter(t => t.name.includes(n.split(' ')[0])).map(t=>t.name));
});

// 2025: check which finalists names don't match  
const d25 = JSON.parse(fs.readFileSync('data/pmgc_2025_data.json','utf8'));
const gfNames25 = ["Alpha7 Esports","Regnum Carya Esports","Natus Vincere","Team Falcons","D'Xavier","NMG","DRX","ThunderTalk Gaming","R8 Esports","Madbulls","Alter Ego Ares","ULF Esports","Dplus","eArena","Vampire Esports","Kara Esports"];
gfNames25.forEach(n => {
    const found = d25.teams.find(t => t.name === n);
    if (!found) console.log('2025 missing:', n, '| similar:', d25.teams.filter(t => t.name.toLowerCase().includes(n.toLowerCase().split(' ')[0])).map(t=>t.name));
});
