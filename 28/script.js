// ========================================
// 1. ДАННЫЕ
// ========================================

// Настройки по умолчанию
const defaultSettings = {
    bgColor: '#6c5ce7',
    textColor: '#ffffff',
    fontFamily: 'Arial, sans-serif',
    fontSize: 20,
    padding: 20,
    margin: 10,
    borderRadius: 10
};

let settings = { ...defaultSettings };

// ========================================
// 2. DOM ЭЛЕМЕНТЫ
// ========================================

const previewBlock = document.getElementById('previewBlock');
const cssCode = document.getElementById('cssCode');

const bgColor = document.getElementById('bgColor');
const textColor = document.getElementById('textColor');
const fontFamily = document.getElementById('fontFamily');
const fontSize = document.getElementById('fontSize');
const fontSizeDisplay = document.getElementById('fontSizeDisplay');
const padding = document.getElementById('padding');
const paddingDisplay = document.getElementById('paddingDisplay');
const margin = document.getElementById('margin');
const marginDisplay = document.getElementById('marginDisplay');
const borderRadius = document.getElementById('borderRadius');
const borderRadiusDisplay = document.getElementById('borderRadiusDisplay');
const copyBtn = document.getElementById('copyBtn');

// ========================================
// 3. LOCALSTORAGE
// ========================================

function loadSettings() {
    try {
        const saved = localStorage.getItem('cssEditorSettings');
        if (saved) {
            const parsed = JSON.parse(saved);
            settings = { ...defaultSettings, ...parsed };
            return true;
        }
    } catch (e) {
        console.error('Ошибка загрузки:', e);
    }
    return false;
}

function saveSettings() {
    try {
        localStorage.setItem('cssEditorSettings', JSON.stringify(settings));
    } catch (e) {
        console.error('Ошибка сохранения:', e);
    }
}

// ========================================
// 4. ПРИМЕНЕНИЕ НАСТРОЕК
// ========================================

function applySettings() {
    // Применяем стили к блоку
    previewBlock.style.backgroundColor = settings.bgColor;
    previewBlock.style.color = settings.textColor;
    previewBlock.style.fontFamily = settings.fontFamily;
    previewBlock.style.fontSize = settings.fontSize + 'px';
    previewBlock.style.padding = settings.padding + 'px';
    previewBlock.style.margin = settings.margin + 'px';
    previewBlock.style.borderRadius = settings.borderRadius + 'px';
    previewBlock.style.transition = 'all 0.3s ease';

    // Обновляем значения на панели
    bgColor.value = settings.bgColor;
    textColor.value = settings.textColor;
    fontFamily.value = settings.fontFamily;
    fontSize.value = settings.fontSize;
    fontSizeDisplay.textContent = settings.fontSize + 'px';
    padding.value = settings.padding;
    paddingDisplay.textContent = settings.padding + 'px';
    margin.value = settings.margin;
    marginDisplay.textContent = settings.margin + 'px';
    borderRadius.value = settings.borderRadius;
    borderRadiusDisplay.textContent = settings.borderRadius + 'px';

    // Обновляем CSS-код
    generateCSS();

    // Сохраняем
    saveSettings();
}

// ========================================
// 5. ГЕНЕРАЦИЯ CSS-КОДА
// ========================================

function generateCSS() {
    const css = `.preview-block {\n` +
        `  background-color: ${settings.bgColor};\n` +
        `  color: ${settings.textColor};\n` +
        `  font-family: ${settings.fontFamily};\n` +
        `  font-size: ${settings.fontSize}px;\n` +
        `  padding: ${settings.padding}px;\n` +
        `  margin: ${settings.margin}px;\n` +
        `  border-radius: ${settings.borderRadius}px;\n` +
        `  transition: all 0.3s ease;\n` +
        `}`;

    cssCode.textContent = css;
}

// ========================================
// 6. ОБНОВЛЕНИЕ НАСТРОЕК
// ========================================

function updateSetting(key, value) {
    settings[key] = value;
    applySettings();
}

// ========================================
// 7. КОПИРОВАНИЕ КОДА
// ========================================

function copyCSS() {
    const code = cssCode.textContent;
    navigator.clipboard.writeText(code)
        .then(() => {
            copyBtn.textContent = '✅ Скопировано!';
            setTimeout(() => {
                copyBtn.textContent = '📋 Копировать код';
            }, 2000);
        })
        .catch(() => {
            // Fallback для старых браузеров
            const textarea = document.createElement('textarea');
            textarea.value = code;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            copyBtn.textContent = '✅ Скопировано!';
            setTimeout(() => {
                copyBtn.textContent = '📋 Копировать код';
            }, 2000);
        });
}

// ========================================
// 8. ИНИЦИАЛИЗАЦИЯ
// ========================================

function init() {
    console.log('🎨 Визуальный редактор CSS');

    // Загружаем сохранённые настройки
    loadSettings();

    // Применяем настройки
    applySettings();

    console.log('📊 Текущие настройки:', settings);

    // ===== ОБРАБОТЧИКИ =====

    // Цвет фона
    bgColor.addEventListener('input', function() {
        updateSetting('bgColor', this.value);
    });

    // Цвет текста
    textColor.addEventListener('input', function() {
        updateSetting('textColor', this.value);
    });

    // Шрифт
    fontFamily.addEventListener('change', function() {
        updateSetting('fontFamily', this.value);
    });

    // Размер шрифта
    fontSize.addEventListener('input', function() {
        const val = parseInt(this.value);
        fontSizeDisplay.textContent = val + 'px';
        updateSetting('fontSize', val);
    });

    // Внутренний отступ
    padding.addEventListener('input', function() {
        const val = parseInt(this.value);
        paddingDisplay.textContent = val + 'px';
        updateSetting('padding', val);
    });

    // Внешний отступ
    margin.addEventListener('input', function() {
        const val = parseInt(this.value);
        marginDisplay.textContent = val + 'px';
        updateSetting('margin', val);
    });

    // Скругление углов
    borderRadius.addEventListener('input', function() {
        const val = parseInt(this.value);
        borderRadiusDisplay.textContent = val + 'px';
        updateSetting('borderRadius', val);
    });

    // Копирование кода
    copyBtn.addEventListener('click', copyCSS);

    console.log('✅ Редактор CSS готов!');
}

// ========================================
// 9. ЗАПУСК
// ========================================

document.addEventListener('DOMContentLoaded', init);