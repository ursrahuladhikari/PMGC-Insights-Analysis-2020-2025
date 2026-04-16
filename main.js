import broadcastData from './data/broadcast_talent.js';


/* ==========================================================================
   LOADING SCREEN — Esports themed with particle canvas + progress bar
   ========================================================================== */
(function initLoader() {
    const screen = document.getElementById('loader-screen');
    if (screen) screen.style.display = 'none'; // Temporarily disabled
    const bar = document.getElementById('loader-bar');
    const glow = document.getElementById('loader-glow');
    const pct = document.getElementById('loader-pct');
    const msgEl = document.getElementById('loader-msg');
    const canvas = document.getElementById('loader-canvas');
    if (!screen) return;

    /* --- Particle Canvas Background --- */
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * W;
            this.y = Math.random() * H;
            this.r = Math.random() * 1.5 + 0.3;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.alpha = Math.random() * 0.6 + 0.1;
            this.color = Math.random() > 0.5 ? '0,242,255' : '255,0,80';
        }
        update() {
            this.x += this.vx; this.y += this.vy;
            if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < 120; i++) particles.push(new Particle());

    // Draw connecting lines between nearby particles
    function drawLines() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 90) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0,242,255,${0.07 * (1 - dist / 90)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }

    let animId;
    function tick() {
        ctx.clearRect(0, 0, W, H);
        particles.forEach(p => { p.update(); p.draw(); });
        drawLines();
        animId = requestAnimationFrame(tick);
    }
    tick();

    /* --- Progress + Messages --- */
    const MESSAGES = [
        'Initializing PMGC Database...',
        'Loading Tournament Data...',
        'Fetching Team Rosters...',
        'Calculating Player Statistics...',
        'Loading Broadcast Talent...',
        'Rendering Match Analytics...',
        'Verifying Liquipedia Sources...',
        'Preparing Prize Pool Data...',
        'Almost There...',
        'Ready for Battle! 🎮'
    ];

    let progress = 0;
    let msgIndex = 0;
    let done = false;

    function setMsg(txt) {
        msgEl.style.animation = 'none';
        void msgEl.offsetWidth; // reflow re-trigger
        msgEl.style.animation = '';
        msgEl.textContent = txt;
    }

    // Advance progress at variable speeds — slow at start, burst in middle, slow at end
    const intervals = [
        { target: 15, delay: 80 },
        { target: 40, delay: 40 },
        { target: 65, delay: 50 },
        { target: 85, delay: 70 },
        { target: 95, delay: 120 },
        { target: 100, delay: 60 }
    ];

    let phase = 0;

    function advanceProgress() {
        if (done) return;
        const { target, delay } = intervals[phase];

        if (progress < target) {
            progress += 1;
            const w = progress + '%';
            bar.style.width = w;
            glow.style.width = w;
            pct.textContent = progress + '%';

            // Cycle message based on progress
            const newMsgIdx = Math.min(
                Math.floor((progress / 100) * (MESSAGES.length - 1)),
                MESSAGES.length - 1
            );
            if (newMsgIdx !== msgIndex) {
                msgIndex = newMsgIdx;
                setMsg(MESSAGES[msgIndex]);
            }

            setTimeout(advanceProgress, delay);
        } else if (phase < intervals.length - 1) {
            phase++;
            setTimeout(advanceProgress, delay);
        } else {
            // 100% — dismiss after short pause
            done = true;
            setTimeout(dismissLoader, 700);
        }
    }

    function dismissLoader() {
        cancelAnimationFrame(animId);
        screen.classList.add('fade-out');
        // Remove from DOM after transition
        screen.addEventListener('transitionend', () => {
            screen.style.display = 'none';
        }, { once: true });
    }

    // Kick off after a tiny delay so paint is visible
    setTimeout(advanceProgress, 200);
})();

/* ========================================================================== */

let currentYear = 2023;
let currentFilterState = "all";
let currentMode = "participants"; // Track if we are in Participants grid or Finals table
let currentVisibleSection = "hero";
let isSwitchingYear = false;
let isTeamsExpanded = false;
let currentTournamentData = null;

async function loadYearData(year) {
    if (isSwitchingYear) return;
    isSwitchingYear = true;
    
    // Capture exact pixel measurements BEFORE the network fetches or DOM collapses
    const anchorNode = document.getElementById(currentVisibleSection);
    const initialOffsetFromTop = anchorNode ? anchorNode.getBoundingClientRect().top : 0;
    const anchorSection = currentVisibleSection;

    try {
        const response = await fetch(`/data/pmgc_${year}_data.json?t=${Date.now()}`);
        const data = await response.json();

        document.getElementById("hero-subtitle").innerText = `${year} Analysis & Insights`;
        document.getElementById("nav-year").innerText = year;
        const heroYearTitle = document.getElementById("hero-year-title");
        heroYearTitle.innerHTML = `PMGC <span class="year-span">${year}</span>`;
        heroYearTitle.setAttribute("data-text", `PMGC ${year}`);

        // Update Host Info
        if (data.tournament_info) {
            const info = data.tournament_info;
            const isOnline = info.year === 2021 || info.host_city === 'Online (COVID-19)';

            if (isOnline) {
                document.getElementById("host-location").innerText = `🌐 Online — No Physical Venue`;
                document.getElementById("host-venue").innerText = `COVID-19 Restrictions (2021)`;
                document.getElementById("host-venue-link").href = 'https://liquipedia.net/pubgmobile/PUBG_Mobile_Global_Championship/2021';
                document.getElementById("host-venue-link").title = 'View on Liquipedia';
            } else {
                document.getElementById("host-location").innerText = `${info.host_city}, ${info.host_country}`;
                document.getElementById("host-venue").innerText = `${info.venue}`;
                document.getElementById("host-venue-link").href = info.map_url || '#';
            }
            document.getElementById("hero-host-info").style.display = "flex";
        }

        // Update Map Pool Dynamically
        const mapPool = (data.tournament_info && data.tournament_info.maps) ? data.tournament_info.maps : ["Erangel", "Miramar", "Sanhok"];
        const mapContainer = document.getElementById("map-pool-container");

        if (mapContainer) {
            mapContainer.innerHTML = mapPool.map(map => {
                let desc = "Official Pool";
                if (map === "Rondo") desc = "The New Frontier";
                if (map === "Erangel") desc = "The Classic";
                if (map === "Miramar") desc = "The Sniper's Nest";
                if (map === "Sanhok") desc = "The Jungle Chaos";

                const imgPath = `/assets/maps/${map.toLowerCase()}.png`;
                return `
                <div class="map-card-v2 glass-card">
                    <img src="${imgPath}" alt="${map}" referrerpolicy="no-referrer" onerror="this.src='/assets/pmgc_game_maps.png'">
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
            logo: t.logo || `https://placehold.co/60x60/333/00f2ff?text=${t.name || t.team_name}`,
            isFullLogo: t.isFullLogo || false,
            isFinalist: t.isFinalist || false,
            finalsRank: t.finalsRank || null,
            totalPoints: t.totalPoints || null
        }));

        currentTournamentData = { teams: mappedTeams };
        renderOverview({ teams: mappedTeams });
        renderTeams(mappedTeams);
        renderTopPlayers(data.topPlayers || generateMockPlayers(year));
        setupFilters(); // No longer passing data

        renderTournamentProcess(year);
        
        updateDynamicText(year, data.tournament_info);
        renderBroadcast(year);

        // Update the localized year display in Top Performers if we add one
        const playersYearDisplay = document.getElementById("players-year-display");
        if(playersYearDisplay) playersYearDisplay.innerText = year;

        // Keep the user securely anchored to the section they were viewing prior to data change
        // We use the local exact Y-offset measurement that was captured BEFORE DOM manipulation
        if (anchorSection && anchorSection !== "hero") {
            requestAnimationFrame(() => {
                const targetEl = document.getElementById(anchorSection);
                if (targetEl) {
                    const newOffsetFromTop = targetEl.getBoundingClientRect().top;
                    window.scrollBy({ top: newOffsetFromTop - initialOffsetFromTop, behavior: "instant" });
                }
            });
        }
    } catch (error) {
        console.error("Error loading year data:", error);
    } finally {
        isSwitchingYear = false;
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
    if (info) {
        ticker.innerHTML = `
            <div class="ticker-item">${info.winner} Crowned Champions</div>
            <div class="ticker-item">$${(info.prize_pool / 1000000).toFixed(1)}M Prize Pool</div>
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
        if (index > 0) {
            switchYear(availableYears[index - 1]);
        }
    });

    document.getElementById("next-year-btn").addEventListener("click", () => {
        let index = availableYears.indexOf(currentYear);
        if (index < availableYears.length - 1) {
            switchYear(availableYears[index + 1]);
        }
    });

    // Navbar Arrow Navigation
    document.getElementById("prev-year-nav").addEventListener("click", () => {
        let index = availableYears.indexOf(currentYear);
        if (index > 0) {
            switchYear(availableYears[index - 1]);
        }
    });

    document.getElementById("next-year-nav").addEventListener("click", () => {
        let index = availableYears.indexOf(currentYear);
        if (index < availableYears.length - 1) {
            switchYear(availableYears[index + 1]);
        }
    });

    // Top Performers Arrow Navigation
    document.getElementById("prev-year-players").addEventListener("click", () => {
        let index = availableYears.indexOf(currentYear);
        if (index > 0) {
            switchYear(availableYears[index - 1]);
        }
    });

    document.getElementById("next-year-players").addEventListener("click", () => {
        let index = availableYears.indexOf(currentYear);
        if (index < availableYears.length - 1) {
            switchYear(availableYears[index + 1]);
        }
    });
}

function switchYear(year) {
    currentYear = year;
    loadYearData(year);

    // Sync tabs
    document.querySelectorAll(".year-tab").forEach(t => {
        t.classList.remove("active");
        if (parseInt(t.getAttribute("data-year")) === year) {
            t.classList.add("active");
        }
    });

    // Disable arrows if at limits
    const availableYears = [2020, 2021, 2022, 2023, 2024, 2025];
    const prevBtns = [document.getElementById("prev-year-btn"), document.getElementById("prev-year-nav"), document.getElementById("prev-year-players")];
    const nextBtns = [document.getElementById("next-year-btn"), document.getElementById("next-year-nav"), document.getElementById("next-year-players")];

    prevBtns.forEach(btn => {
        if (btn) {
            btn.style.opacity = year === availableYears[0] ? "0.2" : "1";
            btn.style.pointerEvents = year === availableYears[0] ? "none" : "auto";
        }
    });

    nextBtns.forEach(btn => {
        if (btn) {
            btn.style.opacity = year === availableYears[availableYears.length - 1] ? "0.2" : "1";
            btn.style.pointerEvents = year === availableYears[availableYears.length - 1] ? "none" : "auto";
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
    const countDisplay = document.getElementById("team-count-display");
    if (countDisplay) {
        countDisplay.innerText = teams.length;
    }

    const grid = document.getElementById("teams-grid");
    const expandContainer = document.getElementById("teams-expand-container");
    const expandBtn = document.getElementById("teams-expand-btn");
    
    grid.innerHTML = "";

    // If there are many teams and we are not expanded, cap at 12
    const displayLimit = (isTeamsExpanded || teams.length <= 12) ? teams.length : 12;
    const visibleTeams = teams.slice(0, displayLimit);

    if (expandContainer && expandBtn) {
        if (teams.length > 12) {
            expandContainer.style.display = "block";
            expandBtn.innerHTML = isTeamsExpanded ? "Collapse Teams 🔼" : "Show Full Participating Teams 🔽";
        } else {
            expandContainer.style.display = "none";
        }
    }

    visibleTeams.forEach((team) => {
        const card = document.createElement("div");
        card.className = `team-card ${team.isFinalist ? 'finalist-card' : ''}`;
        const flagCode = team.countryCode || "un";

        // Add rank badge if it's a finalist
        const rankBadge = team.finalsRank
            ? `<div class="rank-badge">Rank #${team.finalsRank}</div>`
            : '';

        const pointsInfo = (team.isFinalist && team.totalPoints)
            ? `<div class="team-points" style="font-size: 0.85rem; color: var(--text-primary); margin-top: 8px; font-weight: 700;">
             Total Points: <span style="color: var(--accent-cyan);">${team.totalPoints}</span>
           </div>`
            : '';

        card.innerHTML = `
            ${rankBadge}
            <div class="team-header">
                <img src="${team.logo}" alt="${team.name} Logo" class="team-logo ${team.isFullLogo ? 'full-logo' : ''} ${team.name === 'Donuts USG' || team.name === 'The Infinity' ? 'dark-logo-fix' : ''}" fetchpriority="high" loading="eager" decoding="async" referrerpolicy="no-referrer" onerror="this.src='https://placehold.co/60x60/333/00f2ff?text=PMGC'">
                <div>
                    <div class="team-name">
                        ${team.name}
                    </div>
                    <div class="team-region" style="font-weight: 600; display: flex; align-items: center; gap: 6px;">
                        <img src="https://flagcdn.com/20x15/${flagCode}.png" alt="${team.region} Flag" class="flag-icon-v2" referrerpolicy="no-referrer" onerror="this.style.display='none'">
                        ${COUNTRY_NAMES[flagCode] || team.region}
                    </div>
                    <div class="team-qualification" style="font-size: 0.75rem; color: var(--accent-gold); margin-top: 4px;">
                        via: ${team.qualification}
                    </div>
                    ${pointsInfo}
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

function renderStandingsTable(teams) {
    const tableBody = document.getElementById("standings-table-body");
    if (!tableBody) return;
    tableBody.innerHTML = "";

    teams.forEach((team) => {
        const row = document.createElement("tr");
        const flagCode = team.countryCode || "un";
        row.innerHTML = `
            <td class="rank-cell">#${team.finalsRank}</td>
            <td style="display: flex; align-items: center; gap: 10px;">
                <img src="${team.logo}" alt="" style="width: 30px; height: 30px; border-radius: 4px; object-fit: contain;" onerror="this.src='/assets/logos/default.png'">
                <strong>${team.name}</strong>
            </td>
            <td>
                <img src="https://flagcdn.com/16x12/${flagCode}.png" alt="" class="flag-icon" onerror="this.style.display='none'">
                ${team.region}
            </td>
            <td style="color: var(--accent-cyan); font-weight: 800; font-size: 1.1rem;">${team.totalPoints}</td>
        `;
        tableBody.appendChild(row);
    });
}

function setupFilters() {
    const data = currentTournamentData;
    if (!data) return;

    const filterBtns = document.querySelectorAll(".filter-btn");
    const tableContainer = document.getElementById("standings-table-container");
    const teamsGrid = document.getElementById("teams-grid");
    const countDisplay = document.getElementById("team-count-display");
    const regionFiltersBox = document.getElementById("region-filters");
    const expandContainer = document.getElementById("teams-expand-container");

    const modeParticipantsBtn = document.getElementById("mode-participants");
    const modeFinalsBtn = document.getElementById("mode-finals");

    let activeFinalsBtn = null;

    if (modeParticipantsBtn && modeFinalsBtn) {
        const newModeParticipantsBtn = modeParticipantsBtn.cloneNode(true);
        const newModeFinalsBtn = modeFinalsBtn.cloneNode(true);
        modeParticipantsBtn.parentNode.replaceChild(newModeParticipantsBtn, modeParticipantsBtn);
        modeFinalsBtn.parentNode.replaceChild(newModeFinalsBtn, modeFinalsBtn);
        activeFinalsBtn = newModeFinalsBtn;

        newModeParticipantsBtn.addEventListener("click", () => {
            currentMode = "participants";
            newModeParticipantsBtn.classList.add("active");
            newModeParticipantsBtn.style.background = "rgba(0,242,255,0.15)";
            newModeParticipantsBtn.style.color = "#fff";
            newModeFinalsBtn.classList.remove("active");
            newModeFinalsBtn.style.background = "transparent";

            if (tableContainer) tableContainer.style.display = "none";
            if (teamsGrid) teamsGrid.style.display = "grid";
            if (regionFiltersBox) regionFiltersBox.style.display = "flex";
            if (expandContainer && currentTournamentData.teams.length > 12) expandContainer.style.display = "block";

            const activeRegionBtn = document.querySelector(".filter-btn.active") || document.querySelector('.filter-btn[data-region="all"]');
            if (activeRegionBtn) activeRegionBtn.click();
        });

        newModeFinalsBtn.addEventListener("click", () => {
            currentMode = "finals";
            newModeFinalsBtn.classList.add("active");
            newModeFinalsBtn.style.background = "rgba(0,242,255,0.15)";
            newModeFinalsBtn.style.color = "#fff";
            newModeParticipantsBtn.classList.remove("active");
            newModeParticipantsBtn.style.background = "transparent";

            if (tableContainer) tableContainer.style.display = "block";
            if (teamsGrid) teamsGrid.style.display = "none";
            if (regionFiltersBox) regionFiltersBox.style.display = "none";
            if (expandContainer) expandContainer.style.display = "none";

            const filteredTeams = currentTournamentData.teams
                .filter(t => t.isFinalist)
                .sort((a, b) => (a.finalsRank || 99) - (b.finalsRank || 99));
            renderStandingsTable(filteredTeams);
        });
    }

    filterBtns.forEach(btn => {
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
    });

    const freshBtns = document.querySelectorAll(".filter-btn");

    freshBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
            freshBtns.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");

            const region = btn.getAttribute("data-region");
            currentFilterState = region;
            let filteredTeams;

            if (region === "all") {
                filteredTeams = currentTournamentData.teams;
            } else {
                filteredTeams = currentTournamentData.teams.filter((t) => t.region.includes(region));
            }
            if (countDisplay) countDisplay.innerText = filteredTeams.length;
            renderTeams(filteredTeams);
        });
    });

    const expandBtn = document.getElementById("teams-expand-btn");
    if (expandBtn) {
        const newExpandBtn = expandBtn.cloneNode(true);
        expandBtn.parentNode.replaceChild(newExpandBtn, expandBtn);
        newExpandBtn.addEventListener("click", () => {
            isTeamsExpanded = !isTeamsExpanded;
            const region = currentFilterState;
            let filteredTeams;
            if (region === "all") {
                filteredTeams = currentTournamentData.teams;
            } else {
                filteredTeams = currentTournamentData.teams.filter((t) => t.region.includes(region));
            }
            renderTeams(filteredTeams);
        });
    }

    if (currentMode === "finals" && activeFinalsBtn) {
        activeFinalsBtn.click();
    } else {
        const activeBtn = Array.from(freshBtns).find(b => b.getAttribute('data-region') === currentFilterState) || Array.from(freshBtns).find(b => b.getAttribute('data-region') === 'all');
        if (activeBtn) activeBtn.click();
    }
}

function setupNavigation() {
    const navLinks = document.querySelectorAll(".nav-links a");
    window.addEventListener("scroll", () => {
        if (isSwitchingYear) return; // Completely ignore scroll event storms while changing years 

        let current = "";
        const sections = document.querySelectorAll("section");
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 150) {
                current = section.getAttribute("id");
                currentVisibleSection = current;
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

// Country code lookup for flagcdn.com
const FLAG_CODES = {
    'english': 'gb', 'thai': 'th', 'indonesian': 'id', 'malay': 'my',
    'vietnamese': 'vn', 'burmese': 'mm', 'tagalog': 'ph', 'filipino': 'ph',
    'khmer': 'kh', 'bangla': 'bd', 'bengali': 'bd', 'urdu': 'pk',
    'nepali': 'np', 'hindi': 'in', 'mongolian': 'mn', 'russian': 'ru',
    'cis/russian': 'ru', 'kazakh': 'kz', 'uzbek': 'uz', 'turkish': 'tr',
    'arabic': 'sa', 'portuguese': 'br', 'spanish': 'es', 'german': 'de',
    'french': 'fr', 'mandarin': 'cn', 'chinese': 'cn', 'taiwanese': 'tw',
    'korean': 'kr', 'japanese': 'jp', 'mongolia': 'mn', 'nepal': 'np',
    'turkey': 'tr', 'china': 'cn', 'thailand': 'th', 'brazil': 'br',
    'vietnam': 'vn', 'indonesia': 'id', 'malaysia': 'my', 'iraq': 'iq',
    'pakistan': 'pk', 'united arab emirates': 'ae', 'saudi arabia': 'sa'
};

const COUNTRY_NAMES = {
    'tr': 'Turkey',
    'cn': 'China',
    'th': 'Thailand',
    'np': 'Nepal',
    'mn': 'Mongolia',
    'id': 'Indonesia',
    'br': 'Brazil',
    'my': 'Malaysia',
    'vn': 'Vietnam',
    'kr': 'South Korea',
    'jp': 'Japan',
    'pk': 'Pakistan',
    'iq': 'Iraq',
    'ae': 'UAE',
    'sa': 'Saudi Arabia',
    'mm': 'Myanmar',
    'cl': 'Chile',
    'ru': 'Russia',
    'kz': 'Kazakhstan',
    'uz': 'Uzbekistan',
    'un': 'Global'
};

function getFlagUrl(langName) {
    const code = FLAG_CODES[langName.toLowerCase()] || 'un';
    return `https://flagcdn.com/32x24/${code}.png`;
}

function renderBroadcast(year) {
    const container = document.getElementById('broadcast-container');
    if (!container) return;

    const data = broadcastData[year];
    if (!data) {
        container.innerHTML = `<div class="broadcast-no-data glass-card"><p>📡 No broadcast talent data available for ${year}.</p><small style="color:var(--text-secondary)">This year's data hasn't been documented on Liquipedia yet.</small></div>`;
        return;
    }

    // Tabs
    const tabsHtml = `<div class="broadcast-tabs">${data.tabs.map((t, i) =>
        `<button class="tab-btn${i === 0 ? ' active' : ''}" data-target="${t.id}">${t.label}</button>`
    ).join('')
        }</div>`;

    // Cards — new compact bc-card layout
    const cardsHtml = data.cards.map(card => {
        const flagUrl = getFlagUrl(card.lang);
        const rolesHtml = card.talent.map(group => `
            <div class="bc-role-row">
                <span class="bc-role-tag">${group.role}</span>
                <div class="bc-names">${group.names.map(n => `<span class="bc-name">${n}</span>`).join('')
            }</div>
            </div>`).join('');

        return `
        <div class="bc-card" data-region="${card.region}" style="display:none;">
            <div class="bc-header">
                <img class="bc-flag" src="${flagUrl}" alt="${card.lang}" referrerpolicy="no-referrer" onerror="this.src='https://flagcdn.com/32x24/un.png'">
                <span class="bc-lang">${card.lang}</span>
                <a href="${card.ytUrl}" target="_blank" class="bc-yt-btn" title="Watch on YouTube">▶</a>
            </div>
            <div class="bc-roles">${rolesHtml}</div>
        </div>`;
    }).join('');

    const gridHtml = `<div class="broadcast-grid">${cardsHtml}</div>`;
    container.innerHTML = tabsHtml + gridHtml;

    const grid = container.querySelector('.broadcast-grid');

    function showRegion(regionId) {
        grid.querySelectorAll('.bc-card').forEach(card => {
            card.style.display = card.getAttribute('data-region') === regionId ? 'flex' : 'none';
        });
    }

    showRegion(data.tabs[0].id);

    container.querySelectorAll('.tab-btn').forEach(tab => {
        tab.addEventListener('click', () => {
            container.querySelectorAll('.tab-btn').forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            showRegion(tab.getAttribute('data-target'));
        });
    });
}

/* ==========================================================================
   DYNAMIC TOURNAMENT TIMELINE & FORMAT GENERATION
   ========================================================================== */
function renderTournamentProcess(year) {
    const timelineWrapper = document.getElementById("timeline-wrapper");
    const formatGridWrapper = document.getElementById("format-grid-wrapper");

    if (!timelineWrapper || !formatGridWrapper) return;

    let timelineHTML = "";
    let formatHTML = "";

    if (year === "2020") {
        timelineHTML = `
            <div class="timeline-item">
                <div class="timeline-dot" style="background: var(--text-primary); box-shadow: 0 0 10px rgba(255,255,255,0.5); border:none;"></div>
                <div class="timeline-content cyber-hover" style="border-left: 4px solid #fff; background: linear-gradient(90deg, rgba(255,255,255,0.05), transparent);">
                    <h4>LEAGUE STAGE</h4>
                    <span style="color: var(--text-secondary); letter-spacing: 1px;">PHASE 01 — SELECTION</span>
                    <p>24 Global Teams clash over 4 weeks. Weekdays function as qualifiers for the critical "Super Weekends" where overall points are actually accumulated.</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot" style="background: var(--accent-gold); box-shadow: 0 0 15px var(--accent-gold); border:none; width: 20px; height: 20px; left: -2px;"></div>
                <div class="timeline-content cyber-hover" style="border-left: 4px solid var(--accent-gold); background: linear-gradient(90deg, rgba(255, 184, 0, 0.1), transparent);">
                    <h4 style="color: var(--accent-gold); font-size: 1.3rem;">GRAND FINALS</h4>
                    <span style="color: rgba(255, 184, 0, 0.8); letter-spacing: 2px;">THE APEX</span>
                    <p>The top 16 teams from the League Stage advance to the finals format. 29 intense matches due to scheduling shifts crown the first global champion.</p>
                </div>
            </div>
        `;
        formatHTML = `
            <div class="format-card glass-card cyber-hover">
                <div class="active-pulse-bg"></div>
                <div class="format-icon" style="color: #fff; text-shadow: 0 0 15px rgba(255,255,255,0.5);">📅</div>
                <h3 style="color: #fff;">01 / Weekdays</h3>
                <p>24 Teams play round-robin. The sole goal is to secure a top-16 finish to qualify for that week's Super Weekend.</p>
            </div>
            <div class="format-card glass-card cyber-hover">
                <div class="active-pulse-bg"></div>
                <div class="format-icon" style="color: var(--accent-cyan); text-shadow: 0 0 15px var(--accent-cyan);">🔥</div>
                <h3 style="color: var(--accent-cyan);">02 / Super Weekends</h3>
                <p>Championship points. Only the points acquired during these 3-day weekend bouts count toward the overall League Standings.</p>
            </div>
            <div class="format-card highlight-card cyber-hover" style="border: 1px solid var(--accent-gold); background: linear-gradient(135deg, rgba(30, 30, 35, 0.9), rgba(20, 20, 25, 0.9));">
                <div class="format-icon" style="color: var(--accent-gold); text-shadow: 0 0 20px var(--accent-gold); transform: scale(1.1);">👑</div>
                <h3 style="color: var(--accent-gold); font-size: 1.4rem;">Grand Finals</h3>
                <p>16 elite rosters. 29 matches of unimaginable pressure. The inaugural PMGC Champion is crowned.</p>
            </div>
        `;
    } else if (year === "2021") {
        timelineHTML = `
            <div class="timeline-item">
                <div class="timeline-dot" style="background: var(--text-primary); box-shadow: 0 0 10px rgba(255,255,255,0.5); border:none;"></div>
                <div class="timeline-content cyber-hover" style="border-left: 4px solid #fff; background: linear-gradient(90deg, rgba(255,255,255,0.05), transparent);">
                    <h4>EAST & WEST LEAGUES</h4>
                    <span style="color: var(--text-secondary); letter-spacing: 1px;">PHASE 01 — REGIONAL DIVISIONS</span>
                    <p>40 Teams divided strictly into East (20) and West (20) divisions. They undergo weekday qualifying to compete in high-stakes Super Weekends.</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot" style="background: var(--accent-cyan); box-shadow: 0 0 10px var(--accent-cyan); border:none;"></div>
                <div class="timeline-content cyber-hover" style="border-left: 4px solid var(--accent-cyan); background: linear-gradient(90deg, rgba(0,242,255,0.05), transparent);">
                    <h4 style="color: var(--accent-cyan);">LEAGUE FINALS</h4>
                    <span style="color: rgba(0,242,255,0.8); letter-spacing: 1px;">PHASE 02 — DIVISION APEX</span>
                    <p>The top 16 teams from each respective League clash over an intense 18-match series to qualify for the global Grand Finals.</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot" style="background: var(--accent-gold); box-shadow: 0 0 15px var(--accent-gold); border:none; width: 20px; height: 20px; left: -2px;"></div>
                <div class="timeline-content cyber-hover" style="border-left: 4px solid var(--accent-gold); background: linear-gradient(90deg, rgba(255, 184, 0, 0.1), transparent);">
                    <h4 style="color: var(--accent-gold); font-size: 1.3rem;">GRAND FINALS</h4>
                    <span style="color: rgba(255, 184, 0, 0.8); letter-spacing: 2px;">GLOBAL CONVERGENCE</span>
                    <p>9 teams from the East, 6 teams from the West, and 1 special invite representing Battlegrounds Mobile India face off over 18 total matches.</p>
                </div>
            </div>
        `;
        formatHTML = `
            <div class="format-card glass-card cyber-hover">
                <div class="active-pulse-bg"></div>
                <div class="format-icon" style="color: #fff; text-shadow: 0 0 15px rgba(255,255,255,0.5);">🌍</div>
                <h3 style="color: #fff;">01 / Divided League</h3>
                <p>Regional isolation. 20 East and 20 West teams battle separately to accumulate Super Weekend points.</p>
            </div>
            <div class="format-card glass-card cyber-hover">
                <div class="active-pulse-bg"></div>
                <div class="format-icon" style="color: var(--accent-cyan); text-shadow: 0 0 15px var(--accent-cyan);">⚔️</div>
                <h3 style="color: var(--accent-cyan);">02 / League Finals</h3>
                <p>The top 16 from both regions brawl in an 18-game series to finalize the delegates for the Global event.</p>
            </div>
            <div class="format-card glass-card cyber-hover">
                <div class="active-pulse-bg"></div>
                <div class="format-icon" style="color: #ef4444; text-shadow: 0 0 15px #ef4444;">🎫</div>
                <h3 style="color: #ef4444;">03 / Qualification</h3>
                <p>Tickets distribution: Top 9 East, Top 6 West, and the Champion of BGMI 2021.</p>
            </div>
            <div class="format-card highlight-card cyber-hover" style="border: 1px solid var(--accent-gold); background: linear-gradient(135deg, rgba(30, 30, 35, 0.9), rgba(20, 20, 25, 0.9));">
                <div class="format-icon" style="color: var(--accent-gold); text-shadow: 0 0 20px var(--accent-gold); transform: scale(1.1);">👑</div>
                <h3 style="color: var(--accent-gold); font-size: 1.4rem;">Grand Finals</h3>
                <p>East meets West. The 16 best global rosters battle over 3 days (18 matches) to become the PMGC 2021 Champions.</p>
            </div>
        `;
    } else {
        // Standard Format for 2022, 2023, 2024, 2025
        timelineHTML = `
            <div class="timeline-item">
                <div class="timeline-dot" style="background: var(--text-primary); box-shadow: 0 0 10px rgba(255,255,255,0.5); border:none;"></div>
                <div class="timeline-content cyber-hover" style="border-left: 4px solid #fff; background: linear-gradient(90deg, rgba(255,255,255,0.05), transparent);">
                    <h4>LEAGUE STAGE</h4>
                    <span style="color: var(--text-secondary); letter-spacing: 1px;">PHASE 01 — GROUP STAGE</span>
                    <p>48 Global Teams are drafted into three separate groups (Red, Green, Yellow). The top 3 performers from each fiercely contested group secure an immediate, coveted bye into the Grand Finals.</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot" style="background: var(--accent-cyan); box-shadow: 0 0 10px var(--accent-cyan); border:none;"></div>
                <div class="timeline-content cyber-hover" style="border-left: 4px solid var(--accent-cyan); background: linear-gradient(90deg, rgba(0,242,255,0.05), transparent);">
                    <h4 style="color: var(--accent-cyan);">SURVIVAL STAGE</h4>
                    <span style="color: rgba(0,242,255,0.8); letter-spacing: 1px;">PHASE 02 — THE GRIND</span>
                    <p>Teams finishing 4th-11th from the Group Stage are pooled into a brutal 24-team battleground. Only the fiercest 16 teams survive the gauntlet to reach Last Chance.</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot" style="background: #ef4444; box-shadow: 0 0 10px #ef4444; border:none;"></div>
                <div class="timeline-content cyber-hover" style="border-left: 4px solid #ef4444; background: linear-gradient(90deg, rgba(239, 68, 68, 0.05), transparent);">
                    <h4 style="color: #ef4444;">LAST CHANCE</h4>
                    <span style="color: rgba(239, 68, 68, 0.8); letter-spacing: 1px;">PHASE 03 — DO OR DIE</span>
                    <p>The 16 survivors from Phase 02 clash in the ultimate elimination bracket. Only the top 5 or 6 secure the remaining golden tickets.</p>
                </div>
            </div>
            <div class="timeline-item">
                <div class="timeline-dot" style="background: var(--accent-gold); box-shadow: 0 0 15px var(--accent-gold); border:none; width: 20px; height: 20px; left: -2px;"></div>
                <div class="timeline-content cyber-hover" style="border-left: 4px solid var(--accent-gold); background: linear-gradient(90deg, rgba(255, 184, 0, 0.1), transparent);">
                    <h4 style="color: var(--accent-gold); font-size: 1.3rem;">GRAND FINALS</h4>
                    <span style="color: rgba(255, 184, 0, 0.8); letter-spacing: 2px;">THE APEX</span>
                    <p>The 16 finest PUBG Mobile squads on the planet drop into the final battlegrounds. 18 matches. 1 Champion. The ultimate culmination of the competitive year.</p>
                </div>
            </div>
        `;
        formatHTML = `
            <div class="format-card glass-card cyber-hover">
                <div class="active-pulse-bg"></div>
                <div class="format-icon" style="color: #fff; text-shadow: 0 0 15px rgba(255,255,255,0.5);">👥</div>
                <h3 style="color: #fff;">01 / Group Stage</h3>
                <p>48 regional powerhouses clash over weeks of tactical survival. Only the 9 most consistent teams bypass the bloodshed directly into the Grand Finals.</p>
            </div>
            <div class="format-card glass-card cyber-hover">
                <div class="active-pulse-bg"></div>
                <div class="format-icon" style="color: var(--accent-cyan); text-shadow: 0 0 15px var(--accent-cyan);">🛡️</div>
                <h3 style="color: var(--accent-cyan);">02 / Survival Stage</h3>
                <p>A second chance for teams ranked 4th-11th. 24 teams battle over intense sets, fighting to secure 16 spots in the penultimate stage.</p>
            </div>
            <div class="format-card glass-card cyber-hover">
                <div class="active-pulse-bg"></div>
                <div class="format-icon" style="color: #ef4444; text-shadow: 0 0 15px #ef4444;">⚡</div>
                <h3 style="color: #ef4444;">03 / Last Chance</h3>
                <p>The gauntlet. 16 teams, 12 matches, and only the top few remaining tickets to the biggest stage in PUBG Mobile Esports.</p>
            </div>
            <div class="format-card highlight-card cyber-hover" style="border: 1px solid var(--accent-gold); background: linear-gradient(135deg, rgba(30, 30, 35, 0.9), rgba(20, 20, 25, 0.9));">
                <div class="format-icon" style="color: var(--accent-gold); text-shadow: 0 0 20px var(--accent-gold); transform: scale(1.1);">👑</div>
                <h3 style="color: var(--accent-gold); font-size: 1.4rem;">Grand Finals</h3>
                <p>The 16 elite rosters on earth. 18 matches of unimaginable pressure. One squad lifts the trophy.</p>
            </div>
        `;
    }

    timelineWrapper.innerHTML = timelineHTML;
    formatGridWrapper.innerHTML = formatHTML;
}

document.addEventListener("DOMContentLoaded", initApp);
