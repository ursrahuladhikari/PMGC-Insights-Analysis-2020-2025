import fs from 'fs';
const files = fs.readdirSync('./public/assets/logos');
console.log(files.filter(f => f.toLowerCase().includes('loops')));
