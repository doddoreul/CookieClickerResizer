// Cookie Clicker CSS Plugin
// Compatible with Cookie Clicker Mod Manager

Game.registerMod("CSS Plugin", {
    init: function() {
        // Create style element for custom CSS
        let styleElement = document.getElementById('customCSSPlugin');
        if (!styleElement) {
            styleElement = document.createElement('style');
            styleElement.id = 'customCSSPlugin';
            document.head.appendChild(styleElement);
        }

        const customCSS = `
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

        `;

        // Apply the custom CSS
        styleElement.textContent = customCSS;

        console.log('CSS Plugin loaded successfully!');
    },

    save: function() {
        // No save data needed for CSS modifications
        return "";
    },

    load: function(str) {
        // No load data needed for CSS modifications
    }
});
