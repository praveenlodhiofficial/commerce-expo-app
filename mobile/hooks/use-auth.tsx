import {
  createContext,
  type PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  clearAuthSession,
  getAuthSession,
  loginWithBackend,
  registerAndLoginWithBackend,
  saveAuthSession,
} from "@/lib/auth";
import type {
  AuthSession,
  LoginPayload,
  RegisterPayload,
  User,
} from "@/types/user.types";

type AuthContextValue = {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: LoginPayload) => Promise<void>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function toState(session: AuthSession | null) {
  return {
    user: session?.user ?? null,
    accessToken: session?.accessToken ?? null,
    refreshToken: session?.refreshToken ?? null,
    isAuthenticated: Boolean(session),
  };
}

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<User | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function hydrateSession() {
      const storedSession = await getAuthSession();

      if (!isMounted) {
        return;
      }

      const nextState = toState(storedSession);
      setUser(nextState.user);
      setAccessToken(nextState.accessToken);
      setRefreshToken(nextState.refreshToken);
      setIsLoading(false);
    }

    void hydrateSession();

    return () => {
      isMounted = false;
    };
  }, []);

  async function applySession(session: AuthSession) {
    await saveAuthSession(session);
    const nextState = toState(session);

    setUser(nextState.user);
    setAccessToken(nextState.accessToken);
    setRefreshToken(nextState.refreshToken);
  }

  async function login(payload: LoginPayload) {
    const session = await loginWithBackend(payload);
    await applySession(session);
  }

  async function register(payload: RegisterPayload) {
    const session = await registerAndLoginWithBackend(payload);
    await applySession(session);
  }

  async function logout() {
    await clearAuthSession();
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
  }

  const isAuthenticated = Boolean(user && accessToken && refreshToken);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
