import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

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
      <div>
        <UserLoginForm
          user={this.state.user}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <Link to="/barregister" className="">I am a bar</Link>
      </div>
    );
  }
}

export default UserLogin;
