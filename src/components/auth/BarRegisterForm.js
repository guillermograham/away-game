import React from 'react';

const BarRegisterForm = ({ handleChange, handleSubmit, bar }) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={bar.name}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={bar.email}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={bar.password}
          className="form-control"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={bar.passwordConfirmation}
          className="form-control"
        />
      </div>

      <button className="main-button">Register</button>
    </form>
  );
};

export default BarRegisterForm;
