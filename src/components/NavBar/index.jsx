import { Link } from 'react-router-dom';
import './index.css';

function NavBar() {
  return (
    <div id="nav" className="nav">
      <Link to="/" className="brand">
        Real World Events
      </Link>
      <nav>
        <Link to="/">List</Link> | <Link to="/event/create">Create</Link>
      </nav>
    </div>
  );
}

export default NavBar;
