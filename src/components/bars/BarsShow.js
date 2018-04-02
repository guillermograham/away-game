import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Moment from 'react-moment';

import IndividualGoogleMap from '../utility/IndividualGoogleMap';
import Auth from '../../lib/Auth';

class BarsShow extends React.Component {
  state = {
    bar: {},
    now: new Date()
  }

  componentWillMount() {
    Axios
      .get(`/api/bars/${this.props.match.params.id}`)
      .then(res => this.setState({ bar: res.data }), () => {
        console.log('reached', this.state);
      })
      .catch(err => console.log(err));
  }

  deleteBar = () => {
    Axios
      .delete(`/api/bars/${this.props.match.params.id}`,
        {
          headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
        })
      .then(() => this.props.history.push('/'))
      .catch(err => console.log(err));
  }

  hasExpired = (matchDateString) => {
    const matchDate = new Date(matchDateString);
    const now = new Date();
    return !!(matchDate < now);
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="bar-info">
            <h2 className="page-title">{this.state.bar.name}</h2>
            <p className="page-info">{this.state.bar.addressLine1}</p>
            <p className="page-info">{this.state.bar.city}</p>
            <p className="page-info">{this.state.bar.postcode}</p>
          </div>
          <div className="buttons-bar">
            {Auth.isAuthenticated() && Auth.isBar() && `${Auth.getPayload().barId}` === this.state.bar._id && <Link to={`/bars/${this.state.bar._id}/edit`} className="standard-button">
              Edit
            </Link> }
          </div>
        </div>
        <div className="container show-container">
          <hr/>
          <div className="row">
            <p className="bar-description">{this.state.bar.description}</p>
          </div>
          <hr/>
          <div className="row map-image-container">
            <div className="image-container">
              <img src={this.state.bar.image} className="img-responsive barshow-image" />
            </div>
            <div className="map-container">
              { this.state.bar.location && <IndividualGoogleMap className="show-map" center={this.state.bar.location} /> }
            </div>
          </div>
          <hr/>
          <div className="row">
            <h3 className="fixtures-title">Upcoming Fixtures</h3>
            { this.state.bar.fixtures &&
              <div>
                {this.state.bar.fixtures.map(fixture => {
                  return(
                    <div
                      key={fixture._id}
                    >
                      {!this.hasExpired(fixture.date) && <div className="card match-card">
                        <div className="match-info">
                          <p className="competition-name"><i className="fas fa-futbol"></i> Premier League</p>
                          <Moment format="MMM Do HH:mm" className="date-time">{fixture.date}</Moment>
                        </div>
                        <div className="team-section">
                          <p className="team-name">{fixture.teams[0]}</p>
                          <p className="versus">vs</p>
                          <p className="team-name">{fixture.teams[1]}</p>
                        </div>
                        <Link to={`/matches/${fixture.matchCode}`} className="match-info-button">View match details</Link>
                      </div>}
                    </div>
                  );
                })}
                {this.state.bar.fixtures.length === 0 &&
                <p className="message">There are currently no scheduled fixtures.</p>}
              </div> }
          </div>
        </div>
      </div>
    );
  }
}

export default BarsShow;
