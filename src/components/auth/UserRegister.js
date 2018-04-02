import React from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

import UserRegisterForm from './UserRegisterForm';

class UserRegister extends React.Component {

  state = {
    user: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: ''
    }
  };

  handleChange = ({ target: { name, value }}) => {
    const user = Object.assign({}, this.state.user, { [name]: value });
    this.setState({ user });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .post('/api/register', this.state.user)
      .then((res) => {
        this.props.history.push('/login');
      })
      .catch(err => console.log(err));
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
        <UserRegisterForm
          user={this.state.user}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
        <Link to="/barregister" className="button is-outlined bar-link">I am a bar</Link>
      </div>
    );
  }
}

export default UserRegister;
