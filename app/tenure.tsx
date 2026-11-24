"use client";

import { useEffect, useState } from "react";

// "2021-02" 같은 시작 연월부터 오늘까지의 경력을 "5년 9개월" 형태로 보여준다.
// 정적 사이트라 빌드 시점 값으로 먼저 그리고, 브라우저에서 오늘 날짜로 다시 계산한다.
function format(start: string, now: Date) {
  const [y, m] = start.split("-").map(Number);
  const months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m);
  const years = Math.floor(months / 12);
  const rest = months % 12;
  return `실무 ${years}년${rest ? ` ${rest}개월` : ""}`;
}

export function Tenure({ start }: { start: string }) {
  const [text, setText] = useState(() => format(start, new Date()));
  useEffect(() => setText(format(start, new Date())), [start]);
  return <>{text}</>;
}
