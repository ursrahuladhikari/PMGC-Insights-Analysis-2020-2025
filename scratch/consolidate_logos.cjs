const fs = require('fs');
const path = require('path');

const years = [2020, 2021, 2022, 2023, 2024, 2025];
const targetDir = path.join('assets', 'logos');

if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
}

let movedCount = 0;

years.forEach(year => {
    let dataPath = path.join('data', `pmgc_${year}_data.json`);
    if (fs.existsSync(dataPath)) {
        let data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
        let dirty = false;

        data.teams.forEach(t => {
            if (t.logo) {
                // Determine the currently stored file
                let currentPath = path.normalize(t.logo.replace('./', ''));
                if (fs.existsSync(currentPath)) {
                    let filename = path.basename(currentPath);
                    let destPath = path.join(targetDir, filename);
                    
                    // Copy file to assets/logos/ if it's not already there or to overwrite
                    // Only copy if it's actually in a PMGC folder
                    if (currentPath.includes('PMGC_') && !fs.existsSync(destPath)) {
                        fs.copyFileSync(currentPath, destPath);
                        movedCount++;
                    } else if (currentPath.includes('PMGC_') && fs.existsSync(destPath)) {
                        // File already exists in logos, maybe it's fine. We'll trust whatever is in logos.
                        // Or we overwrite? No need.
                    }

                    // Update JSON to point to absolute logos folder
                    let newLogoPath = `./assets/logos/${filename}`;
                    if (t.logo !== newLogoPath) {
                        t.logo = newLogoPath;
                        dirty = true;
                    }
                }
            }
        });

        if (dirty) {
            fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
        }
    }
});

console.log(`Consolidated! Moved/Copied ${movedCount} unique files into assets/logos/ and updated all JSONs.`);
