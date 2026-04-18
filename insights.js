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

/* ── Logging for UI Debugging ── */
function logToUI(msg) {
  var logEl = document.getElementById("debug-terminal");
  if (logEl) {
    logEl.style.display = "block";
    logEl.innerHTML += "<div>> " + msg + "</div>";
    console.log(msg);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  logToUI("System: Loading dependencies...");
  initStars();
  loadLore();

  var btn = document.getElementById("shuffle-btn");
  if (btn) {
    btn.addEventListener("click", function () {
      btn.disabled = true;
      loadLore(function () {
        btn.innerHTML = '<span>⚡ DECRYPT NEW INTEL ⚡</span>';
        btn.disabled = false;
      });
    });
  }
});

/* ── Load lore: try Gemini first, fallback to local bank ── */
function loadLore(onDone) {
  logToUI("Deck: Initializing Decryption...");
  var grid = document.getElementById("intel-grid");
  var btn  = document.getElementById("shuffle-btn");

  if (!grid) {
    logToUI("Error: 'intel-grid' missing!");
    return;
  }

  grid.innerHTML = '<div style="grid-column:1/-1;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:300px;gap:20px;"><div class="hud-spinner"></div><p class="loading-text">⚡ ACCESSING CLASSIFIED DATABASE...</p></div>';

  if (GEMINI_API_KEY && GEMINI_API_KEY.length > 15) {
    logToUI("AI: Key detected, requesting Gemini...");
    fetchGeminiInsights(function (cards) {
      renderCards(cards);
      if (onDone) onDone();
    });
  } else {
    logToUI("AI: No key, using local archives.");
    var shuffled = fallbackTrivia.slice().sort(function () { return 0.5 - Math.random(); });
    renderCards(shuffled.slice(0, 6));
    if (onDone) onDone();
  }
}

function fetchGeminiInsights(callback) {
  var url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + GEMINI_API_KEY;
  var prompt = "Generate 6 PMGC trivia facts (2020-2025) as JSON array: [{label, title, icon, fact}]. Return ONLY JSON.";

  var timedOut = false;
  var timer = setTimeout(function() {
    timedOut = true;
    logToUI("AI: Request timed out (8s).");
    useFallback(callback);
  }, 8000);

  fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  })
  .then(function (res) {
    if (timedOut) return;
    clearTimeout(timer);
    if (!res.ok) throw new Error("API Status " + res.status);
    return res.json();
  })
  .then(function (data) {
    if (timedOut || !data) return;
    try {
      var text = data.candidates[0].content.parts[0].text;
      text = text.replace(/```json/gi, "").replace(/```/g, "").trim();
      var cards = JSON.parse(text);
      if (Array.isArray(cards)) {
        logToUI("AI: Intel decrypted.");
        callback(cards);
      } else {
        throw new Error("Invalid Format");
      }
    } catch (e) {
      logToUI("AI: Parse error.");
      useFallback(callback);
    }
  })
  .catch(function (err) {
    if (timedOut) return;
    clearTimeout(timer);
    logToUI("AI: Request failed.");
    useFallback(callback);
  });
}

function useFallback(callback) {
  var shuffled = fallbackTrivia.slice().sort(function () { return 0.5 - Math.random(); });
  callback(shuffled.slice(0, 6));
}

function renderCards(cards) {
  var grid = document.getElementById("intel-grid");
  var counter = document.getElementById("fact-count");
  if (!grid) return;

  logToUI("Deck: Rendering " + cards.length + " items.");
  grid.innerHTML = "";
  if (counter) counter.textContent = cards.length;

  cards.forEach(function (data, i) {
    var c = document.createElement("div");
    c.className = "intel-card-wrap fade-in-up";
    c.style.animationDelay = (i * 0.1) + "s";
    c.innerHTML =
      '<div class="intel-card">'
      + '<div class="card-f card-front">'
      +   '<div class="card-badge">' + (data.label || "INTEL") + '</div>'
      +   '<div class="card-icon">' + (data.icon || "🎮") + '</div>'
      +   '<div class="card-title">' + (data.title || "Classified") + '</div>'
      +   '<div class="card-hint">Hover to Decrypt</div>'
      + '</div>'
      + '<div class="card-f card-back">'
      +   '<div class="back-header">// DATA RETRIEVED</div>'
      +   '<p class="back-fact">' + (data.fact || "No data.") + '</p>'
      +   '<div class="back-footer">CONFIDENTIAL</div>'
      + '</div>'
      + '</div>';
    grid.appendChild(c);
  });
  logToUI("System: Decryption Complete.");
}

function initStars() {
  var canvas = document.getElementById("stars-canvas");
  if (!canvas) return;
  var ctx = canvas.getContext("2d");
  var W, H;
  function res() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight);
  }
  res();
  window.addEventListener("resize", res);

  var stars = [];
  for (var i = 0; i < 100; i++) {
    stars.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.5, s: Math.random() * 0.2 });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#fff";
    stars.forEach(function (s) {
      ctx.globalAlpha = Math.random() * 0.5 + 0.2;
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
      s.y -= s.s;
      if (s.y < 0) s.y = H;
    });
    requestAnimationFrame(draw);
  }
  draw();
}
