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
      passwordConfirmation: ''
    }
  };

  handleChange = ({ target: { name, value }}) => {
    const bar = Object.assign({}, this.state.bar, { [name]: value });
    this.setState({ bar });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    Axios
      .post('/api/bars', this.state.bar)
      .then((res) => {
        console.log(res);
        this.props.history.push('/barlogin');
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        <p>Already have an account? Sign in <Link to="/barlogin">here</Link></p>
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
