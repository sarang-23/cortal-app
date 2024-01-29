import { useContext } from "react";
import {
  USER_ACTIONS,
  User,
  UserContext,
  UserDispatchContext,
} from "../context/UserContext";

export const useUser = () => {
  const { user } = useContext(UserContext);
  const dispatch = useContext(UserDispatchContext);

  const setUser = (user: User) =>
    dispatch({
      type: USER_ACTIONS.SET_USER,
      payload: user,
    });

  const setLoading = (loading: boolean) => {
    dispatch({
      type: USER_ACTIONS.LOADING,
      payload: loading,
    });
  };

  if (!user) throw new Error("useUser must be used inside the UserProvider");

  return { user, setUser, setLoading };
};
