import { useState } from 'react';
import { useRecoilState } from 'recoil';
import * as auth from '../services/auth';
import { authenticationState } from '../states/authentication';

const useAuthentication = () => {
  const [user, setUser] = useRecoilState(authenticationState);
  const [authError, setAuthError] = useState<Error | null>(null);

  const signIn = async (username: string, password: string) => {
    try {
      const response = await auth.signIn(username, password);
      setUser({ isAuthenticated: true, ...response });
    } catch (error) {
      setAuthError(error);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
    } catch (error) {
      setAuthError(error);
    } finally {
      setUser({ isAuthenticated: false, name: '' });
    }
  };

  return {
    user,
    authError,
    signIn,
    signOut,
  };
};
export default useAuthentication;
