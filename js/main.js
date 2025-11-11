// ==================== //
//   유틸리티 함수들     //
// ==================== //

const Utils = {
    // 토스트 알림 표시
    showToast: function(message, type = 'info') {
        // 토스트 컨테이너가 없으면 생성
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        // 토스트 생성
        const toast = document.createElement('div');
        toast.className = `toast ${type ? 'toast-' + type : ''}`;
        toast.textContent = message;
        container.appendChild(toast);

        // 3초 후 제거
        setTimeout(() => {
            toast.classList.add('toast-hiding');
            setTimeout(() => {
                container.removeChild(toast);
                if (container.children.length === 0) {
                    document.body.removeChild(container);
                }
            }, 300);
        }, 3000);
    },

    // 로딩 오버레이
    loadingOverlay: null,
    showLoading: function() {
        if (!this.loadingOverlay) {
            this.loadingOverlay = document.createElement('div');
            this.loadingOverlay.className = 'loading-overlay';
            this.loadingOverlay.innerHTML = '<div class="spinner"></div>';
            document.body.appendChild(this.loadingOverlay);
        }
        setTimeout(() => this.loadingOverlay.classList.add('active'), 10);
    },

    hideLoading: function() {
        if (this.loadingOverlay) {
            this.loadingOverlay.classList.remove('active');
        }
    },

    // 클립보드에 복사
    copyToClipboard: function(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                this.showToast('클립보드에 복사되었습니다!', 'success');
            }).catch(() => {
                this.fallbackCopy(text);
            });
        } else {
            this.fallbackCopy(text);
        }
    },

    fallbackCopy: function(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            this.showToast('클립보드에 복사되었습니다!', 'success');
        } catch (err) {
            this.showToast('복사에 실패했습니다.', 'error');
        }
        document.body.removeChild(textarea);
    },

    // 에러 표시
    showError: function(element, message) {
        $(element).addClass('error').removeClass('success').text(message);
    },

    // 성공 표시
    showSuccess: function(element, message) {
        $(element).addClass('success').removeClass('error').text(message);
    },

    // 결과 표시
    showResult: function(element, content) {
        $(element).removeClass('error success').text(content);
    },

    // 공통 초기화 함수
    clearAllInputs: function() {
        $('textarea, input[type="text"], input[type="number"]').val('');
        $('.result-box').hide();
        $('#message').hide();
    },

    // 공통 결과 복사 함수
    copyResultText: function(selector) {
        const result = $(selector).val() || $(selector).text();
        if (result) {
            this.copyToClipboard(result);
        } else {
            this.showToast('복사할 결과가 없습니다.', 'error');
        }
    }
};

// ==================== //
//   다크모드 토글       //
// ==================== //

const ThemeManager = {
    init: function() {
        // 저장된 테마 불러오기 또는 시스템 설정 따르기
        const savedTheme = localStorage.getItem('theme');
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        if (savedTheme) {
            document.documentElement.setAttribute('data-theme', savedTheme);
        } else if (prefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }

        // 토글 버튼 이벤트
        const toggleBtn = document.querySelector('.theme-toggle');
        if (toggleBtn) {
            this.updateToggleIcon();
            toggleBtn.addEventListener('click', () => this.toggle());
        }

        // 시스템 테마 변경 감지
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            if (!localStorage.getItem('theme')) {
                document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'light');
                this.updateToggleIcon();
            }
        });
    },

    toggle: function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        this.updateToggleIcon();
    },

    updateToggleIcon: function() {
        const toggleBtn = document.querySelector('.theme-toggle');
        if (toggleBtn) {
            const theme = document.documentElement.getAttribute('data-theme');
            toggleBtn.textContent = theme === 'dark' ? '☀️' : '🌙';
        }
    }
};

// ==================== //
//   키보드 단축키       //
// ==================== //

const KeyboardShortcuts = {
    init: function() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + Enter: 메인 실행 버튼 클릭
            if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault();
                const actionBtn = document.querySelector('.btn-action');
                if (actionBtn) actionBtn.click();
            }

            // Ctrl/Cmd + K: 초기화
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                if (typeof clearAll === 'function') {
                    clearAll();
                } else {
                    Utils.clearAllInputs();
                }
            }

            // Escape: 메시지 닫기
            if (e.key === 'Escape') {
                $('.result-box').hide();
                $('#message').hide();
            }
        });
    }
};

// ==================== //
//   페이지 로드 시 초기화 //
// ==================== //

$(document).ready(function() {
    // 다크모드 초기화
    ThemeManager.init();

    // 키보드 단축키 초기화
    KeyboardShortcuts.init();
});

// ==================== //
//   전역 공통 함수      //
// ==================== //

// 많은 페이지에서 사용되는 공통 함수들
function clearAll() {
    Utils.clearAllInputs();
}

function copyResult() {
    // 첫 번째 textarea 결과 또는 result-box를 찾아서 복사
    const outputTextarea = $('textarea[readonly]').first();
    if (outputTextarea.length > 0) {
        Utils.copyResultText(outputTextarea);
    } else {
        const resultBox = $('.result-box').first();
        if (resultBox.length > 0) {
            Utils.copyResultText(resultBox);
        }
    }
}

// 후원 링크 열기 (레거시 지원)
function openSponsor(type) {
    const links = {
        toss: 'https://toss.me/yourusername',
        kakaopay: 'https://qr.kakaopay.com/yourid',
        github: 'https://github.com/sponsors/yourusername'
    };

    if (links[type]) {
        window.open(links[type], '_blank');
    } else {
        Utils.showToast('준비 중입니다!', 'info');
    }
}
