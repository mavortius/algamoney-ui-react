import { atom } from 'recoil';

export interface AuthenticationState {
  username: string;
  expiresIn: number;
  isAuthenticated: boolean;
}

export const authenticationState = atom<AuthenticationState>({
  key: 'authentication',
  default: {
    username: 'anonymous',
    expiresIn: 0,
    isAuthenticated: false,
  },
});
