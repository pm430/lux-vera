import $ from 'jquery';
import '../css/style.css';
import ThemeManager from './theme.js';
import KeyboardShortcuts from './shortcuts.js';
import I18n from './i18n.js';
import ShareUtils from './share.js';
import Utils from './utils.js';

// 1. Make jQuery and Utils globally available for inline scripts and legacy code
window.$ = $;
window.jQuery = $;
window.Utils = Utils;
window.ShareUtils = ShareUtils;

// 2. Define global functions
window.toggleLanguage = () => {
    const currentLang = I18n.getCurrentLanguage();
    const newLang = currentLang === 'ko' ? 'en' : 'ko';
    I18n.changeLanguage(newLang).then(() => {
        const message = newLang === 'ko' ? '한국어로 변경되었습니다' : 'Changed to English';
        Utils.toast(message);
    });
};

window.clearAll = () => {
    Utils.clearAllInputs();
};

window.copyResult = () => {
    const outputTextarea = $('textarea[readonly]').first();
    if (outputTextarea.length > 0 && outputTextarea.val()) {
        Utils.copyResultText(outputTextarea);
    } else {
        const resultBox = $('.result-box').first();
        if (resultBox.length > 0 && resultBox.text()) {
            Utils.copyResultText(resultBox);
        } else {
            Utils.toast('복사할 결과가 없습니다.', 'error');
        }
    }
};


// 3. Initialize modules on document ready
$(document).ready(function() {
    ThemeManager.init();
    KeyboardShortcuts.init();
    I18n.init();
});