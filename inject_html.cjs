const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const replacement = `
                <div class="broadcast-tabs">
                    <button class="tab-btn active" data-target="region-english">English</button>
                    <button class="tab-btn" data-target="region-turkish">Turkish</button>
                    <button class="tab-btn" data-target="region-sea">SEA</button>
                    <button class="tab-btn" data-target="region-southasia">South Asia</button>
                    <button class="tab-btn" data-target="region-arabic">Arabic</button>
                    <button class="tab-btn" data-target="region-europe">Europe</button>
                    <button class="tab-btn" data-target="region-americas">Americas</button>
                    <button class="tab-btn" data-target="region-eastasia">East Asia</button>
                </div>
                <div class="broadcast-grid active-region-english">
                    <!-- English -->
                    <div class="broadcast-card glass-card" data-region="region-english">
                        <div class="lang-header"><span class="lang-flag">🇬🇧</span><h3>English</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role">Hosts</span><div class="talent-list">
                                <span class="talent-chip">ChuChu</span><span class="talent-chip">TashBunny</span><span class="talent-chip">Banks</span><span class="talent-chip">HotJukes</span><span class="talent-chip">JKaplan</span>
                            </div></div>
                            <div class="talent-group"><span class="role">Analysts</span><div class="talent-list">
                                <span class="talent-chip">Cameron Davis</span><span class="talent-chip">Kaelaris</span><span class="talent-chip">Maxman</span><span class="talent-chip">The7WG</span>
                            </div></div>
                            <div class="talent-group"><span class="role">Commentators</span><div class="talent-list">
                                <span class="talent-chip">Blank</span><span class="talent-chip">Jacky</span><span class=\"talent-chip\">John Allen</span><span class="talent-chip\">ZooTay</span>
                            </div></div>
                        </div>
                        <a href="https://www.youtube.com/@PUBGMOBILEEsports" target="_blank" class="yt-link"><span class="yt-icon">▶</span> Watch on YouTube</a>
                    </div>

                    <!-- Turkish -->
                    <div class="broadcast-card glass-card" data-region="region-turkish">
                        <div class="lang-header"><span class="lang-flag">🇹🇷</span><h3>Turkish</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role">Host</span><div class="talent-list"><span class="talent-chip">Tintin</span></div></div>
                            <div class="talent-group"><span class="role">Analysts</span><div class="talent-list"><span class="talent-chip">Seyid</span><span class="talent-chip\">Yargic Tony</span></div></div>
                            <div class="talent-group"><span class="role">Commentators</span><div class="talent-list"><span class="talent-chip">Erman Yasar</span><span class="talent-chip">Kaan Kural</span><span class=\"talent-chip\">Scott</span><span class=\"talent-chip\">SencerEZ</span></div></div>
                        </div>
                        <a href="https://www.youtube.com/@PUBGMOBILE_TR" target="_blank" class="yt-link"><span class="yt-icon">▶</span> Watch on YouTube</a>
                    </div>

                    <!-- SEA -->
                    <div class="broadcast-card glass-card" data-region="region-sea">
                        <div class="lang-header"><span class="lang-flag">🇮🇩</span><h3>Indonesian</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role">Hosts</span><div class="talent-list"><span class="talent-chip">Donna</span><span class="talent-chip">Windy</span></div></div>
                            <div class="talent-group"><span class="role">Analysts</span><div class="talent-list"><span class="talent-chip">El Dogee</span><span class="talent-chip">Junior</span><span class=\"talent-chip\">Odidieu</span><span class=\"talent-chip\">Wolfy</span></div></div>
                            <div class="talent-group"><span class="role">Commentators</span><div class="talent-list"><span class="talent-chip\">Jelly</span><span class="talent-chip\">Pasta</span><span class=\"talent-chip\">Sanskuy</span><span class=\"talent-chip\">Wolfy</span></div></div>
                        </div>
                        <a href="https://www.youtube.com/@pubgmobileid" target="_blank" class="yt-link"><span class="yt-icon\">▶</span> Watch on YouTube</a>
                    </div>
                    <div class="broadcast-card glass-card" data-region="region-sea">
                        <div class="lang-header"><span class="lang-flag\">🇲🇾</span><h3>Malay</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role\">Hosts</span><div class="talent-list"><span class="talent-chip\">Emi</span><span class=\"talent-chip\">Kyrul</span></div></div>
                            <div class="talent-group"><span class="role\">Analysts</span><div class="talent-list"><span class="talent-chip\">J Hunter</span><span class=\"talent-chip\">Soultannn</span></div></div>
                            <div class="talent-group"><span class="role\">Commentators</span><div class="talent-list"><span class="talent-chip\">J Hunter</span><span class=\"talent-chip\">Kyrul</span><span class=\"talent-chip\">OnTheGo</span><span class=\"talent-chip\">TopCast</span></div></div>
                        </div>
                        <a href="https://www.youtube.com/@pubgmobilemy" target="_blank" class="yt-link"><span class="yt-icon\">▶</span> Watch on YouTube</a>
                    </div>
                    <div class="broadcast-card glass-card" data-region="region-sea">
                        <div class="lang-header"><span class="lang-flag\">🇹🇭</span><h3>Thai</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role\">Host</span><div class="talent-list"><span class="talent-chip\">Aoeyjiwa</span></div></div>
                            <div class="talent-group"><span class="role\">Analyst</span><div class="talent-list"><span class="talent-chip\">BeCrazy</span></div></div>
                            <div class="talent-group"><span class="role\">Commentators</span><div class="talent-list"><span class="talent-chip\">Archz</span><span class=\"talent-chip\">Ffame</span><span class=\"talent-chip\">Zaffer</span></div></div>
                        </div>
                        <a href="https://www.youtube.com/@pubgmobilethailand" target="_blank" class="yt-link"><span class="yt-icon\">▶</span> Watch on YouTube</a>
                    </div>
                    <div class="broadcast-card glass-card" data-region="region-sea">
                        <div class="lang-header"><span class="lang-flag\">🇻🇳</span><h3>Vietnamese</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role\">Commentators</span><div class="talent-list"><span class="talent-chip\">Cường OT</span><span class=\"talent-chip\">Huy Lova</span><span class=\"talent-chip\">Hữu Nghĩa</span><span class=\"talent-chip\">Kuook</span><span class=\"talent-chip\">Loki</span><span class=\"talent-chip\">Tuấn Tái</span><span class=\"talent-chip\">VietOP</span></div></div>
                        </div>
                        <a href="https://www.youtube.com/@PUBGMOBILEVN1" target="_blank" class="yt-link"><span class="yt-icon\">▶</span> Watch on YouTube</a>
                    </div>
                    <div class="broadcast-card glass-card" data-region="region-sea">
                        <div class="lang-header"><span class="lang-flag\">🇲🇲</span><h3>Burmese</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role\">Commentators</span><div class="talent-list"><span class="talent-chip\">Blingx</span><span class=\"talent-chip\">Sammy</span><span class=\"talent-chip\">Zan</span></div></div>
                        </div>
                        <a href="https://www.youtube.com/@PUBGMOBILEMyanmar" target="_blank" class="yt-link"><span class="yt-icon\">▶</span> Watch on YouTube</a>
                    </div>
                    <div class="broadcast-card glass-card" data-region="region-sea">
                        <div class="lang-header"><span class="lang-flag\">🇵🇭</span><h3>Tagalog</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role\">Commentators</span><div class="talent-list"><span class="talent-chip\">AyaPlays</span><span class=\"talent-chip\">BekBek</span><span class=\"talent-chip\">PhauloB</span><span class=\"talent-chip\">QueenToyo</span><span class=\"talent-chip\">Reyrey</span></div></div>
                        </div>
                        <a href="https://www.youtube.com/@PUBGMOBILEPhilippines" target="_blank" class="yt-link"><span class="yt-icon\">▶</span> Watch on YouTube</a>
                    </div>
                    <div class="broadcast-card glass-card" data-region="region-sea">
                        <div class="lang-header"><span class="lang-flag\">🇰🇭</span><h3>Khmer</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role\">Commentators</span><div class="talent-list"><span class="talent-chip\">BiqDaddy</span><span class=\"talent-chip\">Crim</span><span class=\"talent-chip\">STALKER</span></div></div>
                        </div>
                        <a href="https://www.youtube.com/@PUBGMOBILECambodia" target="_blank" class="yt-link"><span class="yt-icon\">▶</span> Watch on YouTube</a>
                    </div>

                    <!-- South Asia -->
                    <div class="broadcast-card glass-card" data-region="region-southasia">
                        <div class="lang-header"><span class="lang-flag\">🇵🇰</span><h3>Urdu</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role\">Commentators</span><div class="talent-list"><span class="talent-chip\">Aadi</span><span class=\"talent-chip\">Aladdin</span><span class=\"talent-chip\">Gaming Portal</span><span class=\"talent-chip\">RZ</span></div></div>
                        </div>
                        <a href="https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia" target="_blank" class="yt-link"><span class="yt-icon\">▶</span> Watch on YouTube</a>
                    </div>
                    <div class="broadcast-card glass-card" data-region="region-southasia">
                        <div class="lang-header"><span class="lang-flag\">🇳🇵</span><h3>Nepali</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role\">Commentators</span><div class="talent-list"><span class="talent-chip\">AnshYT</span><span class=\"talent-chip\">Bipul</span><span class=\"talent-chip\">Mandip Casts</span><span class=\"talent-chip\">MrHyozu</span></div></div>
                        </div>
                        <a href="https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia" target="_blank" class="yt-link"><span class="yt-icon\">▶</span> Watch on YouTube</a>
                    </div>
                    <div class="broadcast-card glass-card" data-region="region-southasia">
                        <div class="lang-header"><span class="lang-flag\">🇲🇳</span><h3>Mongolian</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role\">Commentators</span><div class="talent-list"><span class="talent-chip\">Tuvshintugs</span><span class=\"talent-chip\">Wise</span></div></div>
                        </div>
                        <a href="https://www.youtube.com/@PUBGMOBILEEsportsSouthAsia" target="_blank" class="yt-link"><span class="yt-icon\">▶</span> Watch on YouTube</a>
                    </div>

                    <!-- Arabic -->
                    <div class="broadcast-card glass-card" data-region="region-arabic">
                        <div class="lang-header"><span class="lang-flag\">🇸🇦</span><h3>Arabic</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role\">Hosts</span><div class="talent-list"><span class="talent-chip\">L3GEND</span><span class=\"talent-chip\">Sandstorm</span></div></div>
                            <div class="talent-group"><span class="role\">Analysts</span><div class="talent-list"><span class="talent-chip\">K0de</span><span class=\"talent-chip\">Kayyali</span><span class=\"talent-chip\">Mao</span><span class=\"talent-chip\">Starfall</span></div></div>
                            <div class="talent-group"><span class="role\">Commentators</span><div class="talent-list"><span class="talent-chip\">Almola</span><span class=\"talent-chip\">Flanker</span><span class=\"talent-chip\">Mo3taz</span><span class=\"talent-chip\">Youcef</span></div></div>
                        </div>
                        <a href="https://www.youtube.com/@PUBGMOBILEMENAOFFICIAL" target="_blank" class="yt-link"><span class="yt-icon\">▶</span> Watch on YouTube</a>
                    </div>

                    <!-- Europe -->
                    <div class="broadcast-card glass-card" data-region="region-europe">
                        <div class="lang-header"><span class="lang-flag\">🇷🇺</span><h3>Russian</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role\">Broadcast Director</span><div class="talent-list"><span class="talent-chip\">Starboy</span></div></div>
                            <div class="talent-group"><span class="role\">Commentators</span><div class="talent-list"><span class="talent-chip\">Coldstar</span><span class=\"talent-chip\">Fenix</span></div></div>
                        </div>
                        <a href="https://www.youtube.com/@PUBGMOBILERU" target="_blank" class="yt-link"><span class="yt-icon\">▶</span> Watch on YouTube</a>
                    </div>
                    <div class="broadcast-card glass-card" data-region="region-europe">
                        <div class="lang-header"><span class="lang-flag\">🇰🇿</span><h3>Kazakh</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role\">Commentators</span><div class="talent-list"><span class="talent-chip\">Gonzo</span><span class=\"talent-chip\">LastHero</span></div></div>
                        </div>
                        <a href="https://www.youtube.com/@PUBGMOBILEKazakhstan" target="_blank" class="yt-link"><span class="yt-icon\">▶</span> Watch on YouTube</a>
                    </div>
                    <div class="broadcast-card glass-card" data-region="region-europe">
                        <div class="lang-header"><span class="lang-flag\">🇺🇿</span><h3>Uzbek</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role\">Commentators</span><div class="talent-list"><span class="talent-chip\">EAGLE BRO</span><span class=\"talent-chip\">RHYTHM</span></div></div>
                        </div>
                        <a href="https://www.youtube.com/@pubgmobile_uz" target="_blank" class="yt-link"><span class="yt-icon\">▶</span> Watch on YouTube</a>
                    </div>

                    <!-- Americas -->
                    <div class="broadcast-card glass-card" data-region="region-americas">
                        <div class="lang-header"><span class="lang-flag\">🇧🇷</span><h3>Portuguese</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role\">Commentators</span><div class="talent-list">
                                <span class="talent-chip\">Ferzote</span><span class=\"talent-chip\">Hads</span><span class=\"talent-chip\">Khaya</span><span class=\"talent-chip\">MurilloShooow</span><span class=\"talent-chip\">Pew3x</span>
                            </div></div>
                        </div>
                        <a href="https://www.youtube.com/@PUBGMOBILEBrasil" target="_blank" class="yt-link"><span class="yt-icon\">▶</span> Watch on YouTube</a>
                    </div>
                    <div class="broadcast-card glass-card" data-region="region-americas">
                        <div class="lang-header"><span class="lang-flag\">🇪🇸</span><h3>Spanish</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role\">Commentators</span><div class="talent-list">
                                <span class="talent-chip\">Daphne</span><span class=\"talent-chip\">Frata</span><span class=\"talent-chip\">Gatik</span><span class=\"talent-chip\">Jaguar70</span><span class=\"talent-chip\">KevinMPV</span><span class=\"talent-chip\">KILLER</span>
                            </div></div>
                        </div>
                        <a href="https://www.youtube.com/@PUBGMOBILELATAM" target="_blank" class="yt-link"><span class="yt-icon\">▶</span> Watch on YouTube</a>
                    </div>

                    <!-- East Asia -->
                    <div class="broadcast-card glass-card" data-region="region-eastasia">
                        <div class="lang-header"><span class="lang-flag\">🇨🇳</span><h3>Mandarin</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role\">Commentators</span><div class="talent-list"><span class="talent-chip\">TBA</span></div></div>
                        </div>
                        <a href="https://www.youtube.com/@pubgmobile" target="_blank" class="yt-link"><span class="yt-icon\">▶</span> Watch on YouTube</a>
                    </div>
                    <div class="broadcast-card glass-card" data-region="region-eastasia">
                        <div class="lang-header"><span class="lang-flag\">🇰🇷</span><h3>Korean</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role\">Casters</span><div class="talent-list"><span class="talent-chip\">Kim Hee-joo</span><span class=\"talent-chip\">Park Han-eol</span></div></div>
                            <div class="talent-group"><span class="role\">Commentators</span><div class="talent-list">
                                <span class="talent-chip\">Bino</span><span class=\"talent-chip\">FINALE</span><span class=\"talent-chip\">Kim Dong-yeon</span><span class=\"talent-chip\">Kura</span><span class=\"talent-chip\">NOVA</span><span class=\"talent-chip\">ONBA</span><span class=\"talent-chip\">Park Dong-jin</span><span class=\"talent-chip\">Shin Jung-min</span><span class=\"talent-chip\">WH0RU</span><span class=\"talent-chip\">ZZP</span>
                            </div></div>
                        </div>
                        <a href="https://www.youtube.com/@pubgmobileKR" target="_blank" class="yt-link"><span class="yt-icon\">▶</span> Watch on YouTube</a>
                    </div>
                    <div class="broadcast-card glass-card" data-region="region-eastasia">
                        <div class="lang-header"><span class="lang-flag\">🇯🇵</span><h3>Japanese</h3></div>
                        <div class="talent-info">
                            <div class="talent-group"><span class="role\">Commentators</span><div class="talent-list">
                                <span class="talent-chip\">Junyou Yamauchi</span><span class=\"talent-chip\">OooDa</span><span class=\"talent-chip\">RintoXD</span><span class=\"talent-chip\">Shinichiro</span><span class=\"talent-chip\">Zussy</span>
                            </div></div>
                            <div class="talent-group"><span class="role\">Guest Commentators</span><div class="talent-list">
                                <span class="talent-chip\">Critical Tomato</span><span class=\"talent-chip\">heko</span><span class=\"talent-chip\">p1r</span><span class=\"talent-chip\">Purio</span>
                            </div></div>
                        </div>
                        <a href="https://www.youtube.com/@PUBGMOBILE_JAPAN" target="_blank" class="yt-link"><span class="yt-icon\">▶</span> Watch on YouTube</a>
                    </div>
                </div>
`;

const startIdx = html.indexOf('<div class="broadcast-grid');
const endIdx = html.indexOf('</div>\n            </section>', startIdx);

if (startIdx !== -1 && endIdx !== -1) {
    const updatedHtml = html.substring(0, startIdx) + replacement.trim() + html.substring(endIdx);
    fs.writeFileSync('index.html', updatedHtml);
    console.log('Successfully updated index.html');
} else {
    console.log('Could not find broadcast grid wrapper.');
}
