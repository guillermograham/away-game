import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Auth from '../../lib/Auth';

const Navbar = ({ history }) => {

  // could define this in app and pass down via props
  function logout(e) {
    e.preventDefault();
    Auth.logout();
    history.push('/');
  }

  return(
    <nav>
      <Link to="/matches">Matches</Link>
      {' '}
      <Link to="/bars">Bars</Link>
      {' '}
      { !Auth.isAuthenticated() && <Link to="/login" className="">Login</Link> }
      {' '}
      { !Auth.isAuthenticated() && <Link to="/register" className="">Register</Link> }
      {' '}
      { Auth.isAuthenticated() && <a href="#" className="" onClick={logout}>Logout</a> }
    </nav>
  );
};

// browser router will send the global history
export default withRouter(Navbar);
