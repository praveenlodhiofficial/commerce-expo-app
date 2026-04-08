export type UserRole = "USER" | "ADMIN";

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type RegisterPayload = LoginPayload & {
  name: string;
};

export type AuthSession = {
  user: User;
  accessToken: string;
  refreshToken: string;
  tokenType: "Bearer";
  accessExpiresAt: string;
  refreshExpiresAt: string;
};

export type StoredAuthSession = AuthSession | null;
