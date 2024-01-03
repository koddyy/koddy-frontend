"use client";

import { isServer } from "@/utils/isServer";

if (process.env.NEXT_PUBLIC_API_MOCKING === "enabled") {
  if (isServer) {
    (async () => {
      const { server } = await import("./node");
      return server.listen();
    })();
  } else {
    (async () => {
      const { worker } = await import("./browser");
      return worker.start();
    })();
  }
}

const MswInit = () => {
  return null;
};

export default MswInit;
