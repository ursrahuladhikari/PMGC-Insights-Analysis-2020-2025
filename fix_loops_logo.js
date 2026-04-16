import fs from 'fs';
import path from 'path';

const logosDir = './public/assets/logos';
const dataDir = './public/data';

// 1. Rename loops.png to Loops.png using a temp step for Windows
const oldPath = path.join(logosDir, 'loops.png');
const tempPath = path.join(logosDir, 'loops_temp.png');
const newPath = path.join(logosDir, 'Loops.png');

if (fs.existsSync(oldPath)) {
    fs.renameSync(oldPath, tempPath);
    fs.renameSync(tempPath, newPath);
    console.log('Renamed loops.png to Loops.png (via temp).');
} else {
    console.log('loops.png not found at', oldPath);
}

// 2. Update all JSON files to use Loops.png instead of loops.png
const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));

files.forEach(file => {
    const filePath = path.join(dataDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Check both lowercase and uppercase variations just in case
    if (content.includes('/assets/logos/loops.png')) {
        content = content.replace(/\/assets\/logos\/loops.png/g, '/assets/logos/Loops.png');
        fs.writeFileSync(filePath, content);
        console.log(`Updated loops path in ${file}`);
    }
});
