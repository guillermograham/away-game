import React from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import Moment from 'react-moment';

// import BackButton from '../utility/BackButton';
import IndividualGoogleMap from '../utility/IndividualGoogleMap';
import Auth from '../../lib/Auth';

class BarsShow extends React.Component {
  state = {
    bar: {}
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

  render() {
    return (
      <div>
        <div className="row">
          <div className="page-banner col-md-10">
            <h2>{this.state.bar.name}</h2>
            <p>{this.state.bar.addressLine1}</p>
            <p>{this.state.bar.city}</p>
            <p>{this.state.bar.postcode}</p>
            <p>{this.state.bar.createdBy}</p>
            { this.state.bar.location && <IndividualGoogleMap className="show-map" center={this.state.bar.location} /> }

          </div>
          {/* <div className="page-banner col-md-2">
            <BackButton history={this.props.history} />
            { `${Auth.getPayload().userId}` === this.state.bar.createdBy && <Link to={`/bars/${this.state.bar.id}/edit`} className="standard-button">
              Edit
            </Link> }
            {' '}
            { Auth.isAuthenticated() === this.state.bar.createdBy && <button className="main-button" onClick={this.deleteBar}>
              Delete
            </button> }
          </div> */}
        </div>
        <div className="row">
          <div className="image-tile col-md-6">
            <img src={this.state.bar.image} className="img-responsive" />
          </div>
          <div className="col-md-g">
            Google map
          </div>
        </div>
        <div className="row">
          <p>{this.state.bar.description}</p>
        </div>
        <div className="row">
          <h4>Fixtures</h4>
          { this.state.bar.fixtures &&
            <div>
              {this.state.bar.fixtures.map(fixture => {
                return(
                  <div
                    key={fixture._id}
                    className="card match-card"
                  >
                    <Moment format="DD/MM/YYYY HH:mm">{fixture.date}</Moment>
                    <p>{fixture.teams[0]}</p>
                    <p>{fixture.teams[1]}</p>
                    <Link to={`/matches/${fixture.matchCode}`}>View match details</Link>
                  </div>
                );
              })}
            </div> }
        </div>
      </div>
    );
  }
}

export default BarsShow;
