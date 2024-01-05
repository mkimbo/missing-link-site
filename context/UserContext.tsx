"use client";
import { UserFull } from "@/types/redux";
import { ReactNode, createContext, useContext, useReducer } from "react";

export interface UserContextType {
  user: UserFull | null;
  saveUser: (user: UserFull) => void;
  deleteUser: () => void;
}

// Define the initial state
const initialState: UserFull | null = null;

// Define the actions
enum ActionType {
  SAVE_USER = "SAVE_USER",
  DELETE_USER = "DELETE_USER",
}

type Action = {
  type: ActionType;
  payload?: UserFull;
};

// Define the reducer function
const reducer = (state: UserFull | null, action: Action): UserFull | null => {
  switch (action.type) {
    case ActionType.SAVE_USER:
      return action.payload || null;
    case ActionType.DELETE_USER:
      return null;
    default:
      return state;
  }
};

// Create the User Context
const UserContext = createContext<UserContextType>({
  user: null,
  saveUser: () => {},
  deleteUser: () => {},
});

// Create the User Provider component

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const saveUser = (user: UserFull) => {
    dispatch({ type: ActionType.SAVE_USER, payload: user });
  };

  const deleteUser = () => {
    dispatch({ type: ActionType.DELETE_USER });
  };
  const value = { user: state, saveUser, deleteUser };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Create a custom hook to access the User Context
const useUser = () => useContext(UserContext);

export { UserProvider, useUser };
