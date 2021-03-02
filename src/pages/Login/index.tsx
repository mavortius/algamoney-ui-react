import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import useAuthentication from '../../hooks/useAuthentication';

interface LocationState {
  from: {
    pathname: string;
  };
}

const Login = () => {
  const history = useHistory();
  const location = useLocation<LocationState>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn, authError } = useAuthentication();
  const { from } = location.state || { from: { pathname: '/' } };

  const login = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signIn(email, password);
    history.replace(from);
  };

  return (
    <div className="container" style={{ maxWidth: '400px', margin: 'auto' }}>
      {authError && <p>{authError.message}</p>}

      <form autoComplete="off" onSubmit={login}>
        <div className="p-fluid">
          <div className="p-col-12">
            <h1>Login</h1>
          </div>
          <div className="p-field p-grid">
            <div className="p-col-12 p-md-10">
              <InputText placeholder="E-mail" value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
            </div>
          </div>
          <div className="p-field p-grid">
            <div className="p-col-12 p-md-10">
              <Password
                placeholder="Senha"
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                toggleMask
                feedback={false}
              />
            </div>
          </div>

          <div className="p-col-12 p-md-10">
            <Button type="submit" label="Login" disabled={!email || !password} />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
