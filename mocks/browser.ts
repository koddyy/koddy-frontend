import { setupWorker } from "msw/browser";
import { handlers as coffeechatHander } from "./handlers/coffeechat";
import { handlers as userHandlers } from "./handlers/user";

export const worker = setupWorker(...userHandlers, ...coffeechatHander);
