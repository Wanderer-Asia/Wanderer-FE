import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axiosWithConfig, { setAxiosConfig } from "@/utils/apis/axiosWithConfig";

import { Profile } from "../apis/users";
import { getProfile } from "../apis/users/api";
import { useToast } from "@/components/ui/use-toast";

interface Context {
  token: string;
  user: Partial<Profile>;
  changeToken: (token?: string) => void;
  fetchProfile: () => void;
}

interface Props {
  children: ReactNode;
}

const contextValue = {
  token: "",
  user: {},
  changeToken: () => {},
  fetchProfile: () => {},
};

const TokenContext = createContext<Context>(contextValue);

export function TokenProvider({ children }: Readonly<Props>) {
  const { toast } = useToast();

  const [token, setToken] = useState(localStorage.getItem("token") ?? "");
  const [user, setUser] = useState<Partial<Profile>>({});

  useEffect(() => {
    setAxiosConfig(token);
    token !== "" && fetchProfile();
  }, [token]);

  axiosWithConfig.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response.status === 401) {
        changeToken();
      }

      return Promise.reject(error);
    },
  );

  const fetchProfile = useCallback(async () => {
    try {
      const result = await getProfile();
      setUser(result.data);
    } catch (error: any) {
      toast({
        title: "Oops! Something went wrong.",
        description: error.message.toString(),
        variant: "destructive",
      });
    }
  }, [token]);

  const changeToken = useCallback(
    (token?: string) => {
      console.log(token);

      const newToken = token ?? ""; // const newToken = token ? token : "";
      setToken(newToken);
      if (token) {
        localStorage.setItem("token", newToken);
      } else {
        localStorage.removeItem("token");
        setUser({});
      }
    },
    [token],
  );

  const tokenContextValue = useMemo(
    () => ({
      token,
      user,
      changeToken,
      fetchProfile,
    }),
    [token, user, changeToken, fetchProfile],
  );

  return (
    <TokenContext.Provider value={tokenContextValue}>
      {children}
    </TokenContext.Provider>
  );
}

export function useToken() {
  const context = useContext(TokenContext);

  if (context === undefined) {
    throw new Error("ERROR, useToken must be used within TokenContext");
  }

  return context;
}
