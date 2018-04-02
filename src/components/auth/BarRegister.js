import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import BarRegisterForm from './BarRegisterForm';

class BarRegister extends React.Component {

  state = {
    bar: {
      name: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      addressLine1: '',
      city: '',
      postcode: '',
      location: {
        lat: '',
        lng: ''
      },
      description: ''
    }
  };

  handleChange = ({ target: { name, value }}) => {
    const bar = Object.assign({}, this.state.bar, { [name]: value });
    this.setState({ bar });
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const str = `${this.state.bar.addressLine1} ${this.state.bar.postcode}`;
    const replaced = str.split(' ').join('+');

    Axios({
      method: 'GET',
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${replaced}&key=AIzaSyD1mbsdVHA4ozkBwbmEugzszF6CucFZ3WA`,
      skipAuthorization: true
    })
      .then((res) => {
        const bar = Object.assign({}, this.state.bar, { location: res.data.results[0].geometry.location });
        this.setState({ bar });
      })
      .then(() => {
        Axios
          .post('/api/bars', this.state.bar)
          .then(() => this.props.history.push('/barlogin'))
          .catch(err => console.log(err));
      });
  }

  render() {
    return (
      <div>
        <div className="row">
          <div className="index-info"></div>
        </div>
        <div className="row">
          <div className="index-bar"></div>
        </div>
        <p className="already-registered">Already registered your bar? Sign in <Link to="/barlogin">here</Link></p>
        <BarRegisterForm
          bar={this.state.bar}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default BarRegister;
