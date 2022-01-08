import { Link, useLocation } from 'react-router-dom';

function NotFound() {
  const location = useLocation();

  return (
    <div>
      <h1>Oops!</h1>
      <h3>
        The {(location.state && location.state.resource) || 'page'} you're
        looking for is not here.
      </h3>
      <Link to="/">Back to the home page</Link>
    </div>
  );
}

export default NotFound;
