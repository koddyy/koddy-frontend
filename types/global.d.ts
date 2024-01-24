declare module "*.svg" {
  import React from "react";

  export const ReactComponent: React.SFC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

type Messages = typeof import("../messages/ko.json") & typeof import("../messages/en.json");
declare interface IntlMessages extends Messages {}
