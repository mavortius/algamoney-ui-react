import { atom } from 'recoil';

type User = {
  name: string;
  isAuthenticated: boolean;
};

export const authenticationState = atom<User>({
  key: 'user',
  default: {
    name: '',
    isAuthenticated: false,
  },
});
