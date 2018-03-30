import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import Auth from '../../lib/Auth';

const NavBar = ({ history, toggleBurger, showBurger }) => {

  // could define this in app and pass down via props
  function logout(e) {
    e.preventDefault();
    Auth.logout();
    history.push('/');
  }

  let type = null;
  if (Auth.getPayload()) type = Auth.getPayload().type;

  return(
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item"><h1>awayGame</h1></Link>
        <div className={`${(showBurger ? 'is-active' : '')} navbar-burger burger`} data-target="nav-menu" onClick={toggleBurger}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div className={`${(showBurger ? 'is-active' : '')} navbar-menu`} onClick={toggleBurger} id="nav-menu">
        <div className="navbar-end">
          <div className="navbar-item">
            <Link to="/bars" className=""><i className="fas fa-beer"></i> Bars</Link>
          </div>
          <div className="navbar-item">
            <Link to="/matches" className=""><i className="fas fa-futbol"></i> Matches</Link>
          </div>
          { Auth.isAuthenticated() && <div className="navbar-item">
            <a href="#" className="" onClick={logout}><i className="fas fa-sign-out-alt"></i> Logout</a>
          </div>}
          <div className="navbar-item">
            { !Auth.isAuthenticated() && <Link to="/login" className=""><i className="fas fa-sign-in-alt"></i> Login</Link> }
          </div>
          <div className="navbar-item">
            { !Auth.isAuthenticated() && <Link to="/register" className=""><i className="fas fa-user-plus"></i> Register</Link> }
          </div>
        </div>
      </div>
    </nav>
  );
};

// browser router will send the global history
export default withRouter(NavBar);
