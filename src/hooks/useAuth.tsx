import { useTypedSelector } from "./useTypedSelector";

export const useAuth = () => useTypedSelector(state => state.auth.user);
