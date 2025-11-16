import $ from 'jquery';

const Utils = {
    // 토스트 알림 표시
    toast: function(message, type = 'info') {
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
                this.toast('클립보드에 복사되었습니다!', 'success');
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
            this.toast('클립보드에 복사되었습니다!', 'success');
        } catch (err) {
            this.toast('복사에 실패했습니다.', 'error');
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
            this.toast('복사할 결과가 없습니다.', 'error');
        }
    }
};

export default Utils;
