declare module "*.svg" {
  import React from "react";

  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

type Messages = typeof import("../messages/ko").default & typeof import("../messages/en").default;
declare interface IntlMessages extends Messages {}
