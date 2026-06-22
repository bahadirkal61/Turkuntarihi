import { createContext, useContext, useState, useCallback, useEffect } from "react";
import { trpc } from "@/providers/trpc";

interface AuthUser {
  id: number;
  username: string;
  name: string;
  email: string | null;
  role: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: AuthUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
  login: async () => false,
  logout: () => {},
  isLoading: false,
  error: null,
});

const AUTH_TOKEN_KEY = "turk_tarihi_admin_token";
const AUTH_USER_KEY = "turk_tarihi_admin_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem(AUTH_TOKEN_KEY);
  });
  const [user, setUser] = useState<AuthUser | null>(() => {
    const saved = localStorage.getItem(AUTH_USER_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Verify token on mount
  const verifyQuery = trpc.localAuth.verify.useQuery(
    { token: token || "" },
    {
      enabled: !!token,
      retry: false,
      refetchInterval: 5 * 60 * 1000, // Refresh every 5 minutes
    }
  );

  // Update user when verify query returns data
  useEffect(() => {
    if (verifyQuery.data?.valid && verifyQuery.data.user) {
      setUser(verifyQuery.data.user as AuthUser);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(verifyQuery.data.user));
    } else if (verifyQuery.isError) {
      // Token invalid, clear auth
      setToken(null);
      setUser(null);
      localStorage.removeItem(AUTH_TOKEN_KEY);
      localStorage.removeItem(AUTH_USER_KEY);
    }
  }, [verifyQuery.data, verifyQuery.isError]);

  const loginMutation = trpc.localAuth.login.useMutation({
    onSuccess: (data) => {
      setToken(data.token);
      setUser(data.user as AuthUser);
      setError(null);
      localStorage.setItem(AUTH_TOKEN_KEY, data.token);
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(data.user));
    },
    onError: (err) => {
      setError(err.message || "Giriş başarısız.");
    },
  });

  const login = useCallback(
    async (username: string, password: string): Promise<boolean> => {
      setError(null);
      setIsLoading(true);
      try {
        await loginMutation.mutateAsync({
          username,
          password,
          ipAddress: "",
          userAgent: navigator.userAgent,
        });
        return true;
      } catch {
        return false;
      } finally {
        setIsLoading(false);
      }
    },
    [loginMutation]
  );

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    setError(null);
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(AUTH_USER_KEY);
    window.location.href = "/yonetim/giris";
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token && !!user,
        user,
        login,
        logout,
        isLoading: isLoading || verifyQuery.isLoading,
        error,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
