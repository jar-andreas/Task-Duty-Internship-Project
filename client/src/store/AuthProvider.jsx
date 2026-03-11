import { getAuthUser, logoutUser, refreshAccessToken } from "@/api/auth";
import LazySpinner from "@/components/LazySpinner";
import { AuthProviderContext } from "@/hooks/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [accessToken, setAccessToken] = useState(() =>
    localStorage.getItem("accessToken"),
  );
  const [isAuthenticating, setIsAuthenticating] = useState(false);

  useEffect(() => {
    if (accessToken) {
      localStorage.setItem("accessToken", accessToken);
    } else {
      localStorage.removeItem("accessToken");
    }
  }, [accessToken]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const refreshTokenAction = useCallback(async () => {
    try {
      const res = await refreshAccessToken();
      if (res?.status === 200 && res.data?.data) {
        setAccessToken(res.data.data);
        return res.data.data;
      }
      setAccessToken(null);
      setUser(null);
      return null;
    } catch (error) {
      import.meta.env.DEV && console.error("Error refreshing token:", error);
      setAccessToken(null);
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    let needsRefresh = false;
    if (!accessToken) {
      refreshTokenAction();
      return;
    }
    try {
      const decodedToken = jwtDecode(accessToken);
      const expirationTime = decodedToken?.exp ?? 0;
      const currentTime = Date.now();
      const refreshBuffer = 2 * 60 * 1000;
      const msUntilExpiry = expirationTime * 1000 - currentTime;
      if (msUntilExpiry <= refreshBuffer) {
        needsRefresh = true;
      }
    } catch {
      needsRefresh = true;
    }
    if (needsRefresh) {
      refreshTokenAction();
      return;
    }
    //if token is valid and not expiring soon fetch user
    setIsAuthenticating(true);
    async function fetchUser() {
      try {
        const res = await getAuthUser(accessToken);
        if (res.status === 200) {
          setUser(res.data.data);
        }
      } catch (error) {
        console.error(error);
        //if error force refresh token
        await refreshTokenAction();
      } finally {
        setIsAuthenticating(false);
      }
    }
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken]);

  const mutation = useMutation({
    mutationFn: logoutUser,
    onSuccess: (res) => {
      toast.success(res?.data?.message || "Logout Successful");
      queryClient.clear();
      setAccessToken(null);
      setUser(null);
    },
    onError: (err) => {
      toast.error(
        err?.response?.data?.message ||
          err?.response.data ||
          "Something went wrong",
      );
    },
  });

  const handleLogout = async () => mutation.mutate(accessToken);

  if (isAuthenticating) {
    return <LazySpinner />;
  }

  const contextValue = {
    accessToken,
    user,
    setAccessToken,
    setUser,
    handleLogout,
  };
  return (
    <AuthProviderContext.Provider value={contextValue}>
      {children}
    </AuthProviderContext.Provider>
  );
}
