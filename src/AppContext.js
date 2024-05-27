import { createContext, useContext } from "react";

const AppContext = createContext(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp should be wrapped in AppProvider");
  }

  return context;
};

export const AppProvider = ({
  token,
  handleSetToken,
  user,
  setUser,
  ...props
}) => {
  return (
    <AppContext.Provider
      value={{ token, handleSetToken, user, setUser }}
      {...props}
    />
  );
};
