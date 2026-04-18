/*
 * PMGC Insights & Lore — AI-Powered via Gemini API
 * ─────────────────────────────────────────────────
 * Paste your FREE Gemini API key below.
 * Get yours here (free tier): https://aistudio.google.com/app/apikey
 */
var GEMINI_API_KEY = ""; // <-- Add your key here (See your email/GitGuardian alert to rotate your old one!)

/* ── Fallback bank (used if API key is missing or call fails) ── */
var fallbackTrivia = [
  {
    label: "#01", title: "The Quarantine Kings", icon: "😷",
    fact: "Nova Esports won the inaugural 2020 PMGC (Season 0). COVID tests forced players to compete from isolated hotel rooms in Dubai on dedicated LAN lines — still winning the world title!"
  },
  {
    label: "#02", title: "$6 Million Record", icon: "💰",
    fact: "The 2021 PMGC prize pool of $6,000,000 USD was the highest ever offered in a single mobile esports tournament at the time — dwarfing every competitor globally."
  },
  {
    label: "#03", title: "The Turkish Upset", icon: "🇹🇷",
    fact: "S2G Esports from Turkey shocked the 2022 PMGC in Jakarta, ending China's stranglehold on the championship and becoming the first European team to win the title."
  },
  {
    label: "#04", title: "Mongolian Rise", icon: "🐎",
    fact: "IHC Esports' 2023 Istanbul victory was one of the biggest Cinderella stories in PMGC history — a team from Mongolia with barely any org support beating funded giants."
  },
  {
    label: "#05", title: "Korean Tacticians", icon: "🧠",
    fact: "Dplus KIA's 2024 London win showcased meticulous zone manipulation and smoke-wall usage averaging 42 grenades per match — a masterclass in macro PUBG strategy."
  },
  {
    label: "#06", title: "Bangkok Supremacy", icon: "👑",
    fact: "Alpha7 Esports ended Brazil's wait in 2025, claiming the PMGC crown in Bangkok after years of near-misses — the crowd went absolutely wild for the South American champions."
  },
  {
    label: "#07", title: "Back-to-Back Nova", icon: "🏆",
    fact: "Nova Esports (2020 & 2021) remains the only squad to defend the PMGC title. Paraboy's near-perfect aim in team fights was widely considered unmatchable at the time."
  },
  {
    label: "#08", title: "M416 Dominance", icon: "🔫",
    fact: "Across the 2021 PMGC Finals, over 65% of documented eliminations were secured using the M416 — proving it to be the most feared weapon in competitive PUBG Mobile."
  },
  {
    label: "#09", title: "MVP Phenomenon", icon: "⭐",
    fact: "Both Suk (2020) and Order (2021) scored 45+ Finals elims each en route to their MVP titles — performances widely discussed in esports circles as genuinely superhuman."
  },
  {
    label: "#10", title: "Solo Survival Record", icon: "🩹",
    fact: "In the 2022 PMGC qualifiers, a player survived solo for 18+ minutes after his team was wiped in phase 1, extracting enough placement points from thin air to keep his team alive in rankings."
  },
  {
    label: "#11", title: "Jersey Exchange Tradition", icon: "🌍",
    fact: "By PMGC 2023 Istanbul, jersey swapping between rival teams became an unofficial tradition — players from 25+ nations exchanging merch in hotel corridors after brutal match days."
  },
  {
    label: "#12", title: "50-Team Expansion", icon: "📈",
    fact: "The PMGC grew from just 24 competing teams in 2020 to over 50 regional participants by 2022, reflecting PUBG Mobile's explosive global esports ecosystem growth."
  },
  {
    label: "#13", title: "Paraboy: The Fragger King", icon: "🎯",
    fact: "Paraboy from Nova Esports holds the PMGC record for most cumulative lifetime Finals eliminations across all years he played — often called 'the Michael Jordan of PUBG Mobile'."
  },
  {
    label: "#14", title: "Online-Only Seasons", icon: "🌐",
    fact: "The 2020 and 2021 PMGC were fully or partially held online due to COVID-19, making them the only global esports championships of that scale played without a live audience."
  },
  {
    label: "#15", title: "Prize Pool Fluctuation", icon: "📊",
    fact: "The PMGC prize pool peaked at $6M in 2021 and then dropped to roughly $3M in 2022-2023 as Tencent restructured esports budgets — causing significant community debate."
  },
  {
    label: "#16", title: "IHC's Weapon of Choice", icon: "⚔️",
    fact: "IHC Esports' 2023 title run was built largely around hyper-aggressive close-quarters combat — their average engagement distance during Finals was just 45 meters, the shortest on record."
  },
  {
    label: "#17", title: "Most Watched Moment", icon: "📺",
    fact: "The 2021 PMGC Grand Finals peaked at over 2.5 million concurrent live viewers across all platforms — setting a benchmark for mobile esports viewership at the time."
  },
  {
    label: "#18", title: "The Erangel Throne", icon: "🗺️",
    fact: "Erangel has been the most-played and highest-scoring map in PMGC Grand Finals history across all six editions — teams that master it consistently outperform those who don't."
  }
];

/* ═══════════════════════════════════════════════════════════════ */

document.addEventListener("DOMContentLoaded", function () {
  initStars();
  loadLore();

  var btn = document.getElementById("shuffle-btn");
  if (btn) {
    btn.addEventListener("click", function () {
      loadLore(function () {
        btn.innerHTML = '<span>⚡ DECRYPT NEW INTEL ⚡</span>';
        btn.disabled = false;
      });
    });
  }
});

/* ── Load lore: try Gemini first, fallback to local bank ── */
function loadLore(onDone) {
  var grid = document.getElementById("intel-grid");
  var btn  = document.getElementById("shuffle-btn");
  grid.innerHTML = '<div style="grid-column:1/-1;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:320px;gap:20px;"><div class="hud-spinner"></div><p class="loading-text">&#9889; ACCESSING CLASSIFIED DATABASE...</p></div>';
  if (btn) { btn.disabled = true; btn.innerHTML = '<span>&#9889; ACCESSING AI MAINFRAME...</span>'; }

  if (GEMINI_API_KEY && GEMINI_API_KEY.length > 10) {
    fetchGeminiInsights(function (cards) {
      renderCards(cards);
      if (onDone) onDone();
    });
  } else {
    var shuffled = fallbackTrivia.slice().sort(function () { return 0.5 - Math.random(); });
    renderCards(shuffled.slice(0, 6));
    if (onDone) onDone();
  }
}

/* ── Call Gemini API with Timeout & Better Error Handling ── */
function fetchGeminiInsights(callback) {
  console.log("AI: Initiating decryption sequence...");
  
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 7000); // 7s timeout

  var url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY;

  var prompt = "Generate 6 unique, surprising, and fun esports trivia facts specifically about the PUBG Mobile Global Championship (PMGC) tournament series from 2020 to 2025. Format your response STRICTLY as a JSON array like this: [{\"label\":\"FACT #01\",\"title\":\"Short punchy title\",\"icon\":\"emoji\",\"fact\":\"2-3 sentence fact that is engaging and informative.\"}]. Focus on records broken, upsets, player achievements, prize pools, venue stories, format changes, or wildly interesting game moments. Return ONLY valid JSON, no extra text.";

  var body = JSON.stringify({
    contents: [{ parts: [{ text: prompt }] }],
    generationConfig: { temperature: 1.0, maxOutputTokens: 1000 }
  });

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: body,
    signal: controller.signal
  })
    .then(function (res) { 
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error("Server responded with " + res.status);
      return res.json(); 
    })
    .then(function (data) {
      try {
        if (!data.candidates || !data.candidates[0].content.parts[0].text) {
          throw new Error("Invalid API response format");
        }
        var text = data.candidates[0].content.parts[0].text;
        text = text.replace(/```json/gi, "").replace(/```/g, "").trim();
        var cards = JSON.parse(text);
        if (Array.isArray(cards) && cards.length > 0) {
          console.log("AI: Decryption successful.");
          callback(cards);
        } else {
          throw new Error("Empty trivia array");
        }
      } catch (e) {
        console.warn("AI Parse Error:", e.message);
        useFallback(callback);
      }
    })
    .catch(function (err) {
      clearTimeout(timeoutId);
      console.warn("AI Connection Failed:", err.name === 'AbortError' ? "Timeout" : err.message);
      useFallback(callback);
    });
}

function useFallback(callback) {
  console.log("AI: Falling back to local encrypted archives...");
  var shuffled = fallbackTrivia.slice().sort(function () { return 0.5 - Math.random(); });
  callback(shuffled.slice(0, 6));
}

/* ── Render cards into the deck ── */
function renderCards(cards) {
  var grid = document.getElementById("intel-grid");
  var counter = document.getElementById("fact-count");
  var btn = document.getElementById("shuffle-btn");
  grid.innerHTML = "";
  if (counter) counter.textContent = cards.length;
  if (btn) { btn.disabled = false; btn.innerHTML = '<span>&#9889; DECRYPT NEW INTEL &#9889;</span>'; }
  var delay = 0.1;

  cards.forEach(function (data) {
    var label = data.label || "PMGC";
    var title = data.title || "Unknown Fact";
    var icon = data.icon || "🎮";
    var fact = data.fact || "No data available.";

    var c = document.createElement("div");
    c.className = "intel-card-wrap fade-in-up";
    c.style.animationDelay = delay + "s";
    c.innerHTML =
      '<div class="intel-card">'
      + '<div class="card-f card-front">'
      +   '<div class="card-badge">' + label + '</div>'
      +   '<div class="card-icon">' + icon + '</div>'
      +   '<div class="card-title">' + title + '</div>'
      +   '<div class="card-hint">Hover to Decrypt</div>'
      + '</div>'
      + '<div class="card-f card-back">'
      +   '<div class="back-header">// INTEL ACCESSED <span class="blink-cursor"></span></div>'
      +   '<p class="back-fact">' + fact + '</p>'
      +   '<div class="back-footer">&#9733; RESTRICTED KNOWLEDGE &#9733;</div>'
      + '</div>'
      + '</div>';
    grid.appendChild(c);
    delay += 0.15;
  });
}

/* ── Starfield background ── */
function initStars() {
  var canvas = document.getElementById("stars-canvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var W, H;
  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
  }
  resize();
  window.addEventListener("resize", resize);

  var stars = [];
  for (var i = 0; i < 180; i++) {
    stars.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.6, dy: (Math.random() - 0.5) * 0.4 });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    stars.forEach(function (s) {
      ctx.globalAlpha = Math.random() * 0.5 + 0.25;
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      s.y -= s.dy;
      if (s.y < 0) s.y = H;
      if (s.y > H) s.y = 0;
    });
    requestAnimationFrame(draw);
  }
  draw();
}
