import React from 'react';
import Axios from 'axios';

import Auth from '../../lib/Auth';

class MatchesShow extends React.Component {
  state = {
    match: {
      date: '',
      teams: [],
      _id: '',
      screenings: []
    },
    bar: {}
  }

  addFixture = () => {
    if (this.hasFixture()) {
      console.log('has fixture');
    }

    let match = null;

    Axios
      .post('/api/addscreening', this.state)
      .then(res => {
        if (this.addOrRemoveFixture(res.data)) {
          console.log('add');

          const newScreenings = this.state.match.screenings.slice();
          newScreenings.push(res.data);
          match = Object.assign({}, this.state.match, { screenings: newScreenings });

        } else {
          console.log('remove');

          const newScreenings = this.state.match.screenings.slice();
          const index = newScreenings.indexOf(res.data._id);
          newScreenings.splice(index, 1);
          match = Object.assign({}, this.state.match, { screenings: newScreenings });
        }
        this.setState({ bar: res.data, match: match });
      })
      .catch(err => console.log(err));
  }

  hasFixture = () => {
    return this.state.bar.fixtures.some((match) => {
      return match === this.state.match._id;
    });
  }

  addOrRemoveFixture = (response) => {
    return response.fixtures.some((match) => {
      return match === this.state.match._id;
    });
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
              <p>matchId: {this.state.match._id}</p>
              <p>{this.state.match.teams[0]}</p>
              <p>{this.state.match.teams[1]}</p>
            </div>}
            { this.state.bar.name && <div>
              <p>{this.state.bar.name}</p>
              <p>barId: {this.state.bar._id}</p>
              { this.hasFixture() &&
                <button onClick={this.addFixture}>Remove screening</button>
              }
              { !this.hasFixture() &&
                <button onClick={this.addFixture}>Add screening</button>
              }
            </div>}
          </div>
        </div>
        { this.state.match.screenings && this.state.match.screenings.map((bar) =>
          <p key={bar._id}>{bar.name}</p>
        )}
      </div>
    );
  }
}

export default MatchesShow;
