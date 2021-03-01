import Navbar from './components/Navbar';
import Router from './components/Router';
import useAuthentication from './hooks/useAuthentication';

function App() {
  const { user } = useAuthentication();
  return <Router>{user.isAuthenticated && <Navbar />}</Router>;
}

export default App;
