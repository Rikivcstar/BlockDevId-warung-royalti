// context/StacksContext.tsx
"use client";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import { createContext, useState, useContext } from "react";

const appConfig = new AppConfig(["store_write", "publish_data"]);
export const userSession = new UserSession({ appConfig });

const StacksContext = createContext<any>(null);

export function StacksProvider({ children }: { children: React.ReactNode }) {
  const [userData, setUserData] = useState<any>(null);

  const connectWallet = () => {
    showConnect({
      userSession,
      appDetails: {
        name: "Warung Royalti",
        icon: window.location.origin + "/logo.png",
      },
      onFinish: () => {
        const data = userSession.loadUserData();
        setUserData(data);
      },
    });
  };

  const disconnectWallet = () => {
    userSession.signUserOut();
    setUserData(null);
  };

  return (
    <StacksContext.Provider
      value={{ userData, connectWallet, disconnectWallet }}
    >
      {children}
    </StacksContext.Provider>
  );
}

export const useStacks = () => useContext(StacksContext);
