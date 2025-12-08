# 보안 정책 (Security Policy)

## 보안 개선 이력

### 2025-12-09: 주요 보안 취약점 수정

#### 1. XSS (Cross-Site Scripting) 취약점 수정 ✅
- **문제**: `innerHTML` 사용으로 인한 XSS 공격 가능성
- **조치**:
  - `src/js/i18n.js`: `innerHTML` → `textContent` 변경
  - `public/i18n/i18n.js`: `innerHTML` → `textContent` 변경
  - `src/js/utils.js`: DOM API로 안전하게 요소 생성
  - `src/js/fortune.js`: 별점 생성 함수 안전하게 개선
- **영향**: 악의적인 스크립트 실행 방지

#### 2. 보안 헤더 추가 ✅
- **추가된 헤더**:
  - `X-Content-Type-Options: nosniff` - MIME 타입 스니핑 방지
  - `X-Frame-Options: DENY` - 클릭재킹 공격 방지
  - `Content-Security-Policy` - XSS 및 데이터 주입 공격 방지
- **위치**: `index.html` 및 주요 페이지

#### 3. 외부 리소스 보안 강화 ✅
- **조치**:
  - 외부 스크립트에 `crossorigin="anonymous"` 속성 추가
  - CDN 리소스 로드 시 CORS 설정 적용
- **목적**: 리소스 무결성 검증 기반 마련

#### 4. 테스트 프레임워크 도입 ✅
- **도구**: Vitest + jsdom
- **커버리지**: XSS 방어 테스트 포함
- **실행 방법**:
  ```bash
  npm test              # 테스트 실행
  npm run test:watch    # Watch 모드
  npm run test:ui       # UI 모드
  ```

#### 5. i18n 코드 리팩토링 ✅
- **개선사항**:
  - 번역 파일 로드 경로 단일화
  - 에러 처리 강화
  - 불필요한 fallback 로직 제거

#### 6. 환경변수 관리 체계화 ✅
- **추가 파일**:
  - `.env.example`: 환경변수 템플릿
  - `.env`: 실제 환경변수 (gitignore에 포함)
  - `src/js/config.js`: 중앙 집중식 설정 관리

## 보안 취약점 보고

보안 취약점을 발견하셨다면 다음 방법으로 보고해 주세요:

1. **공개 이슈로 보고하지 마세요**
2. 이메일로 비공개 보고: [보안 담당자 이메일 추가 필요]
3. GitHub Security Advisories 사용 (저장소 설정 필요)

## 보안 모범 사례

### 개발자를 위한 가이드라인

1. **XSS 방어**
   - `innerHTML` 대신 `textContent` 사용
   - 사용자 입력 데이터는 항상 이스케이핑
   - DOM API를 사용한 안전한 요소 생성

2. **의존성 관리**
   ```bash
   npm audit              # 취약점 검사
   npm audit fix          # 자동 수정
   ```

3. **코드 리뷰 체크리스트**
   - [ ] `innerHTML` 사용 여부 확인
   - [ ] 외부 입력 검증 및 sanitization
   - [ ] 민감정보 하드코딩 여부
   - [ ] HTTPS 사용 여부
   - [ ] 테스트 코드 작성

4. **테스트**
   - XSS 공격 시나리오 테스트 필수
   - 입력 검증 테스트
   - 인증/인가 테스트

## 지원되는 버전

| 버전 | 지원 여부 |
| --- | --- |
| 1.0.x | ✅ 지원 |
| < 1.0 | ❌ 미지원 |

## 알려진 제한사항

1. **GitHub Pages 제약**
   - 서버 측 보안 헤더 설정 불가
   - meta 태그로 일부 헤더 구현

2. **CSP 정책**
   - `unsafe-inline` 사용 중 (인라인 이벤트 핸들러 제거 후 개선 예정)
   - 점진적 강화 계획

## 다음 단계

### 단기 (1-2주)
- [ ] 인라인 이벤트 핸들러 완전 제거
- [ ] CSP 정책 강화 (`unsafe-inline` 제거)
- [ ] 추가 단위 테스트 작성

### 중기 (1개월)
- [ ] Sentry 등 에러 모니터링 도입
- [ ] Dependabot 자동 업데이트 설정
- [ ] 보안 취약점 스캔 자동화

### 장기 (3개월)
- [ ] 정기 보안 감사
- [ ] 침투 테스트
- [ ] 보안 인증 획득 검토

---

**마지막 업데이트**: 2025-12-09
**담당자**: Security Team
