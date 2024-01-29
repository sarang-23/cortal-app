import React, { ReactNode, createContext, useMemo, useReducer } from "react";

export interface User {
  name: string;
  id: string;
}

interface UserState {
  user: User;
  loading: boolean;
}

interface Action {
  type: string;
  payload?: any;
}
const initialState: UserState = {
  user: {
    name: "User",
    id: "123",
  },
  loading: false,
};

export const USER_ACTIONS = {
  SET_USER: "SET_USER",
  LOADING: "LOADING",
};

export const UserContext = createContext(initialState);
export const UserDispatchContext = createContext<any>(null);

const userReducer = (state: UserState, action: Action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER: {
      return {
        ...state,
        user: action.payload,
      };
    }
    case USER_ACTIONS.LOADING: {
      return {
        ...state,
        user: action.payload,
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
};
interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={state}>
      <UserDispatchContext.Provider value={dispatch}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};
