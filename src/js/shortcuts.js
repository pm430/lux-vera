import $ from 'jquery';
import Utils from './utils.js';

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

export default KeyboardShortcuts;
