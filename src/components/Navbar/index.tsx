import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import './styles.css';
import useAuthentication from '../../hooks/useAuthentication';

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();
  const { authState, signOut } = useAuthentication();

  async function handleLogout() {
    await signOut();
    history.push('/');
  }

  return (
    <nav className="navbar">
      <div className="container">
        <div className="ui-g">
          <div className="ui-g-12">
            <a href="#" className="navbar-toggle" onClick={() => setShowMenu(!showMenu)}>
              <i className="pi pi-bars" />
            </a>
          </div>
        </div>
      </div>
      {showMenu && (
        <ul className="navbar-menu">
          <li className="navbar-user">{authState.username}</li>
          <li className="navbar-menu-item">
            <NavLink to="/dashboard">Dashboard</NavLink>
          </li>
          <li className="navbar-menu-item">
            <NavLink to="/entries">Lançamentos</NavLink>
          </li>
          <li className="navbar-menu-item">
            <NavLink to="/people">Pessoas</NavLink>
          </li>
          <li className="navbar-menu-item">
            <NavLink to="/reports">Relatórios</NavLink>
          </li>
          <li className="navbar-menu-item">
            <a href="/" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
