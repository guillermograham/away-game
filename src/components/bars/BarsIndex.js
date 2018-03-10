import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import Auth from '../../lib/Auth';

class BarsIndex extends React.Component {
  state = {
    bars: []
  }

  componentWillMount() {

    Axios
      .get('/api/bars')
      .then(res => this.setState({ bars: res.data }, () => {
        console.log(this.state);
      }))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="page-banner col-md-12">
            { Auth.isAuthenticated() && <Link to="/bars/new" className="main-button">
              Add Bar
            </Link> }
          </div>
          {this.state.bars.map(bar => {
            return(
              <div key={bar._id} className="image-tile col-md-3 col-sm-6 col-xs-12">
                <Link to={`/bars/${bar._id}`}>
                  <img src={bar.imageOne} className="img-responsive index" />
                  <p>{bar.name}</p>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default BarsIndex;
