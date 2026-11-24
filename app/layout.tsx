import type { Metadata } from "next";
import { Analytics } from "./analytics";
import "./globals.css";

export const metadata: Metadata = {
  title: "권민지 포트폴리오",
  description: "화면부터 API·데이터·배포까지 혼자 완결하는 개발자 권민지의 프로젝트",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
        />
      </head>
      <body>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
