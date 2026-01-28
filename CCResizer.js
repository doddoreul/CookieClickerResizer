// Cookie Clicker Resizer v1.1 avec Pop All Wrinklers
// Compatible avec Cookie Clicker Mod Manager

(function() {

    // Wait for Game to be loaded
    function waitForGame() {
        if (typeof Game === 'undefined' || !Game.ready) {
            setTimeout(waitForGame, 100);
            return;
        }
        initMod();
    }

    waitForGame();

    function initMod() {
        // Register the mod
        Game.registerMod("CC Resizer", {
            init: function() {
                // --- CSS personnalisé ---
                let styleElement = document.getElementById('customCSSPlugin');
                if (!styleElement) {
                    styleElement = document.createElement('style');
                    styleElement.id = 'customCSSPlugin';
                    document.head.appendChild(styleElement);
                }

                const customCSS = `
                    #sectionLeft { width: 25% !important; }
                    .separatorLeft { left: 25% !important; }
                    #sectionMiddle { left: 25% !important; right: 240px !important; }
                    .separatorRight { right: 240px !important; }
                    #backgroundLeftCanvas { width: 100% !important; height: 100% !important; }
                    .storeSection { width: 240px !important; }
                    .product { width: 240px !important; }
                    .storeBulkMode { width: 60px !important; }
                    .storeBulkAmount { width: 45px !important; }
                    #storeTitle { width: 224px !important; }
                    #gardenField { width: 350px !important; }
                    #gardenPanel { width: 290px !important; }
                `;
                styleElement.textContent = customCSS;

                // --- Noms de produits raccourcis ---
                const productNames = [
                    'Crsr', 'Gma', 'Frm', 'Mine', 'Fctry', 'Bank', 'Tmpl', 'Wz T',
                    'Shpt', 'ALab', 'Prtl', 'TM', 'AC', 'Prsm', 'ChMk', 'FE', 'JS',
                    'Idle', 'CB', 'You'
                ];
                productNames.forEach((name, index) => {
                    const element = document.getElementById('productName' + index);
                    if (element) element.textContent = name;
                });

                const observer = new MutationObserver(() => {
                    productNames.forEach((name, index) => {
                        const element = document.getElementById('productName' + index);
                        if (element && element.textContent !== name) {
                            element.textContent = name;
                        }
                    });
                });
                productNames.forEach((_, index) => {
                    const element = document.getElementById('productName' + index);
                    if (element) observer.observe(element, { childList: true, characterData: true, subtree: true });
                });

                // --- Beautify personnalisé ---
                const SUFFIXES = [
                  '', 'K', 'M', 'B', 'T',
                  'Qa', 'Qi', 'Sx', 'Sp', 'Oc',
                  'No', 'De', 'UDe', 'DDe', 'TDe',
                  'QaDe', 'QiDe', 'SxDe', 'SpDe', 'ODe',
                  'NDe', 'Vi', 'UVi', 'DVi', 'TVi',
                  'QaVi', 'QiVi', 'SxVi'
                ];
                const SPACE = '\u202F';
                const _Beautify = Beautify;
                function CMFormat(value, floats = 2, forced = false) {
                    if (value === Infinity) return '∞';
                    if (isNaN(value)) return '0';
                    value = Number(value);
                    if (!forced && Math.abs(value) < 1000) return _Beautify(value, floats, forced);
                    let exponent = Math.floor(Math.log10(Math.abs(value)));
                    let tier = Math.floor(exponent / 3);
                    if (tier <= 0) return _Beautify(value, floats, forced);
                    if (tier >= SUFFIXES.length) return value.toExponential(2);
                    let scale = Math.pow(10, tier * 3);
                    let scaled = value / scale;
                    let out = scaled >= 100 ? scaled.toFixed(0) : scaled >= 10 ? scaled.toFixed(1) : scaled.toFixed(2);
                    return out + SPACE + SUFFIXES[tier];
                }
                Beautify = CMFormat;
                BeautifyAll = CMFormat;
                Game.formatNumber = function(value) { return CMFormat(value); };

                // --- Pop All Wrinklers btn ---
                if (!document.getElementById('popAllWrinklersFrame')) {

                    const frame = document.createElement('div');
                    frame.id = 'popAllWrinklersFrame';
                    frame.className = 'framed';

                    frame.style.position = 'fixed';
                    frame.style.left = '6px';
                    frame.style.bottom = '30px';
                    frame.style.zIndex = '10000';

                    frame.style.padding = '4px';
                    frame.style.boxShadow = 'none';
                    frame.style.backgroundClip = 'padding-box';

                    const btn = document.createElement('div');
                    btn.className = 'option titleFont';
                    btn.textContent = 'Pop all wrinklers';

                    btn.style.whiteSpace = 'nowrap';
                    btn.style.textAlign = 'center';
                    btn.style.cursor = 'pointer'; // ← hover “main”

                    btn.onclick = function () {
                        let popped = false;
                        Game.wrinklers.forEach(w => {
                            if (w.hp > 0) {
                                w.hp = 0;
                                popped = true;
                            }
                        });
                        Game.UpdateWrinklers();

                    };

                    frame.appendChild(btn);
                    document.body.appendChild(frame);
                }

                if (!document.getElementById('popAllGCFrame')){
                    const frame = document.createElement('div');
                    frame.id = 'popAllGCFrame';
                    frame.className = 'framed';

                    frame.style.position = 'fixed';
                    frame.style.left = '130px'; // place à droite du bouton wrinklers
                    frame.style.bottom = '30px';
                    frame.style.zIndex = '10000';

                    frame.style.padding = '4px';
                    frame.style.boxShadow = 'none';
                    frame.style.backgroundClip = 'padding-box';

                    const btn = document.createElement('div');
                    btn.className = 'option titleFont';
                    btn.textContent = 'Pop all GC';

                    btn.style.whiteSpace = 'nowrap';
                    btn.style.textAlign = 'center';
                    btn.style.cursor = 'pointer'; // hover “main”

                    btn.onclick = function () {
                        let popped = false;
                        Game.shimmer.forEach(s => {
                            if (s.type === "golden" && !s.popped) {
                                s.pop();
                                popped = true;
                            }
                        });
                        if (popped) PlaySound('snd/tick.mp3');
                    };

                    frame.appendChild(btn);
                    document.body.appendChild(frame);
                }

                // Notification du plugin
                if (typeof Game.Notify !== 'undefined') {
                    Game.Notify('CC Resizer loaded!', '', [16, 5], 3);
                }

                console.log('CC Resizer initialized successfully');
            },

            save: function() { return ""; },
            load: function(str) { /* No load needed */ }
        });
    }
})();
