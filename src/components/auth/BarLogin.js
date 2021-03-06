import React from 'react';
import Axios from 'axios';

import UserLoginForm from './UserLoginForm';

import Auth from '../../lib/Auth';

class BarLogin extends React.Component {

  state = {
    user: {
      email: '',
      password: ''
    }
  };

  handleChange = ({ target: { name, value } }) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .post('/api/barlogin', this.state.user)
      .then((res) => {
        console.log(res);
        Auth.setToken(res.data.token);
        this.props.history.push(`/bars/${res.data.bar._id}`);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="user-login">
        <div className="row">
          <div className="index-info"></div>
        </div>
        <div className="row">
          <div className="index-bar"></div>
        </div>
        <UserLoginForm
          user={this.state.user}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

export default BarLogin;
