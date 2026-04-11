let currentYear = 2023;

async function loadYearData(year) {
  try {
    const response = await fetch(`./data/pmgc_${year}_data.json?t=${Date.now()}`);
    const data = await response.json();

    document.getElementById("hero-subtitle").innerText = `${year} Analysis & Insights`;
    document.getElementById("nav-year").innerText = year;
    const heroYearTitle = document.getElementById("hero-year-title");
    heroYearTitle.innerHTML = `PMGC <span class="year-span">${year}</span>`;
    heroYearTitle.setAttribute("data-text", `PMGC ${year}`);

    // Update Host Info
    if(data.tournament_info) {
        document.getElementById("host-location").innerText = `${data.tournament_info.host_city}, ${data.tournament_info.host_country}`;
        document.getElementById("host-venue").innerText = `${data.tournament_info.venue}`;
        
        const mapUrl = data.tournament_info.map_url || "#";
        document.getElementById("host-venue-link").href = mapUrl;
        
        // Hide if online (2021)
        document.getElementById("hero-host-info").style.display = data.tournament_info.year === 2021 ? "none" : "flex";
    }

    // Update Map Pool Dynamically
    const mapPool = (data.tournament_info && data.tournament_info.maps) ? data.tournament_info.maps : ["Erangel", "Miramar", "Sanhok"];
    const mapContainer = document.getElementById("map-pool-container");
    
    if (mapContainer) {
        mapContainer.innerHTML = mapPool.map(map => {
            let desc = "Official Pool";
            if(map === "Rondo") desc = "The New Frontier";
            if(map === "Erangel") desc = "The Classic";
            if(map === "Miramar") desc = "The Sniper's Nest";
            if(map === "Sanhok") desc = "The Jungle Chaos";
            
            const imgPath = `./assets/maps/${map.toLowerCase()}.png`;
            return `
                <div class="map-card-v2 glass-card">
                    <img src="${imgPath}" alt="${map}" referrerpolicy="no-referrer" onerror="this.src='./assets/pmgc_game_maps.png'">
                    <div class="map-info-v2">
                        <h4>${map}</h4>
                        <small>${desc}</small>
                    </div>
                </div>
            `;
        }).join("");
    }

    // Map new generated structure format to expected array format
    const mappedTeams = data.teams.map(t => ({
      name: t.name || t.team_name,
      region: t.region,
      countryCode: t.countryCode || "un",
      qualification: t.qualification || "Global Stage",
      players: t.players ? (typeof t.players[0] === 'string' ? t.players : t.players.map(p => p.name)) : [],
      logo: t.logo || `https://placehold.co/60x60/333/00f2ff?text=${t.name || t.team_name}`
    }));

    renderOverview({ teams: mappedTeams });
    renderTeams(mappedTeams);
    renderTopPlayers(data.topPlayers || generateMockPlayers(year));
    setupFilters({ teams: mappedTeams });
    
    updateDynamicText(year, data.tournament_info);
  } catch (error) {
    console.error("Error loading year data:", error);
  }
}

function generateMockPlayers(year) {
  return [
    { rank: 1, name: `MVP_${year}`, team: "Champions", elims: 40, damage: 8000, assists: 20 },
    { rank: 2, name: `Fragger_${year}`, team: "Runners Up", elims: 35, damage: 7500, assists: 15 },
    { rank: 3, name: `Assaulter_${year}`, team: "3rd Place", elims: 30, damage: 6000, assists: 25 }
  ];
}

function updateDynamicText(year, info) {
    const ticker = document.getElementById("hero-ticker");
    if(info) {
        ticker.innerHTML = `
            <div class="ticker-item">${info.winner} Crowned Champions</div>
            <div class="ticker-item">$${(info.prize_pool/1000000).toFixed(1)}M Prize Pool</div>
            <div class="ticker-item">MVP: ${info.mvp.name}</div>
        `;
        // Update Awards table
        document.querySelector("#awards .prize-table tbody tr:nth-child(1) td:nth-child(2)").innerText = info.winner;
        document.querySelector("#awards .prize-table tbody tr:nth-child(2) td:nth-child(2)").innerText = info.runner_up;
        document.querySelector("#awards .prize-table tbody tr:nth-child(1) td:nth-child(3)").innerText = `$${(info.prize_pool * 0.15).toLocaleString()}`;
        document.querySelector("#awards .prize-table tbody tr:nth-child(2) td:nth-child(3)").innerText = `$${(info.prize_pool * 0.1).toLocaleString()}`;
        
        // Update MVP Award Card
        document.querySelector(".highlight-award .award-winner").innerText = info.mvp.name;
        document.querySelector(".highlight-award .award-meta").innerHTML = `<img src="https://flagcdn.com/16x12/un.png" referrerpolicy="no-referrer"> Global • ${info.mvp.team}`;
        
    } else {
        ticker.innerHTML = `
            <div class="ticker-item">50 Teams Participating</div>
            <div class="ticker-item">$3,000,000 Prize Pool</div>
            <div class="ticker-item">Istanbul, Turkey</div>
        `;
        // Reset to 2023 values
        document.querySelector("#awards .prize-table tbody tr:nth-child(1) td:nth-child(2)").innerText = "IHC Esports";
        document.querySelector("#awards .prize-table tbody tr:nth-child(2) td:nth-child(2)").innerText = "Stalwart Esports";
        document.querySelector("#awards .prize-table tbody tr:nth-child(1) td:nth-child(3)").innerText = "$453,500";
        document.querySelector("#awards .prize-table tbody tr:nth-child(2) td:nth-child(3)").innerText = "$263,000";
        
        document.querySelector(".highlight-award .award-winner").innerText = "Zyol";
        document.querySelector(".highlight-award .award-meta").innerHTML = `<img src="https://flagcdn.com/16x12/mn.png" referrerpolicy="no-referrer"> Mongolia • IHC Esports`;
    }
}

async function initApp() {
  await loadYearData(currentYear);
  setupNavigation();
  initCanvasAnimation();

  const availableYears = [2020, 2021, 2022, 2023, 2024, 2025];

  document.querySelectorAll(".year-tab").forEach(tab => {
      tab.addEventListener("click", () => {
          const year = parseInt(tab.getAttribute("data-year"));
          switchYear(year);
      });
  });

  // Hero Arrow Navigation
  document.getElementById("prev-year-btn").addEventListener("click", () => {
      let index = availableYears.indexOf(currentYear);
      if(index > 0) {
          switchYear(availableYears[index-1]);
      }
  });

  document.getElementById("next-year-btn").addEventListener("click", () => {
      let index = availableYears.indexOf(currentYear);
      if(index < availableYears.length - 1) {
          switchYear(availableYears[index+1]);
      }
  });

  // Navbar Arrow Navigation
  document.getElementById("prev-year-nav").addEventListener("click", () => {
      let index = availableYears.indexOf(currentYear);
      if(index > 0) {
          switchYear(availableYears[index-1]);
      }
  });

  document.getElementById("next-year-nav").addEventListener("click", () => {
      let index = availableYears.indexOf(currentYear);
      if(index < availableYears.length - 1) {
          switchYear(availableYears[index+1]);
      }
  });
}

function switchYear(year) {
    currentYear = year;
    loadYearData(year);
    
    // Sync tabs
    document.querySelectorAll(".year-tab").forEach(t => {
        t.classList.remove("active");
        if(parseInt(t.getAttribute("data-year")) === year) {
            t.classList.add("active");
        }
    });

    // Disable arrows if at limits
    const availableYears = [2020, 2021, 2022, 2023, 2024, 2025];
    const prevBtns = [document.getElementById("prev-year-btn"), document.getElementById("prev-year-nav")];
    const nextBtns = [document.getElementById("next-year-btn"), document.getElementById("next-year-nav")];

    prevBtns.forEach(btn => {
        if(btn) {
            btn.style.opacity = year === availableYears[0] ? "0.2" : "1";
            btn.style.pointerEvents = year === availableYears[0] ? "none" : "auto";
        }
    });

    nextBtns.forEach(btn => {
        if(btn) {
            btn.style.opacity = year === availableYears[availableYears.length-1] ? "0.2" : "1";
            btn.style.pointerEvents = year === availableYears[availableYears.length-1] ? "none" : "auto";
        }
    });
}

function initCanvasAnimation() {
  const canvas = document.getElementById("hero-canvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  
  let width, height, particles;
  
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = document.getElementById("hero").offsetHeight;
  }
  
  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5;
      this.radius = Math.random() * 2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 242, 255, 0.5)";
      ctx.fill();
    }
  }
  
  function initParticles() {
    particles = [];
    const count = window.innerWidth < 768 ? 40 : 100;
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }
  
  function animate() {
    ctx.clearRect(0, 0, width, height);
    
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();
      
      for (let j = i; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.hypot(dx, dy);
        
        if (distance < 120) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 242, 255, ${0.2 - distance / 600})`;
          ctx.lineWidth = 1;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }
  
  window.addEventListener("resize", () => {
    resize();
    initParticles();
  });
  
  resize();
  initParticles();
  animate();
}

function renderOverview(data) {
  const regionCounts = {};
  data.teams.forEach((team) => {
    regionCounts[team.region] = (regionCounts[team.region] || 0) + 1;
  });

  const chartContainer = document.getElementById("region-chart");
  chartContainer.innerHTML = "";

  const maxCount = Math.max(...Object.values(regionCounts));

  Object.entries(regionCounts).forEach(([region, count]) => {
    const barWrapper = document.createElement("div");
    barWrapper.className = "chart-bar-wrapper";

    const label = document.createElement("span");
    label.className = "bar-label";
    label.textContent = region;

    const track = document.createElement("div");
    track.className = "bar-track";

    const bar = document.createElement("div");
    bar.className = "bar-fill";
    const percentage = (count / maxCount) * 100;
    bar.style.width = `0%`;
    setTimeout(() => (bar.style.width = `${percentage}%`), 100);

    const value = document.createElement("span");
    value.className = "bar-value";
    value.textContent = count;

    track.appendChild(bar);
    barWrapper.appendChild(label);
    barWrapper.appendChild(track);
    barWrapper.appendChild(value);
    chartContainer.appendChild(barWrapper);
  });

  // Render Qualification Breakdown automatically dynamically mapping
  const qualList = document.getElementById("qualification-list");
  let totalTeams = data.teams.length;
  qualList.innerHTML = `
        <div class="qual-item"><span>Grand Finals Direct</span> <span>16 Teams</span></div>
        <div class="qual-item"><span>League Stage Qualifiers</span> <span>${Math.max(0, totalTeams - 16)} Teams</span></div>
        <div class="qual-item"><span>Total Participants</span> <span>${totalTeams} Teams</span></div>
    `;
}

function renderTeams(teams) {
  const grid = document.getElementById("teams-grid");
  grid.innerHTML = "";

  teams.forEach((team) => {
    const card = document.createElement("div");
    card.className = "team-card";
    const flagCode = team.countryCode || "un";
    card.innerHTML = `
            <div class="team-header">
                <img src="${team.logo}" alt="${team.name} Logo" class="team-logo" style="object-fit: contain;" referrerpolicy="no-referrer" onerror="this.src='https://placehold.co/60x60/333/00f2ff?text=PMGC'">
                <div>
                    <div class="team-name">
                        ${team.name}
                    </div>
                    <div class="team-region" style="font-weight: 600;">
                        <img src="https://flagcdn.com/16x12/${flagCode}.png" alt="${team.region} Flag" class="flag-icon" referrerpolicy="no-referrer" onerror="this.style.display='none'">
                        ${team.region}
                    </div>
                    <div class="team-qualification" style="font-size: 0.75rem; color: var(--accent-gold); margin-top: 4px;">
                        via: ${team.qualification}
                    </div>
                </div>
            </div>
            <div class="player-list">
                ${team.players.map((p) => `<span class="player-chip">${p}</span>`).join("")}
            </div>
        `;
    grid.appendChild(card);
  });
}

function renderTopPlayers(players) {
  const body = document.getElementById("player-stats-body");
  body.innerHTML = "";

  players.forEach((player) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td class="rank-cell">#${player.rank}</td>
            <td><strong>${player.name}</strong></td>
            <td>${player.team}</td>
            <td>${player.elims}</td>
            <td>${player.damage.toLocaleString()}</td>
            <td>${player.assists}</td>
        `;
    body.appendChild(row);
  });
}

function setupFilters(data) {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const region = btn.getAttribute("data-region");
      const filteredTeams =
        region === "all"
          ? data.teams
          : data.teams.filter((t) => t.region.includes(region));

      renderTeams(filteredTeams);
    });
  });
}

function setupNavigation() {
  const navLinks = document.querySelectorAll(".nav-links a");
  window.addEventListener("scroll", () => {
    let current = "";
    const sections = document.querySelectorAll("section");
    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      if (pageYOffset >= sectionTop - 100) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active");
      }
    });
  });
}

// Additional styles for the chart injected via JS for simplicity or added to CSS
const chartStyles = `
.chart-bar-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}
.bar-label {
    width: 100px;
    font-size: 0.8rem;
    color: var(--text-secondary);
}
.bar-track {
    flex: 1;
    height: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
    overflow: hidden;
}
.bar-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent-color), #00a2ff);
    transition: width 1s ease-out;
}
.bar-value {
    width: 30px;
    text-align: right;
    font-weight: 600;
}
.qual-item {
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
    border-bottom: 1px solid var(--glass-border);
}
.qual-item:last-child { border: none; }
.qual-item span:first-child { color: var(--text-secondary); }
.qual-item span:last-child { font-weight: 700; color: var(--accent-gold); }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = chartStyles;
document.head.appendChild(styleSheet);

document.addEventListener("DOMContentLoaded", initApp);
