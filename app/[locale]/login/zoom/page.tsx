"use client";

import { useEffect } from "react";
import { Spinner } from "@/components/Spinner";

const Page = () => {
  useEffect(() => {
    const currentUrl = window.location.href;
    const searchParams = new URL(currentUrl).searchParams;
    const code = searchParams.get("code");
    const state = searchParams.get("state");

    if (code && state) {
      window.opener.postMessage({ code, state }, window.location.origin);
      window.opener.postMessage("ZOOM_OAUTH_COMPLETE", window.location.origin);
    }
  }, []);

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
      <Spinner />
    </div>
  );
};

export default Page;
