const ThemeManager = {
    init: function() {
        // 토글 버튼 아이콘 초기화 및 이벤트 핸들러 연결
        const toggleBtn = document.querySelector('.theme-toggle');
        if (toggleBtn) {
            this.updateToggleIcon();
            toggleBtn.addEventListener('click', () => this.toggle());
        }

        // 시스템 테마 변경 감지
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
            // 사용자가 수동으로 테마를 설정하지 않은 경우에만 시스템 설정을 따름
            try {
                if (!localStorage.getItem('theme')) {
                    const newTheme = e.matches ? 'dark' : 'light';
                    document.documentElement.setAttribute('data-theme', newTheme);
                    this.updateToggleIcon();
                }
            } catch (error) {
                console.warn('localStorage unavailable:', error);
            }
        });
    },

    toggle: function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', newTheme);
        try {
            localStorage.setItem('theme', newTheme);
        } catch (error) {
            console.warn('localStorage unavailable:', error);
        }
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

export default ThemeManager;
