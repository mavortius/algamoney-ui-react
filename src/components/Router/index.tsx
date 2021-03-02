import { FC } from 'react';
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import rbac from '../../rbac';
import useAuthentication from '../../hooks/useAuthentication';
import Dashboard from '../../pages/Dashboard';
import Login from '../../pages/Login';
import People from '../../pages/People';
import AccessDenied from '../../pages/AccessDenied';
import PageNotFound from '../../pages/PageNotFound';
import AccountEntrySearch from '../../pages/entries/AccountEntrySearch';

type ProtectedRouteProps = RouteProps & {
  roles?: string[];
};

const ProtectedRoute = ({ children, roles, ...rest }: ProtectedRouteProps) => {
  const { authState } = useAuthentication();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authState.isAuthenticated ? children : <Redirect to={{ pathname: rbac.login.path, state: { from: location } }} />
      }
    />
  );
};

const Router: FC = ({ children }) => (
  <BrowserRouter>
    {children}
    <Switch>
      <ProtectedRoute exact path={rbac.home.path} roles={rbac.home.roles}>
        <Redirect to={rbac.dashboard.path} />
      </ProtectedRoute>
      <Route path={rbac.login.path}>
        <Login />
      </Route>
      <Route path="/access-denied">
        <AccessDenied />
      </Route>
      <ProtectedRoute path={rbac.dashboard.path} roles={rbac.dashboard.roles}>
        <Dashboard />
      </ProtectedRoute>
      <ProtectedRoute path={rbac.entriesSearch.path} roles={rbac.entriesSearch.roles}>
        <AccountEntrySearch />
      </ProtectedRoute>
      <ProtectedRoute path={rbac.people.path} roles={rbac.people.roles}>
        <People />
      </ProtectedRoute>
      <Route>
        <PageNotFound />
      </Route>
    </Switch>
  </BrowserRouter>
);
export default Router;
