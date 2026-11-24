"use client";

import posthog from "posthog-js";
import { useEffect } from "react";

const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || "https://us.i.posthog.com";

let started = false;

export function Analytics() {
  useEffect(() => {
    if (!KEY || started) return;
    posthog.init(KEY, { api_host: HOST, person_profiles: "identified_only" });
    started = true;
  }, []);
  return null;
}

// 키가 없으면 아무 일도 하지 않음 (로컬 개발, 키 설정 전)
export function track(event: string, props?: Record<string, string>) {
  if (!KEY) return;
  posthog.capture(event, props);
}
