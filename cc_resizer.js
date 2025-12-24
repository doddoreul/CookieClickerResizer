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
                    right: 285px;
                }
                .separatorRight {
                    right: 298px;
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
                  width: 240px;
                }
                .storeBulkAmount {
                  width: 45px;
                }
                #storeTitle {
                  width: 224px;
                }
            `;

            // Apply the custom CSS
            styleElement.textContent = customCSS;

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
