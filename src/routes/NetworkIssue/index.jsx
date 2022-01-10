import { Link } from 'react-router-dom';

const NetworkIssue = () => {
  return (
    <div>
      <h1>Uh-Oh!</h1>
      <h3>
        It looks like you're experiencing some network issues, please click the
        back button and try again.
      </h3>
      <Link to="/">Or go back to the home page</Link>
    </div>
  );
};

export default NetworkIssue;
