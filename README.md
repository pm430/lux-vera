# Lux Vera - 당신의 일상을 위한 유용한 도구들

[![CI](https://github.com/pm430/lux-vera/actions/workflows/ci.yml/badge.svg)](https://github.com/pm430/lux-vera/actions/workflows/ci.yml)

Lux Vera는 일상생활과 개발 작업에 유용한 다양한 웹 기반 도구들을 모아놓은 사이트입니다. 광고 없이 무료로 제공되며, 빠르고 직관적인 사용자 경험을 제공합니다.

## ✨ 주요 기능

- **로또 번호 생성기**
- **하루 한구절 성경**
- **점심 메뉴 선택기**
- **내 인생의 해답**
- **집중 타이머**
- **개발자 도구**: JSON 포맷터, Base64 인코더, 타임스탬프 변환기, URL 인코더, 정규식 테스터, 해시 생성기 등

## 🚀 시작하기

이 프로젝트는 [Vite](https://vitejs.dev/)로 빌드되며, GitHub Pages 배포를 염두에 둔 설정을 포함합니다.

### 개발 환경 설정

1. 저장소를 클론합니다:

```bash
git clone https://github.com/pm430/lux-vera.git
cd lux-vera-site
```

2. 의존성을 설치합니다:

```bash
npm ci
```

3. 개발 서버를 시작합니다:

```bash
npm run dev
```

브라우저에서 `http://localhost:5173` (또는 Vite가 지정한 포트)로 접속하여 개발 중인 사이트를 확인할 수 있습니다.

### 프로덕션 빌드

프로덕션 빌드는 다음으로 생성합니다:

```bash
npm run build
```

빌드된 파일은 `dist/` 디렉토리에 생성됩니다.

- 다른 `base` 경로로 빌드해야 할 경우(예: 서브디렉터리) `--base` 옵션을 사용합니다:

```bash
npm run build -- --base /your-base-path/
```

### 정적 자원 규칙 (중요)

- 정적 데이터(예: `answers.json`, `verses.json`)는 **항상** `public/` 하위에 두세요. Vite는 `public/`의 파일을 빌드 시 그대로 복사합니다.
- 페이지별 폴더(`answers/`, `bible/` 등)에 동일한 JSON을 중복으로 두면 빌드/배포 시 혼란이 발생할 수 있으니 피하세요. 이 레포에서는 `public/answers/answers.json` 및 `public/bible/verses.json`이 canonical copies입니다.

### GitHub Pages 배포

`gh-pages` 패키지를 사용하여 `dist` 내용 전체를 `gh-pages` 브랜치로 푸시할 수 있습니다:

```bash
npm run deploy
```

참고:
- 현재 `vite.config.js`는 개발 모드(`mode === 'development'`)에서 `base = '/'`를 사용하고, 프로덕션 기본값으로 `/lux-vera/`를 사용하도록 구성되어 있습니다. GitHub Pages에 다른 경로로 배포하려면 `--base`로 오버라이드하세요.

## 🎨 커스터마이징

### 새로운 페이지 추가

1. `public/` 또는 적절한 하위 디렉토리에 새 HTML 파일을 추가합니다.
2. `vite.config.js`의 `rollupOptions.input`에 새 페이지 엔트리를 추가합니다.
3. 필요하면 `src/js/main.js`나 다른 스크립트에서 참조를 연결합니다.

### 다국어 (i18n)

번역은 `public/i18n/`의 JSON 파일과 `src/js/i18n.js`를 통해 관리됩니다. HTML 요소에 `data-i18n` 속성을 추가하면 자동으로 치환됩니다.

### 스타일

전역 스타일은 `src/css/style.css`에 있고, 페이지별 스타일은 각 페이지의 CSS 파일(예: `src/css/focus-timer.css`)에 있습니다.

## 🔧 기술 스택

- 프론트엔드: HTML5, CSS3, JavaScript (ES Modules)
- 빌드 도구: Vite
- 라이브러리: jQuery, CryptoJS

## ☕ 후원 링크

`src/js/main.js` 내부에 후원 링크 객체가 있어 개인 링크로 교체할 수 있습니다.

## 📄 라이센스

MIT License

---

Made with ❤️
# Lux Vera - 당신의 일상을 위한 유용한 도구들

Lux Vera는 일상생활과 개발 작업에 유용한 다양한 웹 기반 도구들을 모아놓은 사이트입니다. 광고 없이 무료로 제공되며, 빠르고 직관적인 사용자 경험을 제공합니다.

## ✨ 주요 기능

-   **로또 번호 생성기**: 행운의 로또 번호를 생성합니다.
-   **하루 한구절 성경**: 매일 새로운 성경 구절로 하루를 시작하세요.
-   **점심 메뉴 선택기**: 오늘 점심 메뉴 고민을 해결해 드립니다.
-   **내 인생의 해답**: 질문에 대한 영감을 주는 답변을 얻으세요.
-   **오늘의 운세**: 매일 새로운 운세를 확인하세요.
-   **집중 타이머**: 뽀모도로 타이머와 백색소음으로 집중력을 높여보세요.
-   **개발자 도구**: JSON 포맷터, Base64 인코더, 타임스탬프 변환기, URL 인코더, 정규식 테스터, 해시 생성기 등.

## 🚀 시작하기

이 프로젝트는 [Vite](https://vitejs.dev/)를 사용하여 빌드되며, GitHub Pages에 최적화되어 있습니다.

### 개발 환경 설정

1.  저장소를 클론합니다:
    ```bash
    cd lux-vera-site
    ```
2.  의존성을 설치합니다:
    ```bash
    ```
3.  개발 서버를 시작합니다:
    ```bash
    npm run dev
    ```
    브라우저에서 `http://localhost:5173` (또는 Vite가 지정한 포트)로 접속하여 개발 중인 사이트를 확인할 수 있습니다.

### 프로덕션 빌드

프로젝트를 배포할 준비가 되면 다음 명령어를 사용하여 프로덕션 빌드를 생성합니다:
```
빌드된 파일은 `dist/` 디렉토리에 생성됩니다.

### GitHub Pages 배포

`gh-pages` 라이브러리를 사용하여 빌드된 프로젝트를 GitHub Pages에 쉽게 배포할 수 있습니다.
```bash
npm run deploy
```
이 명령어는 `dist` 디렉토리의 내용을 `gh-pages` 브랜치에 푸시하고, GitHub Pages 설정을 통해 사이트를 배포합니다. `vite.config.js` 파일에 GitHub Pages의 `base` 경로가 `/lux-vera-site/`로 설정되어 있습니다.

## 🎨 커스터마이징

### 새로운 페이지 추가

1.  `public/` 또는 적절한 하위 디렉토리에 새 HTML 파일을 생성합니다.
2.  `vite.config.js` 파일의 `rollupOptions.input` 객체에 새 페이지의 경로를 추가합니다.
3.  필요한 경우 `src/js/main.js` 또는 다른 스크립트에서 새 페이지를 참조하도록 업데이트합니다.

### 다국어 (i18n) 지원

`public/i18n/ko.json` 및 `public/i18n/en.json` 파일을 수정하여 새로운 텍스트를 추가하거나 기존 번역을 업데이트할 수 있습니다. HTML 요소에 `data-i18n="your.key"` 속성을 추가하고, JavaScript에서는 `I18n.t('your.key')`를 사용하여 번역된 텍스트를 가져옵니다.

### 스타일 변경

주요 스타일은 `src/css/style.css`에 정의되어 있습니다. 각 도구별 고유 스타일은 해당 도구의 CSS 파일 (예: `src/css/focus-timer.css`)에 있습니다. 이 파일들을 수정하여 사이트의 디자인을 변경할 수 있습니다.

## 🔧 기술 스택

-   **프론트엔드**: HTML5, CSS3, JavaScript (ES Modules)
-   **빌드 도구**: Vite
-   **라이브러리**: jQuery, CryptoJS (필요한 도구에 한해)
-   **다국어**: 커스텀 i18n 구현

## 📱 반응형 디자인

모든 도구는 모바일, 태블릿, 데스크톱 등 다양한 기기에서 최적화된 사용자 경험을 제공합니다.

## ☕ 후원 링크 설정

`src/js/main.js` 파일을 열어 다음 부분을 수정하세요:

```javascript
const links = {
    toss: 'https://toss.me/yourusername',           // 토스 후원 링크
    kakaopay: 'https://qr.kakaopay.com/yourid',     // 카카오페이 링크
    github: 'https://github.com/sponsors/yourusername' // GitHub Sponsors 링크
};
```

### 토스 후원 링크 만들기
1. 토스 앱 실행
2. 우측 하단 전체 메뉴
3. "송금" → "내 송금 링크"
4. 링크 생성 후 복사

### 카카오페이 QR 만들기
1. 카카오톡 실행
2. 더보기 → Pay
3. 송금 → QR코드
4. 링크 공유

## 📄 라이센스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

## 🤝 기여하기

버그 리포트나 기능 제안은 Issues에 올려주세요!

---

Made with ❤️ for everyone.