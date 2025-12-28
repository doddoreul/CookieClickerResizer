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
                    width: 25%;
                }
                .separatorLeft {
                    left: 25%;
                }
                #sectionMiddle {
                    left: 25%;
                    right: 240px;
                }
                .separatorRight {
                    right: 240px !important;
                }
                #backgroundLeftCanvas {
                  width: 100% !important;
                  height: 100% !important;
                }
                .storeSection {
                  width: 240px;
                }
                .product {
                  width: 240px;
                }
                .storeBulkMode {
                  width: 60px;
                }
                .storeBulkAmount {
                  width: 45px;
                }
                #storeTitle {
                  width: 224px !important;
                }

                #gardenField {
                  width: 350px !important;
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

            // Notification
            if (typeof Game.Notify !== 'undefined') {
                Game.Notify('CSS Plugin loaded!', 'Custom styles applied', [16, 5], 3);
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
