# 🎯 집중 - 광고 없는 무료 타이머

깃허브 페이지로 호스팅되는 심플한 집중 타이머 + 백색소음 사이트입니다.

## ✨ 특징

- ⏱️ **뽀모도로 타이머**: 25분, 15분, 45분, 60분 프리셋 지원
- 🎵 **백색소음**: 빗소리, 파도 소리, 카페 소음, 화이트 노이즈
- 🌙 **다크모드**: 눈의 피로를 줄여주는 다크 테마
- 📱 **반응형**: 모바일, 태블릿, 데스크톱 모두 지원
- 🚫 **광고 없음**: 깨끗한 UI, 방해 요소 제로
- ⚡ **빠른 로딩**: 외부 라이브러리 없이 바닐라 JS 사용

## 🎨 라이선스 정보

### 폰트
- **Noto Sans KR**: Google Fonts (SIL Open Font License 1.1)
  - 상업적 사용 가능
  - 무료 배포 가능

### 오디오
- **Web Audio API로 실시간 생성**: 저작권 이슈 없음
  - 빗소리: 화이트 노이즈 + 로우패스 필터
  - 파도 소리: 사인파 오실레이터 + LFO
  - 카페 소음: 밴드패스 필터 화이트 노이즈
  - 화이트 노이즈: 순수 랜덤 노이즈

### 아이콘
- 이모지 사용 (유니코드 표준, 무료)

## 🚀 GitHub Pages 배포 방법

### 1. 저장소 생성
```bash
git init
git add .
git commit -m "Initial commit: Focus Timer"
```

### 2. GitHub에 푸시
```bash
git remote add origin https://github.com/your-username/focus-timer.git
git branch -M main
git push -u origin main
```

### 3. GitHub Pages 활성화
1. GitHub 저장소 → **Settings**
2. 좌측 메뉴 → **Pages**
3. Source: **Deploy from a branch**
4. Branch: **main** / **(root)** 선택
5. **Save** 클릭

5분 후 `https://your-username.github.io/focus-timer/` 에서 접속 가능합니다.

## ☕ Buy Me a Coffee 연동

`index.html` 파일의 다음 부분을 수정하세요:

```html
<a href="https://www.buymeacoffee.com/yourname" class="coffee-btn" target="_blank">
```

**Buy Me a Coffee 가입 방법:**
1. https://www.buymeacoffee.com/ 접속
2. **Start my page** 클릭
3. 계정 생성 (이메일 또는 소셜 로그인)
4. 사용자명 설정 (예: `yourname`)
5. 프로필 URL: `https://www.buymeacoffee.com/yourname`

## 📊 커스터마이징

### 색상 변경
`index.html` 내 `:root` 변수 수정:
```css
:root {
    --accent: #4a90e2;  /* 메인 컬러 */
    --accent-hover: #357abd;  /* 호버 컬러 */
}
```

### 타이머 프리셋 추가
```html
<button class="preset-btn" onclick="setTimer(90)">90분</button>
```

### 사운드 추가
JavaScript 함수 추가 후 HTML에 버튼 추가:
```javascript
function createNewSound() {
    // 새로운 사운드 로직
}
```

## 🔧 기술 스택

- **HTML5**: 시맨틱 마크업
- **CSS3**: CSS Grid, Flexbox, CSS Variables
- **Vanilla JavaScript**: ES6+
- **Web Audio API**: 실시간 오디오 생성

## 📈 SEO 최적화 팁

### 메타 태그 업데이트
```html
<meta name="description" content="당신의 설명">
<meta name="keywords" content="집중타이머, 뽀모도로, 백색소음">
```

### sitemap.xml 추가
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://your-username.github.io/focus-timer/</loc>
    <lastmod>2025-01-01</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

### robots.txt 추가
```
User-agent: *
Allow: /

Sitemap: https://your-username.github.io/focus-timer/sitemap.xml
```

## 🌟 바이럴 마케팅 전략

### 1. 커뮤니티 공유
- 에브리타임 (대학생 커뮤니티)
- 스터디 카페 온라인 커뮤니티
- 블라인드 (직장인)
- 디시인사이드 입시갤

### 2. SNS 전략
- 인스타그램 해시태그: #공부타이머 #집중력 #뽀모도로
- 틱톡 숏폼: "광고 없는 공부 타이머 찾다가..."

### 3. 입소문 유도
- 사이트 로딩 시 "친구에게 공유하기" 툴팁
- 타이머 완료 시 "이 사이트 도움됐나요?" 메시지

## 📞 지원

- 문의: your@email.com
- 버그 제보: GitHub Issues

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능

---

**만든 이**: [@your-username](https://github.com/your-username)  
**후원하기**: [Buy Me a Coffee ☕](https://www.buymeacoffee.com/yourname)
