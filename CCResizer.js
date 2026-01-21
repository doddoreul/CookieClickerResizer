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
                    '', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc',
                    'Ud', 'Dd', 'Td', 'QaD', 'QiD', 'SxD', 'SpD', 'OcD', 'NoD',
                    'Vg', 'UVg', 'DVg', 'TVg', 'QVg'
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

                // --- Bouton Pop All Wrinklers ---
                if (!document.getElementById('popAllWrinklersBtn')) {
                    const btn = document.createElement('button');
                    btn.id = 'popAllWrinklersBtn';
                    btn.textContent = 'Pop all Wrinklers';
                    btn.style.position = 'fixed';
                    btn.style.left = '10px';
                    btn.style.bottom = '30px'; // Au-dessus du numéro de version
                    btn.style.zIndex = '9999';
                    btn.style.padding = '5px 10px';
                    btn.style.backgroundColor = '#F5DEB3';
                    btn.style.border = '1px solid #B8860B';
                    btn.style.borderRadius = '5px';
                    btn.style.cursor = 'pointer';
                    btn.style.fontSize = '14px';
                    btn.style.fontWeight = 'bold';
                    btn.style.boxShadow = '1px 1px 3px rgba(0,0,0,0.3)';

                    btn.addEventListener('click', () => {
                        if (Game.wrinklers.length > 0) {
                            Game.wrinklers.forEach(w => w.hp = 0);
                            Game.UpdateWrinklers();
                            Game.Notify('All wrinklers popped!', '', [16, 5], 3);
                        } else {
                            Game.Notify('No wrinklers to pop!', '', [16, 5], 3);
                        }
                    });

                    document.body.appendChild(btn);
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
