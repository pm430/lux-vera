import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/lux-vera/',
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        answers: resolve(__dirname, 'answers/index.html'),
        bible: resolve(__dirname, 'bible/index.html'),
        dev_base64: resolve(__dirname, 'dev/base64.html'),
        dev_hash_generator: resolve(__dirname, 'dev/hash-generator.html'),
        dev_main: resolve(__dirname, 'dev/index.html'),
        dev_json_formatter: resolve(__dirname, 'dev/json-formatter.html'),
        dev_regex_tester: resolve(__dirname, 'dev/regex-tester.html'),
        dev_timestamp: resolve(__dirname, 'dev/timestamp.html'),
        dev_url_encoder: resolve(__dirname, 'dev/url-encoder.html'),
        focus_timer: resolve(__dirname, 'focus-timer/index.html'),
        lotto: resolve(__dirname, 'lotto/index.html'),
        lunch: resolve(__dirname, 'lunch/index.html'),
      },
      output: {
        manualChunks: (id) => {
          // vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('jquery')) {
              return 'vendor-jquery';
            }
            if (id.includes('crypto-js')) {
              return 'vendor-crypto';
            }
            return 'vendor';
          }
          
          // i18n chunk (separate large i18n bundle)
          if (id.includes('i18n.js') || id.includes('i18n/')) {
            return 'i18n';
          }
          
          // path-utils chunk
          if (id.includes('path-utils.js')) {
            return 'utils';
          }
        },
      },
    },
    // 빌드 최적화
    minify: 'esbuild',
    sourcemap: false,
    // 청크 크기 최적화
    chunkSizeWarningLimit: 1000,
  },
});
