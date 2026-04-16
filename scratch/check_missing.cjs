const fs = require('fs');
const path = require('path');

const years = [2020, 2021, 2022, 2023, 2024, 2025];
let missingReport = {};

years.forEach(year => {
    const dataPath = path.join('data', `pmgc_${year}_data.json`);
    if (!fs.existsSync(dataPath)) return;
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    let missingTeams = [];
    data.teams.forEach(team => {
        if (!team.logo.includes(`assets/PMGC_${year}`)) {
            missingTeams.push({ name: team.name, currentLogo: team.logo });
        }
    });

    if (missingTeams.length > 0) {
        missingReport[year] = missingTeams;
    }
});

fs.writeFileSync('scratch/missing_logos_report.json', JSON.stringify(missingReport, null, 2));
console.log('Report generated at scratch/missing_logos_report.json');
