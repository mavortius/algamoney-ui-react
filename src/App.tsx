import Navbar from './components/Navbar';
import Router from './components/Router';
import useAuthentication from './hooks/useAuthentication';

function App() {
  const { authState } = useAuthentication();
  return <Router>{authState.isAuthenticated && <Navbar />}</Router>;
}

export default App;
