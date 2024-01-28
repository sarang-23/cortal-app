/*
 About : This component defines the context for the application.
 It is responsible for managing the zoomLevels and active Node tracking. 

*/

import React, { ReactNode, createContext, useReducer } from "react";

interface AppContext {
  zoomLevel: number;
}

const initialState: AppContext = {
  zoomLevel: 0,
};

export const ACTIONS = {
  ZOOM: "ZOOM",
};

const appReducer = (state: AppContext, action: any) => {
  switch (action.type) {
    case ACTIONS.ZOOM: {
      return {
        ...state,
        zoomLevel: action.payload,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
export const AppStateContext = createContext(initialState);
export const AppDispatchContext = createContext<any>(null);

interface GlobalContextProps {
  children: ReactNode;
}

export const GlobalContext: React.FC<GlobalContextProps> = ({ children }) => {
  const [appState, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppStateContext.Provider value={appState}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};
