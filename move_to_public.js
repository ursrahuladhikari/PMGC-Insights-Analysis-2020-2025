import fs from 'fs';
import path from 'path';

const folders = ['data', 'assets'];
const publicDir = './public';

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

folders.forEach(folder => {
    const src = path.join(process.cwd(), folder);
    const dest = path.join(process.cwd(), publicDir, folder);
    
    if (fs.existsSync(src)) {
        console.log(`Moving ${folder} to public/${folder}...`);
        fs.renameSync(src, dest);
    } else {
        console.log(`${folder} not found at root.`);
    }
});
