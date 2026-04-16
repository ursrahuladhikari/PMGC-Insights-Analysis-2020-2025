const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Find broadcast container div and replace everything up to </section>
const startMarker = '<div id="broadcast-container">';
const endMarker = '</section>\n\n            <section id="awards"';

const startIdx = html.indexOf(startMarker);
const endIdx = html.indexOf(endMarker);

if (startIdx === -1 || endIdx === -1) {
    console.log('Markers not found!');
    console.log('startIdx', startIdx, 'endIdx', endIdx);
    process.exit(1);
}

const replacement = `<div id="broadcast-container">
                    <div class="broadcast-no-data glass-card" style="text-align:center; padding:3rem; color: var(--text-secondary);">
                        <p>📡 Loading broadcast talent data...</p>
                    </div>
                </div>
            </section>

            <section id="awards"`;

const newHtml = html.substring(0, startIdx) + replacement + html.substring(endIdx + endMarker.length);
fs.writeFileSync('index.html', newHtml, 'utf8');
console.log('Done. Replaced broadcast section.');
