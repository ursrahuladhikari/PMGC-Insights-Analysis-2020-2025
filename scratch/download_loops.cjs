const https = require('https');
const fs = require('fs');

const file = fs.createWriteStream('./assets/PMGC_2020/loops.png');
https.get('https://liquipedia.net/commons/images/2/25/Loops_Esports_2021_allmode.png', { headers: { 'User-Agent': 'Mozilla/5.0' } }, function(response) {
  response.pipe(file);
  file.on('finish', function() {
    file.close();  // close() is async, call cb after close completes.
    console.log('Loops logo downloaded successfully to PMGC_2020.');
  });
}).on('error', function(err) { // Handle errors
  fs.unlink('./assets/PMGC_2020/loops.png', () => {}); // Delete the file async. (But we don't check the result)
  console.log('Error downloading Loops logo: ' + err.message);
});
