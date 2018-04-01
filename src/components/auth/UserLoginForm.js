import React from 'react';

const UserLoginForm = ({ handleChange, handleSubmit, user }) => {
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <div className="form-group">
        <input
          type="text"
          name="email"
          className="input"
          placeholder="Email"
          onChange={handleChange}
          value={user.email}
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          className="input"
          placeholder="Password"
          onChange={handleChange}
          value={user.password}
        />
      </div>
      <button className="button is-primary login-button">Login</button>
    </form>
  );
};

export default UserLoginForm;
