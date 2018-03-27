import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';

class MatchesShow extends React.Component {
  state = {
    match: {},
    bar: {}
  }

  componentWillMount() {
    Axios
      .get(`/api/matches/${this.props.match.params.matchCode}`)
      .then(res => this.setState({ match: res.data }), () => {
        console.log('reached', this.state);
      })
      .catch(err => console.log(err));

    if (Auth.isAuthenticated()) {
      if (Auth.isBar()) {

        Axios
          .get(`/api/bars/${Auth.getPayload().barId}`)
          .then(res => this.setState({ bar: res.data }), () => {
            console.log('reached', this.state);
          })
          .catch(err => console.log(err));
      }
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="page-banner col-md-10">
            <h2>{this.state.match.date}</h2>
            { this.state.match.teams && <div>
              <p>{this.state.match.teams[0]}</p>
              <p>{this.state.match.teams[1]}</p>
            </div>}
            { this.state.bar.name && <div>
              <p>{this.state.bar.name}</p>
            </div>}
          </div>
        </div>
      </div>
    );
  }
}

export default MatchesShow;
