import { setupWorker } from "msw/browser";
import { handlers as coffeechatHander } from "./handlers/coffeechat";
import { handlers as coffeeChatStatusHandler } from "./handlers/coffeechat-status";
import { handlers as userHandlers } from "./handlers/user";

export const worker = setupWorker(...coffeeChatStatusHandler, ...coffeechatHander, ...userHandlers);
