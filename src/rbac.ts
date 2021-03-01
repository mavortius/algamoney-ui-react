export const Routes = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  LOGIN: '/login',
  PEOPLE: '/people',
  ACCESS_DENIED: '/access-denied',
};

export default {
  login: {
    path: Routes.LOGIN,
    roles: [],
  },
  home: {
    path: Routes.HOME,
    roles: ['ROLE_READ_CATEGORY', 'ROLE_READ_PERSON', 'ROLE_READ_ACCOUNT_ENTRY'],
  },
  dashboard: {
    path: Routes.DASHBOARD,
    roles: ['ROLE_READ_CATEGORY', 'ROLE_READ_PERSON', 'ROLE_READ_ACCOUNT_ENTRY'],
  },
  people: {
    path: Routes.PEOPLE,
    roles: ['ROLE_READ_PERSON'],
  },
};
