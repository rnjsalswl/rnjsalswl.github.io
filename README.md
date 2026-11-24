# rnjsalswl.github.io

권민지 포트폴리오 페이지. Next.js 정적 내보내기로 만들고 GitHub Pages에 배포합니다.

## 내용 고치기

- 프로젝트 내용: `app/data.ts`
- 디자인: `app/globals.css`

## 화면 캡처 넣기

1. 이미지를 `public/screens/`에 넣기 (예: `herenote-home.png`)
2. `app/data.ts`에서 해당 화면의 `src`에 파일명 적기

```ts
{ src: "herenote-home.png", caption: "홈 — 지도와 주변 장소" },
```

앱 화면은 세로(9:16), 웹 화면(cve-watch)은 가로(16:10)로 잘려 보입니다.

## 로컬 실행

```bash
npm install
npm run dev
```

## 배포

`main`에 푸시하면 GitHub Actions가 빌드해서 Pages에 올립니다.
처음 한 번만 리포 Settings → Pages → Source를 **GitHub Actions**로 바꿔주세요.

## 방문 분석 (PostHog, 선택)

키가 없으면 분석 코드는 아무 일도 하지 않습니다. 쓰려면:

1. PostHog 프로젝트를 만들고 Project API Key 복사
2. 리포 Settings → Secrets and variables → Actions → **Variables**에 추가
   - `POSTHOG_KEY`: 프로젝트 키
   - `POSTHOG_HOST`: `https://us.i.posthog.com` (EU 리전이면 `https://eu.i.posthog.com`)

수집하는 이벤트: 페이지 방문, `link_click` (어떤 프로젝트의 서비스·GitHub 링크를 눌렀는지)
