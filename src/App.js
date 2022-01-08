import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import NotificationContainer from './components/NotificationContainer';
import './App.css';

function App() {
  return (
    <div>
      <NavBar />
      <NotificationContainer />
      <Outlet />
    </div>
  );
}

export default App;
