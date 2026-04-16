import fs from 'fs';
import path from 'path';

const dataDir = './public/data';
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

files.forEach(file => {
    const filePath = path.join(dataDir, file);
    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    if (content.teams) {
        content.teams.forEach(team => {
            if (team.logo && team.logo.startsWith('./assets/')) {
                team.logo = team.logo.replace('./assets/', '/assets/');
            }
        });
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2));
        console.log(`Updated paths in ${file}`);
    }
});
