// 환경변수 중앙 관리
export const config = {
    // Google Analytics ID
    gaId: import.meta.env.VITE_GA_ID || 'G-41EYC7QS6F',

    // Buy Me a Coffee ID
    bmcId: import.meta.env.VITE_BMC_ID || 'pm430',

    // Base URL
    baseUrl: import.meta.env.BASE_URL || '/',

    // Environment
    isDev: import.meta.env.DEV,
    isProd: import.meta.env.PROD,
    mode: import.meta.env.MODE
};

export default config;
