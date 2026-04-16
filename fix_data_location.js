import fs from 'fs';
import path from 'path';

// Move broadcast_talent.js back to root data/
if (!fs.existsSync('./data')) fs.mkdirSync('./data');
if (fs.existsSync('./public/data/broadcast_talent.js')) {
    fs.renameSync('./public/data/broadcast_talent.js', './data/broadcast_talent.js');
    console.log('Moved broadcast_talent.js back to root data/');
}
