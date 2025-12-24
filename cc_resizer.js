// Cookie Clicker CSS Plugin
// A blank template for custom CSS modifications

(function() {
    'use strict';

    // Check if Cookie Clicker is loaded
    if (typeof Game === 'undefined') {
        console.warn('Cookie Clicker not detected! Make sure you are on the game page.');
        return;
    }

    // Create style element for custom CSS
    let styleElement = document.getElementById('customCSSPlugin');
    if (!styleElement) {
        styleElement = document.createElement('style');
        styleElement.id = 'customCSSPlugin';
        document.head.appendChild(styleElement);
    }

    // Your custom CSS goes here
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

    console.log('Plugin loaded successfully!');

})();
