(function() {

    function waitForGame() {
        if (typeof Game === 'undefined' || !Game.ready) {
            setTimeout(waitForGame, 50);
            return;
        }
        initMod();
    }

    waitForGame();

    function initMod() {
        Game.registerMod("CC Resizer", {
            init: function() {

                // --- CSS personnalisé ---
                let styleEl = document.getElementById('customCSSPlugin');
                if (!styleEl) {
                    styleEl = document.createElement('style');
                    styleEl.id = 'customCSSPlugin';
                    document.head.appendChild(styleEl);
                }
                styleEl.textContent = `
                    #sectionLeft { width: 25% !important; }
                    .separatorLeft { left: 25% !important; }
                    #sectionMiddle { left: 25% !important; right: 240px !important; }
                    .separatorRight { right: 240px !important; }
                    #backgroundLeftCanvas { width: 100% !important; height: 100% !important; }
                    .storeSection, .product { width: 240px !important; }
                    .storeBulkMode { width: 60px !important; }
                    .storeBulkAmount { width: 45px !important; }
                    #storeTitle { width: 224px !important; }
                    #gardenField { width: 350px !important; }
                    #gardenPanel { width: 290px !important; }
                `;

                // --- Noms de produits raccourcis ---
                const productNames = ['Crsr','Gma','Frm','Mine','Fctry','Bank','Tmpl','Wz T','Shpt','ALab','Prtl','TM','AC','Prsm','ChMk','FE','JS','Idle','CB','You'];

                const updateNames = () => {
                    productNames.forEach((name, i) => {
                        const el = document.getElementById('productName' + i);
                        if (el && el.textContent !== name) el.textContent = name;
                    });
                };
                updateNames();

                const container = document.getElementById('products');
                if (container) {
                    const observer = new MutationObserver(updateNames);
                    observer.observe(container, { childList: true, characterData: true, subtree: true });
                }

                // --- Beautify optimisé ---
                const SUFFIXES = ['', 'K','M','B','T','Qa','Qi','Sx','Sp','Oc','No','De','UDe','DDe','TDe','QaDe','QiDe','SxDe','SpDe','ODe','NDe','Vi','UVi','DVi','TVi','QaVi','QiVi','SxVi'];
                const POWERS = SUFFIXES.map((_, i) => Math.pow(10, i*3));
                const SPACE = '\u202F';
                const _Beautify = Beautify;

                function CMFormat(value, floats=2, forced=false) {
                    if (!isFinite(value)) return value === Infinity ? '∞' : '0';
                    if (!forced && Math.abs(value) < 1000) return _Beautify(value, floats, forced);
                    let abs = Math.abs(value);
                    let tier = POWERS.findIndex(p => abs < p*1000) - 1;
                    if (tier < 1) return _Beautify(value, floats, forced);
                    tier = Math.min(tier, SUFFIXES.length - 1);
                    let scaled = value / POWERS[tier];
                    let out = scaled >= 100 ? scaled.toFixed(0) : scaled >= 10 ? scaled.toFixed(1) : scaled.toFixed(2);
                    return out + SPACE + SUFFIXES[tier];
                }

                Beautify = BeautifyAll = CMFormat;
                Game.formatNumber = CMFormat;

                // --- Boutons factorisés ---
                function createButton(id, text, left, onClick) {
                    if (document.getElementById(id)) return;
                    const frame = document.createElement('div');
                    frame.id = id;
                    frame.className = 'framed';
                    frame.style.position = 'fixed';
                    frame.style.left = left + 'px';
                    frame.style.bottom = '30px';
                    frame.style.zIndex = '10000';
                    frame.style.padding = '4px';
                    frame.style.boxShadow = 'none';
                    frame.style.backgroundClip = 'padding-box';

                    const btn = document.createElement('div');
                    btn.className = 'option titleFont';
                    btn.textContent = text;
                    btn.style.whiteSpace = 'nowrap';
                    btn.style.textAlign = 'center';
                    btn.style.cursor = 'pointer';
                    btn.onclick = onClick;

                    frame.appendChild(btn);
                    document.body.appendChild(frame);
                }

                createButton('popAllWrinklersFrame', 'Pop all wrinklers', 6, () => {
                    Game.wrinklers.forEach(w => w.hp > 0 && (w.hp = 0));
                    Game.UpdateWrinklers();
                });

                createButton('popAllGCFrame', 'Pop all GC', 130, () => {
                    let popped = false;
                    Game.shimmer.forEach(s => {
                        if (s.type === "golden" && !s.popped) { s.pop(); popped = true; }
                    });
                    if (popped) PlaySound('snd/tick.mp3');
                });

                // Notification
                if (Game.Notify) Game.Notify('CC Resizer loaded!', '', [16,5], 3);
                console.log('CC Resizer initialized successfully');
            },

            save: () => "",
            load: str => {}
        });
    }

})();
