/**
 * i18n.js - Simple internationalization utility
 */

const I18n = (function() {
    let currentLang = 'ko';
    let translations = {};

    // 언어 감지
    function detectLanguage() {
        const saved = localStorage.getItem('language');
        if (saved) {
            return saved;
        }

        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang.startsWith('en')) {
            return 'en';
        }

        return 'ko';
    }

    // 번역 데이터 로드
    async function loadTranslations(lang) {
        try {
            const response = await fetch(`/i18n/${lang}.json`);
            if (!response.ok) throw new Error('Failed to load translations');
            translations = await response.json();
            currentLang = lang;
            localStorage.setItem('language', lang);
            return true;
        } catch (error) {
            console.error('Error loading translations:', error);
            return false;
        }
    }

    // 번역 가져오기
    function t(key) {
        const keys = key.split('.');
        let value = translations;

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = value[k];
            } else {
                return key; // 키를 찾을 수 없으면 키 자체를 반환
            }
        }

        return value;
    }

    // 언어 변경
    async function changeLanguage(lang) {
        const success = await loadTranslations(lang);
        if (success) {
            updatePageContent();
            // 언어 변경 이벤트 발생
            window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
        }
        return success;
    }

    // 페이지 컨텐츠 업데이트
    function updatePageContent() {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = t(key);
            const attrs = element.getAttribute('data-i18n-attr'); // e.g., "title,aria-label"

            if (attrs) {
                attrs.split(',').forEach(attr => {
                    element.setAttribute(attr.trim(), translation);
                });
            } else {
                // Default behavior: update textContent or placeholder (XSS 방어)
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = translation;
                } else {
                    // 안전한 HTML 처리: 번역 데이터는 신뢰할 수 있는 정적 JSON 파일
                    // 사용자 입력이 아니므로 제한된 HTML (<br>, &copy; 등) 허용
                    element.innerHTML = translation;
                }
            }
        });

        // Special handling for document title, as it's in the <head>
        const titleElement = document.querySelector('title[data-i18n]');
        if (titleElement) {
            document.title = t(titleElement.getAttribute('data-i18n'));
        }

        // HTML lang 속성 업데이트
        document.documentElement.lang = currentLang;

        // 언어 토글 버튼 업데이트
        updateLanguageToggle();
    }

    // 언어 토글 버튼 업데이트
    function updateLanguageToggle() {
        const toggle = document.querySelector('.language-toggle');
        if (toggle) {
            toggle.textContent = currentLang === 'ko' ? '🇺🇸 EN' : '🇰🇷 KO';
        }
    }

    // 초기화
    async function init() {
        const lang = detectLanguage();
        await loadTranslations(lang);
        updatePageContent();
    }

    // 현재 언어 가져오기
    function getCurrentLanguage() {
        return currentLang;
    }

    return {
        init,
        t,
        changeLanguage,
        getCurrentLanguage,
        updatePageContent
    };
})();

// 페이지 로드 시 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => I18n.init());
} else {
    I18n.init();
}
