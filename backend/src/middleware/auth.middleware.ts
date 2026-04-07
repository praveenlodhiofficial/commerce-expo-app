import type { NextFunction, Request, Response } from "express";

import { config } from "@/config";
import { ApiError } from "@/utils/api-error";
import { getSessionFromBearerToken, type SessionPayload } from "@/utils/session";

export type AuthenticatedRequest = Request & {
	authUser?: SessionPayload;
};

export async function authMiddleware(req: Request, _res: Response, next: NextFunction) {
	try {
		const session = await getSessionFromBearerToken(req, {
			secret: config.auth.jwtSecret,
			ttlSeconds: config.auth.accessTokenTtlSeconds,
			secure: process.env.NODE_ENV === "production",
		});

		if (!session) {
			throw new ApiError(401, "Unauthorized");
		}

		(req as AuthenticatedRequest).authUser = session;

		return next();
	} catch (error) {
		return next(error);
	}
}
