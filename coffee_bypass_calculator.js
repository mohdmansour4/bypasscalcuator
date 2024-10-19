<script>
  function getLanguage() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang') || 'en'; // Default to English
  }

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
        coffeeWeight: "وزن القهوةالمحضرة (جرام):",
        currentTDS: "نسبة TDS الحالية (%):",
        targetTDS: "نسبة TDS المستهدفة (%):",
        calculate: "احسب",
        waterToAdd: "الماء المضاف (جرام): --"
      }
    };

    document.querySelector('label[for="coffeeWeight"]').textContent = translations[lang].coffeeWeight;
    document.querySelector('label[for="currentTDS"]').textContent = translations[lang].currentTDS;
    document.querySelector('label[for="targetTDS"]').textContent = translations[lang].targetTDS;
    document.getElementById('calculate-btn').textContent = translations[lang].calculate;
    document.getElementById('waterToAdd').textContent = translations[lang].waterToAdd;
  }

  // Load the correct language when the page loads
  document.addEventListener('DOMContentLoaded', () => {
    const lang = getLanguage();
    translatePage(lang);
  });
</script>
