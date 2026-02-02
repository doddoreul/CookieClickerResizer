(function () {

    // =====================
    // Wait for game
    // =====================
    const waitForGame = () => {
        if (!window.Game || !Game.ready) {
            setTimeout(waitForGame, 50);
            return;
        }
        initMod();
    };
    waitForGame();

    function initMod() {
        Game.registerMod("CC Resizer", {
            init() {

                // =====================
                // CSS (1 injection only)
                // =====================
                let styleEl = document.getElementById('customCSSPlugin');
                if (!styleEl) {
                    styleEl = document.createElement('style');
                    styleEl.id = 'customCSSPlugin';
                    document.head.appendChild(styleEl);
                }
                styleEl.textContent =
                    '#sectionLeft{width:25%!important}' +
                    '.separatorLeft{left:25%!important}' +
                    '#sectionMiddle{left:25%!important;right:240px!important}' +
                    '.separatorRight{right:240px!important}' +
                    '#backgroundLeftCanvas{width:100%!important;height:100%!important}' +
                    '.storeSection,.product{width:240px!important}' +
                    '.storeBulkMode{width:60px!important}' +
                    '.storeBulkAmount{width:45px!important}' +
                    '#storeTitle{width:224px!important}' +
                    '#gardenField{width:350px!important}' +
                    '#gardenPanel{width:290px!important}';

                // =====================
                // Building names (no MutationObserver spam)
                // =====================
                const productNames = [
                    'Crsr','Gma','Frm','Mine','Fctry','Bank','Tmpl','Wz T','Shpt',
                    'ALab','Prtl','TM','AC','Prsm','ChMk','FE','JS','Idle','CB','You'
                ];

                const updateNames = () => {
                    for (let i = 0; i < productNames.length; i++) {
                        const el = document.getElementById('productName' + i);
                        if (el && el.textContent !== productNames[i]) {
                            el.textContent = productNames[i];
                        }
                    }
                };
                
                updateNames();
                
                // refresh très léger (2x/sec)
                setInterval(updateNames, 500);

                // =====================
                // Number formatting (fast + safe)
                // =====================
                const SUFFIXES = [
                    '', 'K','M','B','T','Qa','Qi','Sx','Sp','Oc','No','De',
                    'UDe','DDe','TDe','QaDe','QiDe','SxDe','SpDe','ODe','NDe',
                    'Vi','UVi','DVi','TVi','QaVi','QiVi','SxVi'
                ];
                const POWERS = SUFFIXES.map((_, i) => 10 ** (i * 3));
                const SPACE = '\u202F';
                const _Beautify = Beautify;
                const LOG1000 = Math.log(1000);

                function CMFormat(value, floats = 2, forced = false) {
                    if (!isFinite(value)) return value === Infinity ? '∞' : '0';

                    const abs = value < 0 ? -value : value;
                    if (!forced && abs < 1000) return _Beautify(value, floats, forced);

                    let tier = (Math.log(abs) / LOG1000) | 0;
                    if (tier <= 0) return _Beautify(value, floats, forced);
                    if (tier >= SUFFIXES.length) return value.toExponential(2);

                    const scaled = value / POWERS[tier];
                    return (
                        (scaled >= 100 ? scaled.toFixed(0) :
                         scaled >= 10  ? scaled.toFixed(1) :
                                        scaled.toFixed(2))
                        + SPACE + SUFFIXES[tier]
                    );
                }

                Beautify = BeautifyAll = Game.formatNumber = CMFormat;

                // =====================
                // UI buttons (shared builder)
                // =====================
                const createButton = (id, text, left, handler) => {
                    if (document.getElementById(id)) return;

                    const frame = document.createElement('div');
                    frame.id = id;
                    frame.className = 'framed';
                    frame.style.cssText =
                        'position:fixed;bottom:30px;z-index:10000;' +
                        'padding:4px;box-shadow:none;background-clip:padding-box;' +
                        'left:' + left + 'px';

                    const btn = document.createElement('div');
                    btn.className = 'option titleFont';
                    btn.textContent = text;
                    btn.style.cssText = 'white-space:nowrap;text-align:center;cursor:pointer';
                    btn.onclick = handler;

                    frame.appendChild(btn);
                    document.body.appendChild(frame);
                };

                createButton('popAllWrinklersFrame', 'Pop all wrinklers', 6, () => {
                    const w = Game.wrinklers;
                    for (let i = 0; i < w.length; i++) if (w[i].hp > 0) w[i].hp = 0;
                    Game.UpdateWrinklers();
                });

                createButton('popAllGCFrame', 'Pop all GC', 130, () => {
                    let popped = false;
                    Game.shimmer.forEach(s => {
                        if (s.type === 'golden' && !s.popped) {
                            s.pop();
                            popped = true;
                        }
                    });
                    if (popped) PlaySound('snd/tick.mp3');
                });

                // =====================
                // Spacebar autoclick (10 CPS, zero spam)
                // =====================
                let clickTimer = 0;

                const startClick = () => {
                    if (clickTimer) return;
                    clickTimer = setInterval(Game.ClickCookie, 100);
                };

                const stopClick = () => {
                    clearInterval(clickTimer);
                    clickTimer = 0;
                };

                document.addEventListener('keydown', e => {
                    if (e.code === 'Space' && !clickTimer) {
                        startClick();
                        e.preventDefault();
                    }
                }, { passive: false });

                document.addEventListener('keyup', e => {
                    if (e.code === 'Space') {
                        stopClick();
                        e.preventDefault();
                    }
                }, { passive: false });
                
                // Prevent bulk-buy partial
                Game.ClickProduct=function(what){ 
                    if ( Game.ObjectsById[what].bulkPrice <= Game.cookies || Game.buyMode === -1) { 
                        Game.ObjectsById[what].buy(); 
                    }
                }
                // =====================
                // Notify
                // =====================
                Game.Notify?.('CC Resizer loaded!', '', [16, 5], 3);
                console.log('CC Resizer fully optimized');

                // Disable notifications
                Game.Notify = function () {};
            },

            save: () => '',
            load: () => {}
        });
    }

})();
