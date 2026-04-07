import type { SessionPayload } from "@/utils/session";

declare module "express-serve-static-core" {
  interface Request {
    authUser?: SessionPayload;
  }
}

export {};