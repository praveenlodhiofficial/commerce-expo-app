import cors, { type CorsOptionsDelegate } from "cors";

const LOCAL_NETWORK_ORIGIN = /^(https?:\/\/)?(localhost|127(?:\.\d{1,3}){3}|10(?:\.\d{1,3}){3}|192\.168(?:\.\d{1,3}){2}|172\.(1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(:\d+)?$/i;
const EXPO_ORIGIN = /^(exp|exps|expo):\/\//i;

function getAllowedOrigins() {
	const configuredOrigins = process.env.CORS_ORIGIN;

	if (!configuredOrigins) {
		return [];
	}

	return configuredOrigins
		.split(",")
		.map((origin) => origin.trim())
		.filter(Boolean);
}

const corsOptions: CorsOptionsDelegate = (req, callback) => {
	const origin = req.headers.origin;
	const allowedOrigins = getAllowedOrigins();

	if (!origin) {
		return callback(null, { origin: true, credentials: true });
	}

	const isAllowedOrigin =
		allowedOrigins.includes(origin) || LOCAL_NETWORK_ORIGIN.test(origin) || EXPO_ORIGIN.test(origin);

	if (!isAllowedOrigin) {
		return callback(null, {
			origin: false,
			credentials: true,
		});
	}

	return callback(null, {
		origin: true,
		credentials: true,
		methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	});
};

export const corsMiddleware = cors(corsOptions);
