// Function to retrieve the language from the URL parameters
function getLanguage() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang') || 'en'; // Default to English if no parameter is provided
}

// Function to apply the translations based on the chosen language
function translatePage(lang) {
    const translations = {
        en: {
            coffeeWeight: "My Coffee Weighs (g):",
            currentTDS: "Current TDS (%):",
            targetTDS: "Target TDS (%):",
            calculate: "Calculate",
            waterToAdd: "Water to Add (g): --"
        },
        ar: {
            coffeeWeight: "وزن القهوة المحضرة (جرام):",
            currentTDS: "نسبة TDS الحالية (%):",
            targetTDS: "نسبة TDS المستهدفة (%):",
            calculate: "احسب",
            waterToAdd: "الماء المضاف (جرام): --"
        }
    };

    // Update the text content of the page elements based on the selected language
    document.querySelector('label[for="coffeeWeight"]').textContent = translations[lang].coffeeWeight;
    document.querySelector('label[for="currentTDS"]').textContent = translations[lang].currentTDS;
    document.querySelector('label[for="targetTDS"]').textContent = translations[lang].targetTDS;
    document.getElementById('calculate-btn').textContent = translations[lang].calculate;
    document.getElementById('waterToAdd').textContent = translations[lang].waterToAdd;
}

// Apply the correct language translation when the page loads
document.addEventListener('DOMContentLoaded', () => {
    const lang = getLanguage(); // Get the language from the URL
    translatePage(lang); // Apply translations
});
