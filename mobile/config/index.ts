import { NativeModules, Platform } from "react-native";

const API_PORT = "3000";
const ANDROID_EMULATOR_HOST = "10.0.2.2";
const FALLBACK_LAN_HOST = "192.168.204.1";

function getHostFromScriptUrl(): string | null {
  const scriptURL = NativeModules.SourceCode?.scriptURL;

  if (!scriptURL || typeof scriptURL !== "string") {
    return null;
  }

  const match = scriptURL.match(/^https?:\/\/([^/:?#]+)(?::\d+)?/i);
  return match?.[1] ?? null;
}

function resolveApiBaseUrl(): string {
  const explicitBaseUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();

  if (explicitBaseUrl) {
    return explicitBaseUrl;
  }

  const detectedHost = getHostFromScriptUrl();
  if (detectedHost) {
    return `http://${detectedHost}:${API_PORT}`;
  }

  if (Platform.OS === "android") {
    return `http://${ANDROID_EMULATOR_HOST}:${API_PORT}`;
  }

  return `http://${FALLBACK_LAN_HOST}:${API_PORT}`;
}

export const BASE_URL = resolveApiBaseUrl();
