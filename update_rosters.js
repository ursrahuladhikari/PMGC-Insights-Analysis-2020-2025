import fs from 'fs';
import path from 'path';

const dataPath = path.join(process.cwd(), 'data', 'pmgc_2023_data.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const updates = {
  "HAIL Esports": ["TIGERx", "Nuttinz", "cSkyOnly", "PONDZ", "CONCEPT"],
  "DRS Gaming": ["DeltaX", "KillerYT", "RuLzSR", "Gyalzen", "Nima"],
  "Gaimin Gladiators": ["KITSUNÉ", "Matic", "Thunder", "Mequ", "Tixzy"],
  "Team Weibo": ["Suk", "YMao", "MingSkr", "Z9", "Pickfeet"],
  "Tianba": ["TianYu", "Ydd", "Qz", "QingChen", "L1ng"],
  "Six Two Eight": ["33z", "SuNan", "Xing", "PiKa", "YvBao"],
  "Stalwart Esports": ["TOP", "Action", "NIRZED", "ICY", "Pikachu"]
};

data.teams.forEach(team => {
   if (updates[team.name]) {
       team.players = updates[team.name];
   }
});

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log('Complete!');
