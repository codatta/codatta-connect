// Import required dependencies and types
import { TDeviceType } from "@/api/account.api";
import { createContext, useContext, useEffect, useState } from "react";

// Interface defining the configuration for Codatta signin
export interface CodattaSigninConfig {
  channel: string; // Channel through which signin occurs
  device: TDeviceType; // Type of device being used
  app: string; // Application identifier
  inviterCode: string; // Code of the inviter if any
}

// Create context with default values
const CodattaSigninContext = createContext<CodattaSigninConfig>({
  channel: "",
  device: "WEB",
  app: "",
  inviterCode: "",
});

// Custom hook to access the Codatta signin context
export function useCodattaSigninContext() {
  return useContext(CodattaSigninContext);
}

// Props interface for the context provider component
interface CodattaConnectContextProviderProps {
  children: React.ReactNode;
  config: CodattaSigninConfig;
}

// Context provider component for Codatta signin
export function CodattaSinginContextProvider(
  props: CodattaConnectContextProviderProps
) {
  const { config } = props;
  // Initialize state variables with config values
  const [channel, setChannel] = useState(config.channel);
  const [device, setDevice] = useState<TDeviceType>(config.device);
  const [app, setApp] = useState(config.app);
  const [inviterCode, setInviderCode] = useState(config.inviterCode);

  // Update state when config changes
  useEffect(() => {
    setChannel(config.channel);
    setDevice(config.device);
    setApp(config.app);
    setInviderCode(config.inviterCode);
  }, [config]);

  // Provide context values to children components
  return (
    <CodattaSigninContext.Provider
      value={{
        channel,
        device,
        app,
        inviterCode,
      }}
    >
      {props.children}
    </CodattaSigninContext.Provider>
  );
}
