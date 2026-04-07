import * as SecureStore from "expo-secure-store";

import { BASE_URL } from "@/config";
import type {
  AuthSession,
  LoginPayload,
  RegisterPayload,
  StoredAuthSession,
} from "@/types/user.types";

const SESSION_STORAGE_KEY = "ecommerce.auth.session";

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

async function requestJson<T>(path: string, init: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}/api/v1${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });

  const payload = (await response.json().catch(() => null)) as
    | ApiResponse<T>
    | { message?: string }
    | null;

  if (!response.ok) {
    throw new Error(payload?.message ?? "Unable to complete the request");
  }

  return payload as T;
}

export async function loginWithBackend(
  payload: LoginPayload
): Promise<AuthSession> {
  const response = await requestJson<ApiResponse<AuthSession>>("/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function registerWithBackend(
  payload: RegisterPayload
): Promise<void> {
  await requestJson<ApiResponse<{ id: string }>>("/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function registerAndLoginWithBackend(
  payload: RegisterPayload
): Promise<AuthSession> {
  await registerWithBackend(payload);
  return loginWithBackend({
    email: payload.email,
    password: payload.password,
  });
}

export async function saveAuthSession(session: AuthSession) {
  await SecureStore.setItemAsync(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export async function getAuthSession(): Promise<StoredAuthSession> {
  const storedValue = await SecureStore.getItemAsync(SESSION_STORAGE_KEY);

  if (!storedValue) {
    return null;
  }

  try {
    return JSON.parse(storedValue) as AuthSession;
  } catch {
    return null;
  }
}

export async function clearAuthSession() {
  await SecureStore.deleteItemAsync(SESSION_STORAGE_KEY);
}
