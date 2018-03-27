import React from 'react';
import Axios from 'axios';

import UserLoginForm from './UserLoginForm';

import Auth from '../../lib/Auth';

class UserLogin extends React.Component {

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
      .post('/api/login', this.state.user)
      .then((res) => {
        console.log(res);
        Auth.setToken(res.data.token);
        this.props.history.push('/');
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <UserLoginForm
        user={this.state.user}
        handleChange={this.handleChange}
        handleSubmit={this.handleSubmit}
      />
    );
  }
}

export default UserLogin;
