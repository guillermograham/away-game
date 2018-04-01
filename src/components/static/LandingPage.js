import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

class LandingPage extends React.Component {

  state = {

  }

  render() {
    return(
      <div className="landing-page">
        <h2 className="banner-text">Never miss a match.</h2>
        <div className="front-links-container">
          <div>
            <h3>Find the best bars.</h3>
          </div>
          <div>
            <h3>Find a particular match.</h3>
          </div>
        </div>
        {!Auth.isAuthenticated() && <div>
          <Link to="/barregister">Register your bar.</Link>
        </div>}
      </div>
    );
  }
}

export default LandingPage;
