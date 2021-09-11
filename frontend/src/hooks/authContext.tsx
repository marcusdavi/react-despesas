import React, { useContext } from "react";
import { IAuthContext } from "../interfaces/Interfaces";

export const authContext = React.createContext<IAuthContext>({
  user: {
    name: "",
    email: ""
  },
  onSignOut: () => {}
});

export function useAuthContext() {
  return useContext(authContext);
}
