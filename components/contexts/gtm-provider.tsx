"use client";

import { useEffect } from "react";
import TagManager from "react-gtm-module";

export function GTMProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
    if (!gtmId) {
      return;
    }

    try {
      TagManager.initialize({ gtmId });
    } catch {
      // Silently ignore GTM initialization errors in dev
    }
  }, []);

  return <>{children}</>;
} 