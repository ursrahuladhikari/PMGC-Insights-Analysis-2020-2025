const fs = require('fs');

// Fix remaining name mismatches directly in the JSON
// 2024: "Regnum Carya" → stored as "RC BRA Esports"? Let's find the actual names
const d24 = JSON.parse(fs.readFileSync('data/pmgc_2024_data.json','utf8'));
const d25 = JSON.parse(fs.readFileSync('data/pmgc_2025_data.json','utf8'));
const d23 = JSON.parse(fs.readFileSync('data/pmgc_2023_data.json','utf8'));

// Print 2024 teams with "RC" or "Regnum" or close
console.log('=== 2024 teams with RC/Regnum/Spirit/Insilio:');
d24.teams.filter(t => /rc|regnum|spirit|insilio|virtus|natus/i.test(t.name)).forEach(t => console.log(' ', t.name));

// Print 2025 teams  
console.log('=== 2025 teams with Natus/NMG/Falcons:');
d25.teams.filter(t => /natus|nmg|falcon|regnum/i.test(t.name)).forEach(t => console.log(' ', t.name));

// Also check 2023 for EVOS
console.log('=== 2023 teams with EVOS/Persija:');
d23.teams.filter(t => /evos|persija/i.test(t.name)).forEach(t => console.log(' ', t.name));

// Check all 2024 and 2025 teams more broadly
console.log('\n=== All 2024 teams:');
d24.teams.forEach(t => console.log(' ', JSON.stringify(t.name)));
