# FitSnap 홍보웹

AI 가상 착용 앱 FitSnap의 랜딩 페이지 + 법리 + 블로그.
Vite + React + SSR/prerender, GitHub Pages 정적 배포.

## 개발

```bash
cd web
npm install
npm run dev        # 개발 서버
npm run build      # 프로덕션 빌드 (dist/)
npm run preview    # 빌드 결과 미리보기
npm run typecheck  # 타입체크
```

## 구조

- `src/sections/` — 랜딩 섹션 (Hero·HowItWorks·Demo·Features·Pricing·FAQ·FinalCTA)
- `src/pages/` — 법리 페이지 (개인정보·약관·계정삭제, 해시 라우팅)
- `src/components/ui/` — 공용 컴포넌트 (BeforeAfter·StoreCTA·Reveal·Section·Footer)
- `src/constants/site.shared.mjs` — **SSOT**: 도메인·스토어 URL·회사정보
- `content/blog/*.md` — 블로그 아티클 (마크다운)
- `scripts/` — 제로-dep 빌드 (prerender·build-blog·build-sitemap)

## 배포 (GitHub Pages)

### 방법 A: GitHub Pages 기본 URL (도메인 불필요)

1. 이 `web/` 내용을 GitHub 저장소에 push (또는 모노레포면 `web/` 경로 유지).
2. 저장소 Settings → Pages → Source: **GitHub Actions** 선택.
3. main에 push하면 `.github/workflows/deploy.yml`이 자동 빌드·배포.
   - `BASE_PATH`·`SITE_ORIGIN`이 repo 이름 기준으로 자동 설정됨.
4. 배포 URL: `https://<owner>.github.io/<repo>/`

### 방법 B: 커스텀 도메인 (예: fitsnap.app)

1. `public/CNAME` 파일 생성, 내용은 도메인 한 줄 (예: `fitsnap.app`).
2. `deploy.yml`의 `env`를 수정:
   ```yaml
   BASE_PATH: /
   SITE_ORIGIN: https://fitsnap.app
   ```
3. 도메인 DNS에 GitHub Pages IP(A 레코드) 또는 CNAME 설정.
4. Settings → Pages → Custom domain 입력.

## 배포 전 확정 필요 (TODO)

`src/constants/site.shared.mjs`의 플레이스홀더:
- `SITE.origin` — 커스텀 도메인 (또는 env로 주입)
- `STORES.*.url` / `status` — 앱 출시 후 실제 스토어 URL, `status: 'live'`로
- `COMPANY.*` — 상호·대표·주소·사업자등록번호 (법리 페이지에 표시)

`index.html`:
- 검색엔진 인증 코드 (google/naver-site-verification 주석 해제)

법리 페이지: 모든 페이지에 "초안" 경고 있음 → **배포 전 법률 검토 필수**.
