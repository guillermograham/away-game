import React from 'react';
import Axios from 'axios';
import Moment from 'react-moment';

import Auth from '../../lib/Auth';
import BarCard from '../bars/BarCard';

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
          const newScreenings = this.state.match.screenings.slice();
          newScreenings.push(res.data);
          match = Object.assign({}, this.state.match, { screenings: newScreenings });
        } else {
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
      .then(res => this.setState({ match: res.data }, () => {
        console.log('match id: ', this.state.match._id);
      }))
      .catch(err => console.log(err));

    if (Auth.isAuthenticated()) {
      if (Auth.isBar()) {

        Axios
          .get(`/api/getbarinfo/${Auth.getPayload().barId}`)
          .then(res => this.setState({ bar: res.data }, () => {
            console.log('fixtures: ', this.state.bar.fixtures);
          }))
          .catch(err => console.log(err));
      }
    }
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="bar-info">
            <h2 className="page-title">{this.state.match.teams[0]} vs {this.state.match.teams[1]}</h2>
            <p className="page-info"><i className="fas fa-futbol"></i> Premier League</p>
            <Moment format="MMM Do HH:mm" className="page-info">{this.state.match.date}</Moment>
          </div>
        </div>
        <div className="row">
          <div className="buttons-bar">
            { this.state.bar.fixtures && this.state.match._id && <div>
              { this.hasFixture() &&
                <button onClick={this.addFixture}>Remove screening from {this.state.bar.name}</button>
              }
              { !this.hasFixture() &&
                <button onClick={this.addFixture}>Add screening to {this.state.bar.name}</button>
              }
            </div>}
          </div>
        </div>

        {this.state.match.screenings.length > 0 && <div className="bars-container">
          {this.state.match.screenings.map((bar) =>
            <BarCard
              key={bar._id}
              bar={bar}
            />
          )}
        </div>}
        {this.state.match.screenings.length === 0 &&
        <p className="message">There are currently no bars showing this match.</p>}
      </div>
    );
  }
}

export default MatchesShow;
