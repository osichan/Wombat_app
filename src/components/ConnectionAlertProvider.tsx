import React, { createContext, useContext, useState, ReactNode } from "react";
import ConnectionAlert from "./ConnectionAlert";

interface ConnectionAlertContextProps {
  isConnected: boolean;
  setConnectionStatus: (status: boolean, alertText?: string) => void;
  textOfAlert: string;
}

const defaultContextValue: ConnectionAlertContextProps = {
  isConnected: true,
  setConnectionStatus: () => {},
  textOfAlert: "",
};

const ConnectionAlertContext =
  createContext<ConnectionAlertContextProps>(defaultContextValue);

type ConnectionAlertProviderProps = {
  children: ReactNode;
};

export const ConnectionAlertProvider = ({
  children,
}: ConnectionAlertProviderProps) => {
  const [isConnected, setConnectionStatus] = useState(true);
  const [textOfAlert, setTextOfAlert] = useState("");

  const updateConnectionStatus = (status: boolean, alertText: string = "") => {
    setConnectionStatus(status);
    setTextOfAlert(alertText);
  };

  const contextValue: ConnectionAlertContextProps = {
    isConnected,
    setConnectionStatus: updateConnectionStatus,
    textOfAlert,
  };

  return (
    <ConnectionAlertContext.Provider value={contextValue}>
      {children}
      <ConnectionAlert
        text={textOfAlert}
        visible={isConnected}
        setConnectionStatus={setConnectionStatus}
      />
    </ConnectionAlertContext.Provider>
  );
};

export const useConnectionAlert = (): ConnectionAlertContextProps => {
  const context = useContext(ConnectionAlertContext);
  return context;
};
