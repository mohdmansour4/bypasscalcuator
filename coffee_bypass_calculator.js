// Function to apply the translations based on the chosen language
function translateBypassPage(lang) {
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
            currentTDS: "نسبة التركيز الحالية TDS%:",
            targetTDS: "نسبة التركيز المطلوبة TDS%:",
            calculate: "إحسب",
            waterToAdd: "الماء المطلوب إضافته (جرام): --"
        }
    };

    // Update the text content of the page elements based on the selected language
    document.querySelector('label[for="coffeeWeight"]').textContent = translations[lang].coffeeWeight;
    document.querySelector('label[for="currentTDS"]').textContent = translations[lang].currentTDS;
    document.querySelector('label[for="targetTDS"]').textContent = translations[lang].targetTDS;
    document.getElementById('calculate-btn').textContent = translations[lang].calculate;
    document.getElementById('waterToAdd').textContent = translations[lang].waterToAdd;

    // Set the page direction for RTL or LTR
    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

// Listen for external commands to switch languages from Carrd
window.addEventListener("message", (event) => {
    console.log("Received message:", event.data); // For debugging
    if (event.data === "switch-to-arabic") {
        translateBypassPage('ar');
    } else if (event.data === "switch-to-english") {
        translateBypassPage('en');
    }
});

// Apply the correct language translation when the page loads based on URL parameter (optional)
document.addEventListener('DOMContentLoaded', () => {
    const lang = getLanguage(); // Get the language from the URL
    translateBypassPage(lang);

    // Attach the calculate button's event listener
    document.getElementById('calculate-btn').addEventListener('click', performCalculation);
});

// Function to detect language via URL parameters (if needed)
function getLanguage() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang') || 'en'; // Default to English
}

// Function to handle the calculation logic
function performCalculation() {
    const coffeeWeight = parseFloat(document.getElementById('coffeeWeight').value);
    const currentTDS = parseFloat(document.getElementById('currentTDS').value);
    const targetTDS = parseFloat(document.getElementById('targetTDS').value);

    if (isNaN(coffeeWeight) || isNaN(currentTDS) || isNaN(targetTDS)) {
        alert("Please enter valid values for all inputs.");
        return;
    }

    // Calculation logic
    const waterToAdd = coffeeWeight * ((currentTDS - targetTDS) / targetTDS);
    const resultText = waterToAdd > 0 ? `Water to Add (g): ${waterToAdd.toFixed(2)}` : "No water needed.";

    // Display the result
    document.getElementById('waterToAdd').textContent = resultText;
}
