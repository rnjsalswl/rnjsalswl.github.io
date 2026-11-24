export type Decision = { what: string; why: string };

export type Project = {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  hypothesisLabel: string;
  hypothesis: string;
  decisions: Decision[];
  results: string[];
  limits: string[];
  stack: string[];
  repo: string;
  live?: string;
  // public/screens/ 아래에 이미지를 넣고 파일명을 적으면 화면이 표시됨
  screens: { src?: string; caption: string }[];
  // phone: 세로 앱 화면, wide: 가로 웹 화면
  screenShape: "phone" | "wide";
};

export const profile = {
  name: "권민지",
  role: "혼자 완결하는 개발자",
  intro:
    "아이디어를 검증 가능한 형태로 좁히고, 화면부터 API·데이터·배포까지 혼자 만들어 내보냅니다. 보안 장비와 인증서 솔루션을 개발한 경험이 있어 인증·인가와 최소 권한을 기본으로 설계합니다.",
  facts: [
    "실무 5년 8개월",
    "네트워크 보안 장비 → 메시징 플랫폼 → 인증서 관리(CLM)",
    "아래 프로젝트는 모두 1인 개발",
  ],
  github: "https://github.com/rnjsalswl",
  email: "alswl11317@gmail.com",
};

export const projects: Project[] = [
  {
    id: "herenote",
    name: "herenote",
    tagline: "그 장소에 가야만 열리는 방명록",
    summary:
      "산 정상, 공원, 카페마다 방명록이 있고, GPS로 현장에 있다는 게 확인돼야만 글을 읽고 쓸 수 있는 PWA. 설계·백엔드·프론트엔드·배포를 혼자 맡았습니다.",
    hypothesisLabel: "가설",
    hypothesis:
      "그 자리에 있는 사람만 볼 수 있는 글이라면, 장소를 찾아갈 이유가 하나 더 생긴다.",
    decisions: [
      {
        what: "위치 판정을 서버(PostGIS)에서",
        why: "프론트를 조작해 '인증됨'으로 바꾸는 우회를 막기 위해. 반경 계산은 DB 쿼리 한 줄로 처리.",
      },
      {
        what: "인증을 두 개로 분리",
        why: "'누구인가'(JWT, 30일)와 '지금 거기 있는가'(장소별 토큰, 24시간)는 바뀌는 속도가 달라서.",
      },
      {
        what: "위치 토큰을 장소에 묶음",
        why: "A 장소에서 받은 토큰으로 B 장소 방명록을 열 수 없도록.",
      },
      {
        what: "관리자 인증 방식 변경",
        why: "공유 시크릿 헤더가 프론트 번들에 노출되는 걸 발견하고 JWT + 서버 측 관리자 목록으로 교체, 테스트로 확인.",
      },
    ],
    results: ["herenote.vercel.app에서 서비스 중, PWA로 홈 화면 설치 가능"],
    limits: [
      "서버가 폰의 좌표를 믿기 때문에 GPS 위조 앱은 못 막음 → 비정상 이동 감지 필요",
      "로그인 시도 횟수 제한, CORS 범위 축소가 다음 과제",
    ],
    stack: ["Go", "Gin", "PostgreSQL", "PostGIS", "JWT", "Vue 3", "Kakao Map"],
    repo: "https://github.com/rnjsalswl/herenote",
    live: "https://herenote.vercel.app",
    screens: [
      { src: "herenote-home.jpg", caption: "홈 — 지금 열린 장소와 피드" },
      { src: "herenote-map.jpg", caption: "지도 탐색" },
      { src: "herenote-place.jpg", caption: "장소 상세 — 인증 반경" },
    ],
    screenShape: "phone",
  },
  {
    id: "book-journal",
    name: "book-journal",
    tagline: "친구와 함께 읽는 픽셀 책방",
    summary:
      "픽셀 도서관을 돌아다니며 독서 퀘스트를 받고, 전자책에 밑줄·말풍선 코멘트를 친구와 남기는 소셜 독서 앱. 인터랙티브 프로토타입으로 컨셉을 먼저 검증한 뒤 실제 백엔드가 있는 앱으로 만들었습니다.",
    hypothesisLabel: "가설",
    hypothesis:
      "독서에 퀘스트·경험치 같은 게임 요소와 '친구가 지금 읽는 중'이라는 존재감을 더하면 꾸준히 읽게 된다.",
    decisions: [
      {
        what: "책 본문은 기기에만 저장",
        why: "전자책은 대부분 저작권이 있어서, 서버에는 메타데이터만 두고 본문은 사용자의 EPUB을 직접 파싱해 기기에 보관.",
      },
      {
        what: "권한을 DB 정책(RLS)으로",
        why: "테이블 14개에 정책 30개. 같은 모임 멤버만 서로의 기록을 보도록 앱이 아니라 DB가 막음.",
      },
      {
        what: "경험치·배지 계산을 서버 함수로",
        why: "클라이언트가 점수를 조작할 수 없도록.",
      },
      {
        what: "본문 소스를 교체 가능하게",
        why: "로컬 파일·샘플·외부 도서 API를 하나의 인터페이스로 묶어, 출처가 바뀌어도 화면은 그대로.",
      },
    ],
    results: [
      "Android · iOS · Web 대상, 웹 버전은 GitHub Pages에 배포",
      "EPUB 파이프라인 테스트와 화면 골든 이미지 테스트 작성",
    ],
    limits: ["모임 초대는 아직 DB에 직접 추가해야 함 → 이메일 초대 흐름이 다음 과제"],
    stack: ["Flutter", "Dart", "Supabase", "PostgreSQL", "RLS", "Realtime", "Riverpod"],
    repo: "https://github.com/rnjsalswl/Book-journal",
    live: "https://rnjsalswl.github.io/Book-journal/",
    screens: [
      { src: "bookjournal-library.jpg", caption: "픽셀 도서관 맵" },
      { src: "bookjournal-reader.jpg", caption: "밑줄·말풍선 리더" },
      { src: "bookjournal-profile.jpg", caption: "프로필 히트맵·업적" },
    ],
    screenShape: "phone",
  },
  {
    id: "cve-watch",
    name: "cve-watch",
    tagline: "서버 없는 실시간 CVE 피드",
    summary:
      "새로 공개되는 보안 취약점(CVE)을 30분마다 자동으로 모아 보여주고, 지난 기록 검색과 학습까지 할 수 있는 사이트. 서버와 DB 없이 GitHub Actions와 정적 페이지만으로 운영합니다.",
    hypothesisLabel: "문제",
    hypothesis:
      "보안은 남의 판단이나 AI가 만든 결과물만 믿기 어렵다. 새 취약점을 직접, 빠르게, 우선순위와 함께 확인할 도구가 필요했다.",
    decisions: [
      {
        what: "서버·DB 없이 정적 사이트",
        why: "운영비 0원, 공격받을 서버도 없음. 검색도 미리 만든 역색인 파일로 브라우저에서 처리.",
      },
      {
        what: "수집은 Python 표준 라이브러리만",
        why: "보안 도구가 외부 패키지에 의존하면 그 자체가 공급망 위험이 되므로.",
      },
      {
        what: "아카이브는 최근 6개월, 과거 백필 제외",
        why: "목적은 '지금 대응할 것'이라 범위를 줄여 속도와 용량을 지킴.",
      },
      {
        what: "CVSS + EPSS + KEV를 함께",
        why: "'얼마나 아픈가'와 '얼마나 맞을 것 같은가'를 같이 봐야 우선순위가 나옴.",
      },
      {
        what: "실행 시각을 13분·43분으로",
        why: "정각엔 GitHub 예약 실행이 몰려 밀리거나 빠지는 걸 확인하고 조정.",
      },
    ],
    results: [
      "GitHub Pages에서 30분마다 자동 갱신 중",
      "내 스택 탭: Spring·JDK·MySQL·Docker·OpenSSL 등 쓰는 기술별로 신규 CVE와 실제 악용(KEV) 건수를 모아 봄",
      "CVE 상세에서 내 버전이 영향받는지 판정(참고용)",
    ],
    limits: [
      "다음 단계: 스택을 손으로 입력하는 대신 리포 의존성 파일에서 자동으로 읽어오기",
      "버전 비교가 단순 숫자 비교라 1.0.0-rc1 같은 형식은 틀릴 수 있음",
    ],
    stack: ["Python", "GitHub Actions", "GitHub Pages", "Vanilla JS"],
    repo: "https://github.com/rnjsalswl/cve-watch",
    live: "https://rnjsalswl.github.io/cve-watch/",
    screens: [
      { src: "cve-feed.png", caption: "실시간 피드" },
      { src: "cve-detail.png", caption: "CVE 상세 — CVSS 한국어 풀이" },
      { src: "cve-stack.png", caption: "내 스택 — 쓰는 기술별 신규 CVE" },
    ],
    screenShape: "wide",
  },
];
