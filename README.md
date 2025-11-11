# 개발자 유틸리티 모음

개발에 필요한 편리한 웹 기반 도구들을 모아놓은 사이트입니다.

## 🛠️ 포함된 도구

1. **JSON 포맷터** - JSON 데이터 포맷팅, 압축, 검증
2. **Base64 인코더** - Base64 인코딩/디코딩
3. **타임스탬프 변환** - Unix 타임스탬프와 날짜 변환
4. **URL 인코더** - URL 인코딩/디코딩
5. **정규식 테스터** - 정규표현식 테스트 및 매칭 확인
6. **해시 생성기** - MD5, SHA-1, SHA-256, SHA-512 해시 생성

## 🚀 GitHub Pages로 배포하기

### 1. GitHub 저장소 생성

1. GitHub에 로그인
2. 새 저장소 생성 (예: `dev-utils`)
3. Public으로 설정

### 2. 파일 업로드

터미널에서 다음 명령어 실행:

```bash
cd dev-utils-site
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/your-username/dev-utils.git
git push -u origin main
```

### 3. GitHub Pages 설정

1. 저장소 페이지에서 Settings 클릭
2. 왼쪽 메뉴에서 Pages 클릭
3. Source에서 `main` 브랜치 선택
4. 루트 (`/`) 디렉토리 선택
5. Save 클릭

약 1-2분 후 `https://your-username.github.io/dev-utils/` 에서 접속 가능합니다.

## ☕ 후원 링크 설정

`js/main.js` 파일을 열어 다음 부분을 수정하세요:

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

## 📝 커스터마이징

### 도구 추가하기

1. `tools` 폴더에 새 HTML 파일 생성
2. `index.html`의 유틸리티 그리드에 카드 추가:

```html
<div class="util-card">
    <div class="util-icon">🔧</div>
    <h3>새 도구</h3>
    <p>설명</p>
    <button class="btn-primary" onclick="location.href='tools/new-tool.html'">사용하기</button>
</div>
```

### 스타일 변경

`css/style.css` 파일에서 색상 변경:

```css
/* 메인 색상 */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* 버튼 색상 */
.btn-primary {
    background: #667eea;
}
```

## 🔧 기술 스택

- HTML5
- CSS3
- JavaScript (ES6+)
- jQuery 3.6.0
- CryptoJS 4.1.1

## 📱 반응형 디자인

모든 도구는 모바일, 태블릿, 데스크톱에서 최적화되어 동작합니다.

## 📄 라이센스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

## 🤝 기여하기

버그 리포트나 기능 제안은 Issues에 올려주세요!

---

Made with ❤️ for developers
