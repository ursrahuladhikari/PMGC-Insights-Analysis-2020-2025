const broadcastData = {
  2020: {
    regions: ["English", "Middle East", "SEA", "LATAM", "South Asia", "Asia", "European"],
    tabs: [
      { id: "english",    label: "🇬🇧 English" },
      { id: "middleeast", label: "🕌 Middle East" },
      { id: "sea",        label: "🌏 SEA" },
      { id: "latam",      label: "🌎 LATAM" },
      { id: "southasia",  label: "🌍 South Asia" },
      { id: "asia",       label: "🌐 Asia" },
      { id: "european",   label: "🇪🇺 European" }
    ],
    cards: [
      {
        region: "english", lang: "English", flag: "🇬🇧",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsports",
        talent: [
          { role: "Host",         names: ["JKaplan"] },
          { role: "Analysts",     names: ["Deman", "Maxman", "The7WorldsGaming"] },
          { role: "Commentators", names: ["Blank", "ChuChu", "HotJukes", "Icybaby12", "Imperium", "John Allen", "Mustache Dave", "Sir_Cloud"] }
        ]
      },
      {
        region: "middleeast", lang: "Arabic", flag: "🇸🇦",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEMENAOFFICIAL",
        talent: [
          { role: "Commentators", names: ["K0de", "Kayyali", "Starfall"] }
        ]
      },
      {
        region: "sea", lang: "Thai", flag: "🇹🇭",
        ytUrl: "https://www.youtube.com/@pubgmobilethailand",
        talent: [
          { role: "Analyst",      names: ["BOM"] },
          { role: "Commentators", names: ["Aomdi", "Archz", "Fame", "KirosZ", "Voo", "Zaffer"] }
        ]
      },
      {
        region: "sea", lang: "Malay", flag: "🇲🇾",
        ytUrl: "https://www.youtube.com/@pubgmobilemy",
        talent: [
          { role: "Commentators", names: ["ChuChu", "Emi Mohamad", "J Hunter", "OnTheGo", "Qontra", "Sir_Cloud", "Soultannn"] }
        ]
      },
      {
        region: "sea", lang: "Indonesian", flag: "🇮🇩",
        ytUrl: "https://www.youtube.com/@pubgmobileid",
        talent: [
          { role: "Analysts",     names: ["El Dogee", "Junior", "Wawa Mania"] },
          { role: "Commentators", names: ["Donna", "Jelly", "Pasta", "Sanskuy", "Windy", "Wolfy"] }
        ]
      },
      {
        region: "sea", lang: "Vietnamese", flag: "🇻🇳",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEVN1",
        talent: [
          { role: "Commentators", names: ["Cuong OT", "Huy Lova", "Trong Linh", "TungTT"] }
        ]
      },
      {
        region: "sea", lang: "Burmese", flag: "🇲🇲",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEMyanmar",
        talent: [
          { role: "Commentators", names: ["Blingx", "Irregular"] }
        ]
      },
      {
        region: "latam", lang: "Spanish", flag: "🇪🇸",
        ytUrl: "https://www.youtube.com/@PUBGMOBILELATAM",
        talent: [
          { role: "Host",         names: ["Emmet"] },
          { role: "Analyst",      names: ["Gabo"] },
          { role: "Commentators", names: ["H1RO", "KevinMPV", "SmartMonoPCK"] }
        ]
      },
      {
        region: "latam", lang: "Portuguese", flag: "🇧🇷",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEBrasil",
        talent: [
          { role: "Host",         names: ["Vespa"] },
          { role: "Analyst",      names: ["Khaya"] },
          { role: "Commentators", names: ["Pew3x", "Reppulsor"] }
        ]
      },
      {
        region: "southasia", lang: "Nepali", flag: "🇳🇵",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Commentators", names: ["AnshYT", "Indu Malla", "MSD Gaming Nepal"] }
        ]
      },
      {
        region: "southasia", lang: "Hindi", flag: "🇮🇳",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Commentators", names: ["Fyxs", "K18", "Ocean", "Super Jonny"] }
        ]
      },
      {
        region: "asia", lang: "Chinese", flag: "🇨🇳",
        ytUrl: "https://www.youtube.com/@pubgmobile",
        talent: [
          { role: "Commentators", names: ["LuLi", "屈涛 (Qu Tao)", "昂哥", "阿梅 (Wang Yichang)"] }
        ]
      },
      {
        region: "asia", lang: "Japanese", flag: "🇯🇵",
        ytUrl: "https://www.youtube.com/@PUBGMOBILE_JAPAN",
        talent: [
          { role: "Commentators", names: ["RintoXD", "YamatoN"] }
        ]
      },
      {
        region: "asia", lang: "Taiwanese", flag: "🇹🇼",
        ytUrl: "https://www.youtube.com/@pubgmobile",
        talent: [
          { role: "Commentators", names: ["ArMor", "Krapy", "Nia", "Paul"] }
        ]
      },
      {
        region: "asia", lang: "Korean", flag: "🇰🇷",
        ytUrl: "https://www.youtube.com/@pubgmobileKR",
        talent: [
          { role: "Commentators", names: ["BINBON", "DONGJIN", "Kim Young Il"] }
        ]
      },
      {
        region: "european", lang: "CIS/Russian", flag: "🇷🇺",
        ytUrl: "https://www.youtube.com/@PUBGMOBILERU",
        talent: [
          { role: "Analyst",      names: ["Lazy"] },
          { role: "Commentators", names: ["Bertkhan", "Chikenfood", "Coldstar", "Medic", "TakyTaOmi"] }
        ]
      },
      {
        region: "european", lang: "Turkish", flag: "🇹🇷",
        ytUrl: "https://www.youtube.com/@PUBGMOBILE_TR",
        talent: [
          { role: "Commentators", names: ["Gtrst", "Mehitra", "Rowincy", "sencerEZ", "Timurlengx"] }
        ]
      }
    ]
  },

  2021: {
    regions: ["English", "SEA", "East Asia", "South Asia", "Arabic", "European", "Americas"],
    tabs: [
      { id: "english",    label: "🇬🇧 English" },
      { id: "sea",        label: "🌏 SEA" },
      { id: "eastasia",   label: "🌐 East Asia" },
      { id: "southasia",  label: "🌍 South Asia" },
      { id: "arabic",     label: "🕌 Arabic" },
      { id: "european",   label: "🇪🇺 European" },
      { id: "americas",   label: "🌎 Americas" }
    ],
    cards: [
      {
        region: "english", lang: "English", flag: "🇬🇧",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsports",
        talent: [
          { role: "GF Stage Host",      names: ["Miles Moretti"] },
          { role: "GF Interviewer",     names: ["Charmaine"] },
          { role: "East & GF Desk Host",names: ["JKaplan"] },
          { role: "West Desk Host",     names: ["SpanCargo"] },
          { role: "Analysts",           names: ["GlitterXplosion", "Kaelaris", "Maxman", "Professor Tarzan", "The7WorldsGaming", "ZooTay"] },
          { role: "Commentators",       names: ["Blank", "Bleh", "HighlandWolf", "HotJukes", "ImPERium", "John Allen", "Mustache Dave", "Nekrou"] }
        ]
      },
      {
        region: "sea", lang: "Indonesian", flag: "🇮🇩",
        ytUrl: "https://www.youtube.com/@pubgmobileid",
        talent: [
          { role: "Analysts",     names: ["El Dogee", "Odidieu"] },
          { role: "Commentators", names: ["Donna", "Jelly", "Junior", "Pasta", "Sanskuy", "Windy", "Wolfy"] }
        ]
      },
      {
        region: "sea", lang: "Malaysian", flag: "🇲🇾",
        ytUrl: "https://www.youtube.com/@pubgmobilemy",
        talent: [
          { role: "Commentators", names: ["ChuChu", "Emi", "J Hunter", "Kyrul", "OnTheGo", "Sir Cloud", "Soultan", "TopCast"] }
        ]
      },
      {
        region: "sea", lang: "Thai", flag: "🇹🇭",
        ytUrl: "https://www.youtube.com/@pubgmobilethailand",
        talent: [
          { role: "Commentators", names: ["Archz", "Ffame", "Godfreebird", "Zaffer"] }
        ]
      },
      {
        region: "sea", lang: "Vietnamese", flag: "🇻🇳",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEVN1",
        talent: [
          { role: "Commentators", names: ["Cường OT", "Kuook", "Loki", "Tuấn Tái", "Tùng TT"] }
        ]
      },
      {
        region: "sea", lang: "Filipino", flag: "🇵🇭",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEPhilippines",
        talent: [
          { role: "Commentators", names: ["BekBek", "Daks", "KukuTV", "Nomad", "PhauloB", "Reyrey", "VeenzG"] }
        ]
      },
      {
        region: "eastasia", lang: "Chinese", flag: "🇨🇳",
        ytUrl: "https://www.youtube.com/@pubgmobile",
        talent: [
          { role: "NOVA Commentators",  names: ["qc", "小游 (Wang Youfang)", "阿辉"] },
          { role: "STE Commentators",   names: ["Fruit (Liu Zhentao)", "迷离"] },
          { role: "TJB Commentators",   names: ["冰吻", "吉祥", "小畅"] }
        ]
      },
      {
        region: "eastasia", lang: "Korean", flag: "🇰🇷",
        ytUrl: "https://www.youtube.com/@pubgmobileKR",
        talent: [
          { role: "Interviewer",  names: ["Da Young Jung"] },
          { role: "Commentators", names: ["BINBON", "Choi Kwang-won", "Mirdayo", "Park Dong-jin", "Park Han-eol", "Park Tae-min", "ZZP"] }
        ]
      },
      {
        region: "eastasia", lang: "Japanese", flag: "🇯🇵",
        ytUrl: "https://www.youtube.com/@PUBGMOBILE_JAPAN",
        talent: [
          { role: "Commentators",       names: ["Junyou Yamauchi", "RintoXD", "YamatoN", "シンイチロォ"] },
          { role: "Guest Commentators", names: ["Andon", "MayuC"] }
        ]
      },
      {
        region: "eastasia", lang: "Taiwanese", flag: "🇹🇼",
        ytUrl: "https://www.youtube.com/@pubgmobile",
        talent: [
          { role: "Commentators", names: ["AA", "Brain腦袋", "DiDi", "Eas0n", "GuaLow", "Hong", "HuoXuan", "JaeCarry", "WaNUo"] }
        ]
      },
      {
        region: "southasia", lang: "Mongolian", flag: "🇲🇳",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Commentators", names: ["Tami", "Tuvshuun"] }
        ]
      },
      {
        region: "southasia", lang: "Hindi", flag: "🇮🇳",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Commentators", names: ["Fyxs", "Jonny", "MacV1per", "Ocean", "Phoenix"] }
        ]
      },
      {
        region: "southasia", lang: "Nepali", flag: "🇳🇵",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Commentators", names: ["Ansh", "MSD Gaming"] }
        ]
      },
      {
        region: "southasia", lang: "Urdu", flag: "🇵🇰",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Commentator", names: ["Aladdin"] }
        ]
      },
      {
        region: "southasia", lang: "Bengali", flag: "🇧🇩",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Commentators", names: ["AresOP", "FinixOP"] }
        ]
      },
      {
        region: "arabic", lang: "Arabic", flag: "🇸🇦",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEMENAOFFICIAL",
        talent: [
          { role: "Host & Analyst", names: ["Kayyali"] },
          { role: "Commentators",   names: ["Almola", "K0de", "Sandstorm", "Youcef"] }
        ]
      },
      {
        region: "european", lang: "Russian", flag: "🇷🇺",
        ytUrl: "https://www.youtube.com/@PUBGMOBILERU",
        talent: [
          { role: "Commentators", names: ["Bertkhan", "Chikenfood", "Fenix", "Medic"] }
        ]
      },
      {
        region: "european", lang: "Turkish", flag: "🇹🇷",
        ytUrl: "https://www.youtube.com/@PUBGMOBILE_TR",
        talent: [
          { role: "Commentators", names: ["AlpTV", "Gtrst", "Mehitra", "Scott", "Secondbest", "SencerEZ"] }
        ]
      },
      {
        region: "european", lang: "German", flag: "🇩🇪",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsports",
        talent: [
          { role: "Commentators", names: ["FALECX", "Gideon", "Souljah87", "Trauni"] }
        ]
      },
      {
        region: "european", lang: "French", flag: "🇫🇷",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsports",
        talent: [
          { role: "Commentators", names: ["Co6nus", "CopierColler", "Manath", "Sunsura"] }
        ]
      },
      {
        region: "americas", lang: "Portuguese", flag: "🇧🇷",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEBrasil",
        talent: [
          { role: "Commentators", names: ["Astrid", "Khaya", "Petar", "Pew", "Repp", "Toboco", "Vespa"] }
        ]
      },
      {
        region: "americas", lang: "Spanish", flag: "🇪🇸",
        ytUrl: "https://www.youtube.com/@PUBGMOBILELATAM",
        talent: [
          { role: "Commentators", names: ["Corsario", "Emmet", "Jaguar70", "KevinMPV", "Killer", "Smartmono"] }
        ]
      }
    ]
  },


  2025: {
    regions: ["English & Thai", "SEA", "CSA", "EU & MEA", "Americas", "Other"],
    tabs: [
      { id: "english",  label: "🇬🇧 English & Thai 🇹🇭" },
      { id: "sea",      label: "🌏 SEA" },
      { id: "csa",      label: "🌍 CSA" },
      { id: "eumea",    label: "🌍 EU & MEA" },
      { id: "americas", label: "🌎 Americas" },
      { id: "other",    label: "🌐 Other" }
    ],
    cards: [
      // English & Thai tab
      {
        region: "english", lang: "English", flag: "🇬🇧",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsports",
        talent: [
          { role: "Stage Hosts",  names: ["Banks", "The7WG"] },
          { role: "GF Stage Host",names: ["Natcha"] },
          { role: "Desk Host",    names: ["HotJukes"] },
          { role: "Analysts",     names: ["Maxman", "Neptura", "The7WG"] },
          { role: "Commentators", names: ["Blank", "John Allen"] }
        ]
      },
      {
        region: "english", lang: "Thai", flag: "🇹🇭",
        ytUrl: "https://www.youtube.com/@pubgmobilethailand",
        talent: [
          { role: "Host",         names: ["Rocklee"] },
          { role: "Analysts",     names: ["D2E", "G9", "MADTOI", "MARTIN", "Stoned", "Vintorez"] },
          { role: "Commentators", names: ["Aoeyjiwa", "Archz", "BeCrazy", "Ffame", "Glacius", "Godfreebird", "Zaffer"] }
        ]
      },
      // SEA
      {
        region: "sea", lang: "Indonesian", flag: "🇮🇩",
        ytUrl: "https://www.youtube.com/@pubgmobileid",
        talent: [
          { role: "Host",         names: ["Donna"] },
          { role: "Analysts",     names: ["El Dogee", "Junior", "Wolfy"] },
          { role: "Commentators", names: ["Jelly", "Pasta", "Royaldy", "Sanskuy", "Windy"] }
        ]
      },
      {
        region: "sea", lang: "Malay", flag: "🇲🇾",
        ytUrl: "https://www.youtube.com/@pubgmobilemy",
        talent: [
          { role: "Host",         names: ["ChuChu"] },
          { role: "Analyst",      names: ["TopCast"] },
          { role: "Commentators", names: ["Emi", "J Hunter", "OnTheGo", "Soultannn"] }
        ]
      },
      {
        region: "sea", lang: "Vietnamese", flag: "🇻🇳",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEVN1",
        talent: [
          { role: "Commentators", names: ["Cường OT", "Kuook", "Loki", "Trọng Linh", "Tuấn Tái"] }
        ]
      },
      {
        region: "sea", lang: "Burmese", flag: "🇲🇲",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEMyanmar",
        talent: [
          { role: "Commentator", names: ["TBA"] }
        ]
      },
      {
        region: "sea", lang: "Tagalog", flag: "🇵🇭",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEPhilippines",
        talent: [
          { role: "Commentators", names: ["AyaPlays", "EdoTen", "KukuTV", "PhauloB", "QueenToyo"] }
        ]
      },
      {
        region: "sea", lang: "Khmer", flag: "🇰🇭",
        ytUrl: "https://www.youtube.com/@PUBGMOBILECambodia",
        talent: [
          { role: "Commentators", names: ["Crim", "Ream Angkor", "STALKER"] }
        ]
      },
      // CSA (Central & South Asia)
      {
        region: "csa", lang: "Bangla", flag: "🇧🇩",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Commentators", names: ["Mohaiminul", "Tear", "Zapdos Plays"] }
        ]
      },
      {
        region: "csa", lang: "Urdu", flag: "🇵🇰",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Commentators", names: ["Aadi", "Aladdin", "Gaming Portal", "Khiz Gaming", "Torrix"] }
        ]
      },
      {
        region: "csa", lang: "Nepali", flag: "🇳🇵",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Commentators", names: ["AnshYT", "Mandip Casts"] }
        ]
      },
      // EU & MEA
      {
        region: "eumea", lang: "Turkish", flag: "🇹🇷",
        ytUrl: "https://www.youtube.com/@PUBGMOBILE_TR",
        talent: [
          { role: "Commentators", names: ["Scarlet", "Scott", "SencerEZ", "Yargic Tony"] }
        ]
      },
      {
        region: "eumea", lang: "Arabic", flag: "🇸🇦",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEMENAOFFICIAL",
        talent: [
          { role: "Commentators", names: ["Almola", "Bayat", "Mao", "Mo3taz", "Snake", "Youcef"] }
        ]
      },
      {
        region: "eumea", lang: "Russian", flag: "🇷🇺",
        ytUrl: "https://www.youtube.com/@PUBGMOBILERU",
        talent: [
          { role: "Commentators", names: ["AmaiYA", "Chikenfood", "Fenix", "Legacy", "Nerzul", "PREPOD"] }
        ]
      },
      {
        region: "eumea", lang: "Mongolian", flag: "🇲🇳",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Commentators", names: ["Skryyy", "Tuugii", "Wise"] }
        ]
      },
      {
        region: "eumea", lang: "Uzbek", flag: "🇺🇿",
        ytUrl: "https://www.youtube.com/@pubgmobile_uz",
        talent: [
          { role: "Commentators", names: ["EAGLE BRO", "RHYTHM"] }
        ]
      },
      // Americas
      {
        region: "americas", lang: "Portuguese", flag: "🇧🇷",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEBrasil",
        talent: [
          { role: "Commentators", names: ["Caiowski", "Ferzote", "Hads", "Leona", "Reppulsor", "Stoker"] }
        ]
      },
      {
        region: "americas", lang: "Spanish", flag: "🇪🇸",
        ytUrl: "https://www.youtube.com/@PUBGMOBILELATAM",
        talent: [
          { role: "Commentators", names: ["Daphne", "Frata", "Jaguar70"] }
        ]
      },
      // Other (East Asia)
      {
        region: "other", lang: "Mandarin", flag: "🇨🇳",
        ytUrl: "https://www.youtube.com/@pubgmobile",
        talent: [
          { role: "Commentators", names: ["TBA"] }
        ]
      },
      {
        region: "other", lang: "Korean", flag: "🇰🇷",
        ytUrl: "https://www.youtube.com/@pubgmobileKR",
        talent: [
          { role: "Casters",      names: ["Park Dong-jin", "Park Han-eol", "Shim Ji-soo"] },
          { role: "Commentators", names: ["Han Jeong-uk", "Jeon Min-jae", "Kim Dong-yeon", "Park Dong-jin", "Shin Jung-min"] }
        ]
      },
      {
        region: "other", lang: "Japanese", flag: "🇯🇵",
        ytUrl: "https://www.youtube.com/@PUBGMOBILE_JAPAN",
        talent: [
          { role: "Commentators", names: ["Junyou Yamauchi", "RintoXD", "Shinichiro"] }
        ]
      }
    ]
  },
  2022: {
    regions: ["English", "SEA", "South Asia", "East Asia", "Arabic", "Europe", "Americas"],
    tabs: [
      { id: "english", label: "English" },
      { id: "sea",     label: "SEA" },
      { id: "southasia", label: "South Asia" },
      { id: "eastasia",  label: "East Asia" },
      { id: "arabic",    label: "Arabic" },
      { id: "europe",    label: "Europe" },
      { id: "americas",  label: "Americas" }
    ],
    cards: [
      // English
      {
        region: "english", lang: "English", flag: "🇬🇧",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsports",
        talent: [
          { role: "Desk Hosts",   names: ["FALECX", "HotJukes", "JKaplan"] },
          { role: "Stage Hosts",  names: ["Banks", "ChuChu", "Flava", "Qontra", "TashBunny"] },
          { role: "Analysts",     names: ["GlitterXplosion", "Maxman", "Sandstorm", "The7WG"] },
          { role: "Commentators", names: ["Blank", "EsProxy", "ImPERium", "John Allen", "ZooTay"] }
        ]
      },
      // SEA
      {
        region: "sea", lang: "Indonesian", flag: "🇮🇩",
        ytUrl: "https://www.youtube.com/@pubgmobileid",
        talent: [
          { role: "Commentators", names: ["Bangpen", "Donna", "El Dogee", "Jelly", "Junior", "Odidieu", "Pasta", "Resky Boga", "Sanskuy", "Windy", "Wolfy"] },
          { role: "Guest Commentary (GF)", names: ["Ryzen"] }
        ]
      },
      {
        region: "sea", lang: "Malay", flag: "🇲🇾",
        ytUrl: "https://www.youtube.com/@pubgmobilemy",
        talent: [
          { role: "Commentators", names: ["Emi", "J Hunter", "Kyrul", "OnTheGo", "Soultannn", "TopCast"] }
        ]
      },
      {
        region: "sea", lang: "Thai", flag: "🇹🇭",
        ytUrl: "https://www.youtube.com/@pubgmobilethailand",
        talent: [
          { role: "Commentators", names: ["Aoeyjiwa", "Archz", "BeCrazy", "Ffame", "Zaffer"] }
        ]
      },
      {
        region: "sea", lang: "Vietnamese", flag: "🇻🇳",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEVN1",
        talent: [
          { role: "Commentators", names: ["Cường OT", "Kuook", "Loki", "Tuấn Tái", "Tùng TT"] }
        ]
      },
      {
        region: "sea", lang: "Burmese", flag: "🇲🇲",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEMyanmar",
        talent: [
          { role: "Commentators", names: ["Blingx", "Hugo", "Irregular", "Zan"] }
        ]
      },
      {
        region: "sea", lang: "Tagalog", flag: "🇵🇭",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEPhilippines",
        talent: [
          { role: "Commentators", names: ["BekBek", "QueenToyo"] }
        ]
      },
      {
        region: "sea", lang: "Khmer", flag: "🇰🇭",
        ytUrl: "https://www.youtube.com/@PUBGMOBILECambodia",
        talent: [
          { role: "Commentator", names: ["Ream Angkor"] }
        ]
      },
      // South Asia
      {
        region: "southasia", lang: "Nepali", flag: "🇳🇵",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Commentators", names: ["AnshYT", "Bipul", "Caster Blaster", "Mandip Casts", "Rashmay", "Vampy Casts"] }
        ]
      },
      {
        region: "southasia", lang: "Bangla", flag: "🇧🇩",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Commentators", names: ["FinixOP", "Sparki"] }
        ]
      },
      {
        region: "southasia", lang: "Mongolian", flag: "🇲🇳",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Commentators", names: ["Tuvshintugs", "Tuvshuun", "Wise"] }
        ]
      },
      {
        region: "southasia", lang: "Urdu", flag: "🇵🇰",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Commentators", names: ["Aadi", "Ahsan", "Aladdin"] }
        ]
      },
      // East Asia
      {
        region: "eastasia", lang: "Mandarin", flag: "🇨🇳",
        ytUrl: "https://www.youtube.com/@pubgmobile",
        talent: [
          { role: "Commentators", names: ["TBA"] }
        ]
      },
      {
        region: "eastasia", lang: "Korean", flag: "🇰🇷",
        ytUrl: "https://www.youtube.com/@pubgmobileKR",
        talent: [
          { role: "Commentators", names: ["Bino", "Choi Kwang-won", "Justice", "Lee Jong-woo", "Park Dong-jin", "Park Han-eol", "Shim Ji-soo"] }
        ]
      },
      {
        region: "eastasia", lang: "Japanese", flag: "🇯🇵",
        ytUrl: "https://www.youtube.com/@PUBGMOBILE_JAPAN",
        talent: [
          { role: "Commentators", names: ["Critical Tomato", "Junyou Yamauchi", "Nanokuni", "Razzy", "RintoXD", "Shinichiro", "Zussy"] }
        ]
      },
      // Arabic
      {
        region: "arabic", lang: "Arabic", flag: "🇸🇦",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEMENAOFFICIAL",
        talent: [
          { role: "Commentators", names: ["Almola", "K0de", "Kayyali", "Mao", "Mo3taz", "Starfall", "Youcef"] }
        ]
      },
      // Europe
      {
        region: "europe", lang: "Turkish", flag: "🇹🇷",
        ytUrl: "https://www.youtube.com/@PUBGMOBILE_TR",
        talent: [
          { role: "Commentators", names: ["Amigo", "DU Cast", "Mehitra", "Scott", "SecondBest", "Sencer", "Tintin", "Yargic Tony"] }
        ]
      },
      {
        region: "europe", lang: "Russian", flag: "🇷🇺",
        ytUrl: "https://www.youtube.com/@PUBGMOBILERU",
        talent: [
          { role: "Commentators", names: ["Bamb1ni", "Starboy", "YARLIVE"] }
        ]
      },
      {
        region: "europe", lang: "Kazakh", flag: "🇰🇿",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEKazakhstan",
        talent: [
          { role: "Commentators", names: ["LastHero", "Smitty"] }
        ]
      },
      // Americas
      {
        region: "americas", lang: "Portuguese", flag: "🇧🇷",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEBrasil",
        talent: [
          { role: "Commentators", names: ["Imbativel", "Khaya", "Petar", "Pew3x", "Toboco", "Vespa"] }
        ]
      },
      {
        region: "americas", lang: "Spanish", flag: "🇪🇸",
        ytUrl: "https://www.youtube.com/@PUBGMOBILELATAM",
        talent: [
          { role: "Commentators", names: ["Corsario", "Gatik", "Jaguar70", "KevinMPV", "KILLER", "Smartmono"] }
        ]
      }
    ]
  },
  2023: {
    regions: ["English", "Turkish", "SEA", "South Asia", "Arabic", "Europe", "Americas", "East Asia"],
    tabs: [
      { id: "english",    label: "English" },
      { id: "turkish",    label: "Turkish" },
      { id: "sea",        label: "SEA" },
      { id: "southasia",  label: "South Asia" },
      { id: "arabic",     label: "Arabic" },
      { id: "europe",     label: "Europe" },
      { id: "americas",   label: "Americas" },
      { id: "eastasia",   label: "East Asia" }
    ],
    cards: [
      {
        region: "english", lang: "English", flag: "🇬🇧",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsports",
        talent: [
          { role: "Stage Hosts",  names: ["ChuChu", "TashBunny", "Banks"] },
          { role: "Desk Hosts",   names: ["HotJukes", "JKaplan"] },
          { role: "Analysts",     names: ["Cameron Davis", "Kaelaris", "Maxman", "The7WG"] },
          { role: "Commentators", names: ["Blank", "Jacky", "John Allen", "ZooTay"] }
        ]
      },
      {
        region: "turkish", lang: "Turkish", flag: "🇹🇷",
        ytUrl: "https://www.youtube.com/@PUBGMOBILE_TR",
        talent: [
          { role: "Host",         names: ["Tintin"] },
          { role: "Analysts",     names: ["Seyid", "Yargic Tony"] },
          { role: "Commentators", names: ["Erman Yasar", "Kaan Kural", "Scott", "SencerEZ"] }
        ]
      },
      {
        region: "sea", lang: "Indonesian", flag: "🇮🇩",
        ytUrl: "https://www.youtube.com/@pubgmobileid",
        talent: [
          { role: "Hosts",        names: ["Donna", "Windy"] },
          { role: "Analysts",     names: ["El Dogee", "Junior", "Odidieu", "Wolfy"] },
          { role: "Commentators", names: ["Jelly", "Pasta", "Sanskuy", "Wolfy"] }
        ]
      },
      {
        region: "sea", lang: "Malay", flag: "🇲🇾",
        ytUrl: "https://www.youtube.com/@pubgmobilemy",
        talent: [
          { role: "Hosts",        names: ["Emi", "Kyrul"] },
          { role: "Analysts",     names: ["J Hunter", "Soultannn"] },
          { role: "Commentators", names: ["J Hunter", "Kyrul", "OnTheGo", "TopCast"] }
        ]
      },
      {
        region: "sea", lang: "Thai", flag: "🇹🇭",
        ytUrl: "https://www.youtube.com/@pubgmobilethailand",
        talent: [
          { role: "Host",         names: ["Aoeyjiwa"] },
          { role: "Analyst",      names: ["BeCrazy"] },
          { role: "Commentators", names: ["Archz", "Ffame", "Zaffer"] }
        ]
      },
      {
        region: "sea", lang: "Vietnamese", flag: "🇻🇳",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEVN1",
        talent: [
          { role: "Commentators", names: ["Cường OT", "Huy Lova", "Hữu Nghĩa", "Kuook", "Loki", "Tuấn Tái", "VietOP"] }
        ]
      },
      {
        region: "sea", lang: "Burmese", flag: "🇲🇲",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEMyanmar",
        talent: [
          { role: "Commentators", names: ["Blingx", "Sammy", "Zan"] }
        ]
      },
      {
        region: "sea", lang: "Tagalog", flag: "🇵🇭",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEPhilippines",
        talent: [
          { role: "Commentators", names: ["AyaPlays", "BekBek", "PhauloB", "QueenToyo", "Reyrey"] }
        ]
      },
      {
        region: "sea", lang: "Khmer", flag: "🇰🇭",
        ytUrl: "https://www.youtube.com/@PUBGMOBILECambodia",
        talent: [
          { role: "Commentators", names: ["BiqDaddy", "Crim", "STALKER"] }
        ]
      },
      {
        region: "southasia", lang: "Urdu", flag: "🇵🇰",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Commentators", names: ["Aadi", "Aladdin", "Gaming Portal", "RZ"] }
        ]
      },
      {
        region: "southasia", lang: "Nepali", flag: "🇳🇵",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Commentators", names: ["AnshYT", "Bipul", "Mandip Casts", "MrHyozu"] }
        ]
      },
      {
        region: "southasia", lang: "Mongolian", flag: "🇲🇳",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Commentators", names: ["Tuvshintugs", "Wise"] }
        ]
      },
      {
        region: "arabic", lang: "Arabic", flag: "🇸🇦",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEMENAOFFICIAL",
        talent: [
          { role: "Hosts",        names: ["L3GEND", "Sandstorm"] },
          { role: "Analysts",     names: ["K0de", "Kayyali", "Mao", "Starfall"] },
          { role: "Commentators", names: ["Almola", "Flanker", "Mo3taz", "Youcef"] }
        ]
      },
      {
        region: "europe", lang: "Russian", flag: "🇷🇺",
        ytUrl: "https://www.youtube.com/@PUBGMOBILERU",
        talent: [
          { role: "Broadcast Director", names: ["Starboy"] },
          { role: "Commentators",       names: ["Coldstar", "Fenix"] }
        ]
      },
      {
        region: "europe", lang: "Kazakh", flag: "🇰🇿",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEKazakhstan",
        talent: [
          { role: "Commentators", names: ["Gonzo", "LastHero"] }
        ]
      },
      {
        region: "europe", lang: "Uzbek", flag: "🇺🇿",
        ytUrl: "https://www.youtube.com/@pubgmobile_uz",
        talent: [
          { role: "Commentators", names: ["EAGLE BRO", "RHYTHM"] }
        ]
      },
      {
        region: "americas", lang: "Portuguese", flag: "🇧🇷",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEBrasil",
        talent: [
          { role: "Commentators", names: ["Ferzote", "Hads", "Khaya", "MurilloShooow", "Pew3x"] }
        ]
      },
      {
        region: "americas", lang: "Spanish", flag: "🇪🇸",
        ytUrl: "https://www.youtube.com/@PUBGMOBILELATAM",
        talent: [
          { role: "Commentators", names: ["Daphne", "Frata", "Gatik", "Jaguar70", "KevinMPV", "KILLER"] }
        ]
      },
      {
        region: "eastasia", lang: "Mandarin", flag: "🇨🇳",
        ytUrl: "https://www.youtube.com/@pubgmobile",
        talent: [
          { role: "Commentators", names: ["TBA"] }
        ]
      },
      {
        region: "eastasia", lang: "Korean", flag: "🇰🇷",
        ytUrl: "https://www.youtube.com/@pubgmobileKR",
        talent: [
          { role: "Casters",      names: ["Kim Hee-joo", "Park Han-eol"] },
          { role: "Commentators", names: ["Bino", "FINALE", "Kim Dong-yeon", "Kura", "NOVA", "ONBA", "Park Dong-jin", "Shin Jung-min", "WH0RU", "ZZP"] }
        ]
      },
      {
        region: "eastasia", lang: "Japanese", flag: "🇯🇵",
        ytUrl: "https://www.youtube.com/@PUBGMOBILE_JAPAN",
        talent: [
          { role: "Commentators",       names: ["Junyou Yamauchi", "OooDa", "RintoXD", "Shinichiro", "Zussy"] },
          { role: "Guest Commentators", names: ["Critical Tomato", "heko", "p1r", "Purio"] }
        ]
      }
    ]
  },
  2024: {
    regions: ["English", "SEA", "CSA", "EMEA", "Americas", "East Asia"],
    tabs: [
      { id: "english",    label: "English" },
      { id: "sea",        label: "SEA" },
      { id: "csa",        label: "CSA" },
      { id: "emea",       label: "EMEA" },
      { id: "americas",   label: "Americas" },
      { id: "eastasia",   label: "East Asia" }
    ],
    cards: [
      {
        region: "english", lang: "English", flag: "🇬🇧",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsports",
        talent: [
          { role: "League Stage Host", names: ["The7WG"] },
          { role: "GF Stage Hosts",    names: ["Banks", "Sandstorm"] },
          { role: "Desk Host",         names: ["JKaplan"] },
          { role: "Analysts",          names: ["HotJukes", "Maxman", "The7WG"] },
          { role: "Commentators",      names: ["Blank", "John Allen"] }
        ]
      },
      {
        region: "sea", lang: "Indonesian", flag: "🇮🇩",
        ytUrl: "https://www.youtube.com/@pubgmobileid",
        talent: [
          { role: "Hosts",    names: ["Donna", "Windy"] },
          { role: "Analysts", names: ["El Dogee", "Junior", "Wolfy"] },
          { role: "Casters",  names: ["Jelly", "Pasta", "Sanskuy", "Windy"] }
        ]
      },
      {
        region: "sea", lang: "Malay", flag: "🇲🇾",
        ytUrl: "https://www.youtube.com/@pubgmobilemy",
        talent: [
          { role: "Hosts",            names: ["ChuChu", "Sir_Cloud"] },
          { role: "Analysts/Casters", names: ["Emi", "J Hunter", "OnTheGo", "Soultannn", "TopCast"] }
        ]
      },
      {
        region: "sea", lang: "Thai", flag: "🇹🇭",
        ytUrl: "https://www.youtube.com/@pubgmobilethailand",
        talent: [
          { role: "Hosts",    names: ["Aoeyjiwa", "BeCrazy"] },
          { role: "Analyst",  names: ["MADTOI"] },
          { role: "Casters",  names: ["Aoeyjiwa", "Archz", "BeCrazy", "Ffame", "Glacius", "Zaffer"] }
        ]
      },
      {
        region: "sea", lang: "Vietnamese", flag: "🇻🇳",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEVN1",
        talent: [
          { role: "Commentators", names: ["Cường OT", "Huy Lova", "Kuook", "Loki", "Trọng Linh", "Tuấn Tái", "VietOP"] }
        ]
      },
      {
        region: "sea", lang: "Burmese", flag: "🇲🇲",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEMyanmar",
        talent: [
          { role: "Commentators", names: ["Blingx", "Keedo", "Mr Kout", "Rowan", "Sammy", "Zan"] }
        ]
      },
      {
        region: "sea", lang: "Tagalog", flag: "🇵🇭",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEPhilippines",
        talent: [
          { role: "Casters", names: ["2PE", "AyaPlays", "Biboy Lang Pala", "Guiang", "KukuTV", "Osiris", "PhauloB", "QueenToyo", "Reyrey", "Sir Mox", "VeenzG"] }
        ]
      },
      {
        region: "sea", lang: "Khmer", flag: "🇰🇭",
        ytUrl: "https://www.youtube.com/@PUBGMOBILECambodia",
        talent: [
          { role: "Commentators", names: ["BiqDaddy", "Crim", "Ream Angkor", "STALKER"] }
        ]
      },
      // CSA = Central & South Asia
      {
        region: "csa", lang: "Bangla", flag: "🇧🇩",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Casters", names: ["FinixOP", "TimeBurner"] }
        ]
      },
      {
        region: "csa", lang: "Urdu", flag: "🇵🇰",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Casters", names: ["Aadi", "Aladdin", "Gaming Portal"] }
        ]
      },
      {
        region: "csa", lang: "Nepali", flag: "🇳🇵",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Casters", names: ["AnshYT", "Bipul", "Mandip Casts"] }
        ]
      },
      {
        region: "csa", lang: "Mongolian", flag: "🇲🇳",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia",
        talent: [
          { role: "Casters", names: ["Tuugii", "Tuvshuun", "Wise"] }
        ]
      },
      {
        region: "csa", lang: "Russian", flag: "🇷🇺",
        ytUrl: "https://www.youtube.com/@PUBGMOBILERU",
        talent: [
          { role: "Casters", names: ["Coldstar", "Fenix"] }
        ]
      },
      {
        region: "csa", lang: "Uzbek", flag: "🇺🇿",
        ytUrl: "https://www.youtube.com/@pubgmobile_uz",
        talent: [
          { role: "Casters", names: ["EAGLE BRO", "Ixa"] }
        ]
      },
      // EMEA
      {
        region: "emea", lang: "Turkish", flag: "🇹🇷",
        ytUrl: "https://www.youtube.com/@PUBGMOBILE_TR",
        talent: [
          { role: "Host",              names: ["Tintin"] },
          { role: "Analysts/Casters",  names: ["Cansehmus", "Scott", "SencerEZ", "Yargic Tony"] }
        ]
      },
      {
        region: "emea", lang: "Arabic", flag: "🇸🇦",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEMENAOFFICIAL",
        talent: [
          { role: "Hosts",            names: ["L3GEND", "Turki"] },
          { role: "Analysts/Casters", names: ["Almola", "Mo3taz", "W0lfCasts", "Youcef"] }
        ]
      },
      // Americas
      {
        region: "americas", lang: "Portuguese", flag: "🇧🇷",
        ytUrl: "https://www.youtube.com/@PUBGMOBILEBrasil",
        talent: [
          { role: "Host",         names: ["MurilloShooow"] },
          { role: "Analysts",     names: ["Ferzote", "Khaya", "Vespa"] },
          { role: "Commentators", names: ["Hads", "Julia Brant"] }
        ]
      },
      {
        region: "americas", lang: "Spanish", flag: "🇪🇸",
        ytUrl: "https://www.youtube.com/@PUBGMOBILELATAM",
        talent: [
          { role: "Casters", names: ["Daphne", "Frata", "Gatik", "Jaguar70", "KevinMPV", "KILLER"] }
        ]
      },
      // East Asia
      {
        region: "eastasia", lang: "Mandarin", flag: "🇨🇳",
        ytUrl: "https://www.youtube.com/@pubgmobile",
        talent: [
          { role: "Commentators", names: ["TBA"] }
        ]
      },
      {
        region: "eastasia", lang: "Korean", flag: "🇰🇷",
        ytUrl: "https://www.youtube.com/@pubgmobileKR",
        talent: [
          { role: "Commentators", names: ["TBA"] }
        ]
      },
      {
        region: "eastasia", lang: "Japanese", flag: "🇯🇵",
        ytUrl: "https://www.youtube.com/@PUBGMOBILE_JAPAN",
        talent: [
          { role: "Commentators", names: ["TBA"] }
        ]
      }
    ]
  }
};

export default broadcastData;
