import { FC } from 'react';
import { BrowserRouter, Redirect, Route, RouteProps, Switch } from 'react-router-dom';
import rbac from '../../rbac';
import Dashboard from '../../pages/Dashboard';
import Login from '../../pages/Login';
import People from '../../pages/People';
import AccessDenied from '../../pages/AccessDenied';
import useAuthentication from '../../hooks/useAuthentication';

type ProtectedRouteProps = RouteProps & {
  roles?: string[];
};

const ProtectedRoute = ({ children, roles, ...rest }: ProtectedRouteProps) => {
  const { user } = useAuthentication();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user.isAuthenticated ? children : <Redirect to={{ pathname: rbac.login.path, state: { from: location } }} />
      }
    />
  );
};

const Router: FC = ({ children }) => (
  <BrowserRouter>
    {children}
    <Switch>
      <Route exact path={rbac.login.path}>
        <Login />
      </Route>
      <Route exact path="/access-denied">
        <AccessDenied />
      </Route>
      <ProtectedRoute exact path={rbac.dashboard.path} roles={rbac.dashboard.roles}>
        <Dashboard />
      </ProtectedRoute>
      <ProtectedRoute exact path={rbac.people.path} roles={rbac.people.roles}>
        <People />
      </ProtectedRoute>
      <ProtectedRoute exact path={rbac.home.path} roles={rbac.home.roles}>
        <Redirect to={rbac.dashboard.path} />
      </ProtectedRoute>
    </Switch>
  </BrowserRouter>
);
export default Router;
