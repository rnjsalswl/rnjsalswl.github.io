export type Decision = { what: string; why: string };

export type Project = {
  id: string;
  name: string;
  tagline: string;
  summary: string;
  // 점검하면서 직접 찾아서 고친 취약점
  fixes: Decision[];
  // 설계할 때 신경 쓴 것
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
  intro:
    "개인 프로젝트는 AI와 함께 빠르게 만들고, 다 만든 뒤에 코드를 직접 점검해서 취약한 곳을 찾아 고칩니다. 보안 장비(IPSec VPN)와 인증서 관리 솔루션을 개발해 온 경험을 이 점검에 씁니다.",
  careerStart: "2021-02", // 퓨쳐시스템 입사. 경력은 이 날짜부터 자동 계산
  facts: ["보안 장비 → 메시징 → 인증서 관리(CLM)", "개인 프로젝트는 AI로 만들고 직접 점검"],
  github: "https://github.com/rnjsalswl",
  email: "alswl11317@gmail.com",
};

export const projects: Project[] = [
  {
    id: "herenote",
    name: "herenote",
    tagline: "그 장소에 가야 열리는 방명록",
    summary:
      "장소마다 방명록이 있고, GPS로 그 자리에 있는 게 확인돼야 글을 읽고 쓸 수 있는 웹앱입니다. 홈 화면에 앱처럼 설치해서 쓸 수 있습니다.",
    fixes: [
      {
        what: "남의 방명록을 현장에 안 가고 읽을 수 있었음",
        why: "/users/:id API가 로그인 여부만 보고 그 id가 본인인지는 확인하지 않았습니다. 다른 사람 id를 넣으면 위치 인증 없이 방명록을 읽을 수 있어서, 본인 id일 때만 통과하도록 미들웨어를 추가하고 테스트를 붙였습니다.",
      },
      {
        what: "관리자 비밀값이 프론트 코드에 들어 있었음",
        why: "공유 시크릿 헤더로 관리자를 구분했는데, 그 값이 빌드된 JS에 그대로 들어가 있었습니다. 로그인 토큰의 사용자 ID를 서버의 관리자 목록과 비교하는 방식으로 바꿨습니다.",
      },
      {
        what: "서버용 카카오 키가 브라우저에 노출됨",
        why: "지도 썸네일에 쓰던 REST 키가 브라우저 코드에 있었습니다. 키는 서버에만 두고 백엔드가 대신 요청하도록 옮겼습니다.",
      },
    ],
    decisions: [
      {
        what: "위치 판정은 서버에서",
        why: "폰이 도착했다고 보내는 걸 믿으면 프론트만 고쳐도 통과됩니다. 좌표만 받고 반경 계산은 서버에서 PostGIS 쿼리로 합니다.",
      },
      {
        what: "로그인 토큰과 위치 토큰 분리",
        why: "로그인(JWT)은 30일, 위치 토큰은 24시간이고 장소마다 따로 발급합니다. A 장소 토큰으로 B 장소는 열 수 없습니다.",
      },
    ],
    results: ["herenote.vercel.app에서 운영하고 있습니다."],
    limits: [
      "GPS 좌표 자체를 위조하는 앱은 아직 못 막습니다.",
      "로그인 시도 횟수 제한이 아직 없습니다.",
    ],
    stack: ["Go", "Gin", "PostgreSQL", "PostGIS", "JWT", "Vue 3", "Kakao Map"],
    repo: "https://github.com/rnjsalswl/herenote",
    live: "https://herenote.vercel.app",
    screens: [
      { src: "herenote-home.jpg", caption: "홈" },
      { src: "herenote-map.jpg", caption: "지도 탐색" },
      { src: "herenote-place.jpg", caption: "장소 상세(인증 반경)" },
    ],
    screenShape: "phone",
  },
  {
    id: "book-journal",
    name: "book-journal",
    tagline: "친구와 같이 읽는 픽셀 책방",
    summary:
      "도서관 맵을 돌아다니며 독서 퀘스트를 받고, 전자책 문장에 친구들과 밑줄과 코멘트를 남기는 독서 앱입니다. Flutter로 Android, iOS, 웹을 같이 만들었습니다.",
    fixes: [
      {
        what: "다른 사람 경험치를 마음대로 올릴 수 있었음",
        why: "경험치·독서 시간 함수가 DB 권한을 건너뛰는 방식으로 돌면서, 넘겨받은 사용자 ID가 본인인지 확인하지 않았습니다. 본인 확인과 값 범위 제한을 넣고, 로그인하지 않은 요청은 호출 자체를 막았습니다. 로컬 DB에서 공격 요청이 거절되는 걸 확인한 뒤 실서버에 적용했습니다.",
      },
    ],
    decisions: [
      {
        what: "책 본문은 서버에 올리지 않음",
        why: "전자책은 저작권이 있어서 EPUB은 폰 안에서 풀고, 서버에는 제목과 밑줄 위치(몇 번째 문단, 몇 번째 문장)만 저장합니다.",
      },
      {
        what: "권한은 DB에서 막음",
        why: "같은 모임 사람만 서로의 밑줄을 볼 수 있게 Supabase RLS 정책을 걸었습니다(테이블 14개, 정책 30개). 앱 코드가 실수해도 DB에서 한 번 더 막힙니다.",
      },
      {
        what: "본문 출처 분리",
        why: "본문을 어디서 가져오든(기기 파일, 샘플, 외부 API) 리더 화면은 바뀌지 않게 인터페이스로 나눴습니다.",
      },
    ],
    results: ["웹 버전은 GitHub Pages에 올려 두었고, EPUB 처리와 주요 화면에는 테스트를 붙였습니다."],
    limits: ["모임 초대 기능이 없어서 지금은 DB에 직접 넣어야 합니다."],
    stack: ["Flutter", "Dart", "Supabase", "PostgreSQL", "RLS", "Realtime", "Riverpod"],
    repo: "https://github.com/rnjsalswl/Book-journal",
    live: "https://rnjsalswl.github.io/Book-journal/",
    screens: [
      { src: "bookjournal-library.jpg", caption: "도서관 맵" },
      { src: "bookjournal-reader.jpg", caption: "리더(밑줄, 말풍선)" },
      { src: "bookjournal-profile.jpg", caption: "프로필" },
    ],
    screenShape: "phone",
  },
  {
    id: "cve-watch",
    name: "cve-watch",
    tagline: "서버 없이 돌아가는 CVE 피드",
    summary:
      "새로 공개되는 CVE를 30분마다 모아서 보여주는 사이트입니다. 서버와 DB 없이 GitHub Actions와 정적 페이지로만 돌아갑니다.",
    fixes: [
      {
        what: "CVE 데이터로 스크립트를 심을 수 있었음",
        why: "CVE 레코드는 여러 기관이 올리는 외부 데이터인데, 참고 링크의 javascript: 주소나 CWE 칸의 HTML을 걸러내지 않았습니다. 수집할 때 형식을 검증하고 화면에 넣을 때 한 번 더 검사하도록 고쳤고, 악성 레코드를 넣어 브라우저에서 실행되지 않는 걸 확인했습니다.",
      },
    ],
    decisions: [
      {
        what: "서버 없는 정적 사이트",
        why: "운영비가 들지 않고 관리할 서버도 없습니다. 검색은 미리 만든 색인 파일을 브라우저가 필요한 만큼만 받아서 처리합니다.",
      },
      {
        what: "수집 스크립트는 Python 표준 라이브러리만",
        why: "외부 패키지를 안 써서 설치 과정이 없고, 의존성 쪽 공급망 위험도 줄였습니다.",
      },
      {
        what: "CVSS, EPSS, KEV를 같이 표시",
        why: "심각도 점수만으로는 우선순위가 안 나와서, 악용 확률(EPSS)과 실제 악용 여부(KEV)를 함께 보여줍니다.",
      },
      {
        what: "실행 시각 13분, 43분",
        why: "정각에 예약하면 GitHub 쪽 실행이 자주 밀려서 시간을 옮겼습니다.",
      },
    ],
    results: [
      "30분마다 자동으로 갱신되고 있습니다.",
      "내 스택 탭에 쓰는 기술을 등록하면 관련 CVE만 모아 볼 수 있고, 상세 화면에서 내 버전이 영향 범위에 드는지 확인할 수 있습니다(참고용).",
    ],
    limits: ["버전 비교가 단순해서 1.0.0-rc1 같은 형식은 틀릴 수 있습니다."],
    stack: ["Python", "GitHub Actions", "GitHub Pages", "Vanilla JS"],
    repo: "https://github.com/rnjsalswl/cve-watch",
    live: "https://rnjsalswl.github.io/cve-watch/",
    screens: [
      { src: "cve-feed.png", caption: "실시간 피드" },
      { src: "cve-detail.png", caption: "CVE 상세(CVSS 한국어 풀이)" },
      { src: "cve-stack.png", caption: "내 스택" },
    ],
    screenShape: "wide",
  },
];
