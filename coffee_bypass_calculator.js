// Translations
const translations = {
    en: {
        coffeeWeight: "My Coffee Weighs (g):",
        currentTDS: "Current TDS (%):",
        targetTDS: "Target TDS (%):",
        calculate: "Calculate",
        waterToAdd: "Water to Add (g): --",
        copied: "Results copied to clipboard!",
        invalidInput: "Please enter valid values",
        calculating: "Calculating...",
        noWaterNeeded: "No water needed.",
        reset: "Calculator reset",
        outOfRange: "Value out of allowed range"
    },
    ar: {
        coffeeWeight: "وزن القهوة المحضرة (جرام):",
        currentTDS: "نسبة التركيز الحالية TDS%:",
        targetTDS: "نسبة التركيز المطلوبة TDS%:",
        calculate: "إحسب",
        waterToAdd: "الماء المطلوب إضافته (جرام): --",
        copied: "تم نسخ النتائج!",
        invalidInput: "الرجاء إدخال قيم صحيحة",
        calculating: "جاري الحساب...",
        noWaterNeeded: "لا حاجة للماء",
        reset: "تم إعادة تعيين الحاسبة",
        outOfRange: "القيمة خارج النطاق المسموح به"
    }
};

let currentLang = 'en';

function formatNumber(value, step) {
    // If step is 1 (integer), return whole number, else return with 2 decimal places
    return step === 1 ? Math.round(value) : Number(value.toFixed(2));
}

function showToast(message, duration = 3000) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), duration);
}

function validateInput(input) {
    const value = parseFloat(input.value);
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    
    if (isNaN(value) || value < min || (max && value > max)) {
        input.closest('.stepper').classList.add('invalid');
        showToast(translations[currentLang].outOfRange);
        return false;
    }
    input.closest('.stepper').classList.remove('invalid');
    return true;
}

function setupStepperButtons() {
    document.querySelectorAll('.stepper-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const input = button.parentElement.querySelector('input');
            const step = parseFloat(input.getAttribute('step')) || 1;
            const currentValue = parseFloat(input.value || 0);
            
            let newValue;
            if (button.classList.contains('plus')) {
                newValue = currentValue + step;
                if (!input.max || newValue <= parseFloat(input.max)) {
                    input.value = formatNumber(newValue, step);
                }
            } else {
                newValue = currentValue - step;
                if (!input.min || newValue >= parseFloat(input.min)) {
                    input.value = formatNumber(newValue, step);
                }
            }
            
            input.dispatchEvent(new Event('input'));
            validateInput(input);
        });
    });
}

function saveValues() {
    const values = {};
    document.querySelectorAll('input[type="number"]').forEach(input => {
        values[input.id] = input.value;
    });
    localStorage.setItem('bypassCalculatorValues', JSON.stringify(values));
}

function loadSavedValues() {
    const saved = localStorage.getItem('bypassCalculatorValues');
    if (saved) {
        const values = JSON.parse(saved);
        Object.entries(values).forEach(([id, value]) => {
            const input = document.getElementById(id);
            if (input) {
                const step = parseFloat(input.getAttribute('step')) || 1;
                input.value = formatNumber(parseFloat(value), step);
                validateInput(input);
            }
        });
    }
}

function resetCalculator() {
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.value = '';
        input.closest('.stepper').classList.remove('invalid');
    });
    document.getElementById('waterToAdd').textContent = translations[currentLang].waterToAdd;
    localStorage.removeItem('bypassCalculatorValues');
    showToast(translations[currentLang].reset);
}

function copyResults() {
    const resultText = document.getElementById('waterToAdd').textContent;
    navigator.clipboard.writeText(resultText).then(() => {
        showToast(translations[currentLang].copied);
    });
}

function showCalculating() {
    const button = document.getElementById('calculate-btn');
    const originalText = button.textContent;
    button.textContent = translations[currentLang].calculating;
    button.disabled = true;

    setTimeout(() => {
        performCalculation();
        button.textContent = originalText;
        button.disabled = false;
    }, 300);
}

function performCalculation() {
    const inputs = ['coffeeWeight', 'currentTDS', 'targetTDS'].map(id => {
        const input = document.getElementById(id);
        if (!validateInput(input)) return null;
        return parseFloat(input.value);
    });

    if (inputs.some(val => val === null)) {
        showToast(translations[currentLang].invalidInput);
        return;
    }

    const [coffeeWeight, currentTDS, targetTDS] = inputs;
    const waterToAdd = coffeeWeight * ((currentTDS - targetTDS) / targetTDS);

    const resultElement = document.getElementById('waterToAdd');
    const resultText = waterToAdd > 0 
        ? `${translations[currentLang].waterToAdd.split(':')[0]}: ${waterToAdd.toFixed(2)}`
        : translations[currentLang].noWaterNeeded;
    
    resultElement.textContent = resultText;
    resultElement.classList.add('changed');
    setTimeout(() => resultElement.classList.remove('changed'), 500);

    saveValues();
}

function setupKeyboardNavigation() {
    document.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('keydown', (e) => {
            const step = parseFloat(input.getAttribute('step')) || 1;
            const currentValue = parseFloat(input.value || 0);
            
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                const newValue = currentValue + step;
                if (!input.max || newValue <= parseFloat(input.max)) {
                    input.value = formatNumber(newValue, step);
                    input.dispatchEvent(new Event('input'));
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                const newValue = currentValue - step;
                if (!input.min || newValue >= parseFloat(input.min)) {
                    input.value = formatNumber(newValue, step);
                    input.dispatchEvent(new Event('input'));
                }
            }
        });
    });
}

function translateBypassPage(lang) {
    currentLang = lang;
    const trans = translations[lang];

    document.querySelector('label[for="coffeeWeight"]').textContent = trans.coffeeWeight;
    document.querySelector('label[for="currentTDS"]').textContent = trans.currentTDS;
    document.querySelector('label[for="targetTDS"]').textContent = trans.targetTDS;
    document.getElementById('calculate-btn').textContent = trans.calculate;
    
    const waterToAddEl = document.getElementById('waterToAdd');
    if (waterToAddEl.textContent === translations[lang === 'en' ? 'ar' : 'en'].waterToAdd) {
        waterToAddEl.textContent = trans.waterToAdd;
    }

    document.body.dir = lang === 'ar' ? 'rtl' : 'ltr';
}

window.addEventListener("message", (event) => {
    if (event.data === "switch-to-arabic") {
        translateBypassPage('ar');
    } else if (event.data === "switch-to-english") {
        translateBypassPage('en');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    setupStepperButtons();
    loadSavedValues();
    setupKeyboardNavigation();
    translateBypassPage(getLanguage());

    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            validateInput(input);
            saveValues();
        });
    });
});

function getLanguage() {
    const params = new URLSearchParams(window.location.search);
    return params.get('lang') || 'en';
}
