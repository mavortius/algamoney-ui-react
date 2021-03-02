import { useState } from 'react';
import { useRecoilState } from 'recoil';
import * as auth from '../services/auth';
import { authenticationState } from '../states/authentication';

const useAuthentication = () => {
  const [authState, setAuthState] = useRecoilState(authenticationState);
  const [authError, setAuthError] = useState<Error | null>(null);

  const signIn = async (username: string, password: string) => {
    try {
      const response = await auth.signIn(username, password);
      const { name, expires_in } = response;
      setAuthState({ isAuthenticated: true, username: name, expiresIn: expires_in });
    } catch (error) {
      setAuthError(error);
    }
  };

  const refreshToken = async () => {
    try {
      const response = await auth.refreshAccessToken();
      const { name, expires_in } = response.data;
      setAuthState({ isAuthenticated: true, username: name, expiresIn: expires_in });
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
      setAuthState({ isAuthenticated: false, username: '', expiresIn: 0 });
    }
  };

  return {
    authState,
    authError,
    signIn,
    refreshToken,
    signOut,
  };
};
export default useAuthentication;
