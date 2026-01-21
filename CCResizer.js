// Cookie Clicker Resizer v1.0
// Compatible with Cookie Clicker Mod Manager

(function() {

    // Wait for Game to be loaded
    if (typeof Game === 'undefined' || !Game.ready) {
        setTimeout(arguments.callee, 100);
        return;
    }

    // Register the mod
    Game.registerMod("CC Resizer", {
        init: function() {
            // Create style element for custom CSS
            let styleElement = document.getElementById('customCSSPlugin');
            if (!styleElement) {
                styleElement = document.createElement('style');
                styleElement.id = 'customCSSPlugin';
                document.head.appendChild(styleElement);
            }

            // Your custom CSS goes here
            const customCSS = `
                /* Custom layout adjustments */
                #sectionLeft {
                    width: 25% !important;
                }
                .separatorLeft {
                    left: 25% !important;
                }
                #sectionMiddle {
                    left: 25% !important;
                    right: 240px !important;
                }
                .separatorRight {
                    right: 240px !important;
                }
                #backgroundLeftCanvas {
                  width: 100% !important;
                  height: 100% !important;
                }
                .storeSection {
                  width: 240px !important;
                }
                .product {
                  width: 240px !important;
                }
                .storeBulkMode {
                  width: 60px !important;
                }
                .storeBulkAmount {
                  width: 45px !important;
                }
                #storeTitle {
                  width: 224px !important;
                }

                #gardenField {
                  width: 350px !important;
                }
                 #gardenPanel {
                   width: 290px !important;
                 }
            `;

            // Apply the custom CSS
            styleElement.textContent = customCSS;

            // Change product names
            const productNames = [
                'Crsr',   // Cursor
                'Gma',   // Grandma
                'Frm',   // Farm
                'Mine',   // Mine
                'Fctry',   // Factory
                'Bank',   // Bank
                'Tmpl',   // Temple
                'Wz T',   // Wizard Tower
                'Shpt',   // Shipment
                'ALab',   // Alchemy Lab
                'Prtl',  // Portal
                'TM',  // Time Machine
                'AC',  // Antimatter Condenser
                'Prsm',  // Prism
                'ChMk',  // Chancemaker
                'FE',  // Fractal Engine
                'JS',  // Javascript Console
                'Idle',  // Idleverse
                'CB',  // Cortex Baker
                'You'   // You
            ];

            // Apply product names
            productNames.forEach((name, index) => {
                const element = document.getElementById('productName' + index);
                if (element) {
                    element.textContent = name;
                }
            });

            // Observer to maintain product names if they get changed by the game
            const observer = new MutationObserver(() => {
                productNames.forEach((name, index) => {
                    const element = document.getElementById('productName' + index);
                    if (element && element.textContent !== name) {
                        element.textContent = name;
                    }
                });
            });

            // Observe each product name element
            productNames.forEach((name, index) => {
                const element = document.getElementById('productName' + index);
                if (element) {
                    observer.observe(element, { childList: true, characterData: true, subtree: true });
                }
            });

            if (Game.mods['Cookie Monster']) {
                console.log('[CC Resizer] Cookie Monster détecté — désactivé');
                return;
            }

            const SUFFIXES = [
                '', 'K', 'M', 'B', 'T',
                'Qa', 'Qi', 'Sx', 'Sp', 'Oc',
                'No', 'Dc',
                'Ud', 'Dd', 'Td', 'QaD', 'QiD', 'SxD', 'SpD', 'OcD', 'NoD',
                'Vg', 'UVg', 'DVg', 'TVg', 'QVg'
            ];

            const SPACE = '\u202F'; //  Add space before

            const _Beautify = Beautify;
            const _BeautifyAll = BeautifyAll;
            const _formatNumber = Game.formatNumber;

            function CMFormat(value, floats = 2, forced = false) {
                if (value === Infinity) return '∞';
                if (isNaN(value)) return '0';

                value = Number(value);

                if (!forced && Math.abs(value) < 1000) {
                    return _Beautify(value, floats, forced);
                }

                let exponent = Math.floor(Math.log10(Math.abs(value)));
                let tier = Math.floor(exponent / 3);

                if (tier <= 0) {
                    return _Beautify(value, floats, forced);
                }

                if (tier >= SUFFIXES.length) {
                    return value.toExponential(2);
                }

                let scale = Math.pow(10, tier * 3);
                let scaled = value / scale;

                let out =
                    scaled >= 100 ? scaled.toFixed(0) :
                    scaled >= 10  ? scaled.toFixed(1) :
                                    scaled.toFixed(2);

                return out + SPACE + SUFFIXES[tier];
            }

            Beautify = CMFormat;
            BeautifyAll = CMFormat;

            Game.formatNumber = function (value) {
                return CMFormat(value);
            };

            // Notification
            if (typeof Game.Notify !== 'undefined') {
                Game.Notify('CSS Plugin loaded!', 'CC Resizer', [16, 5], 3);
            }

            console.log('CSS Plugin initialized successfully');
        },

        save: function() {
            return "";
        },

        load: function(str) {
            // No load needed
        }
    });

})();
