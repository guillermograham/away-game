import React from 'react';

const BarRegisterForm = ({ handleChange, handleSubmit, bar }) => {
  return (
    <form onSubmit={handleSubmit} className="bar-register-form">
      <div className="form-group">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={bar.name}
          className="input"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={bar.email}
          className="input"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={bar.password}
          className="input"
        />
      </div>
      <div className="form-group">
        <input
          type="password"
          name="passwordConfirmation"
          placeholder="Confirm Password"
          onChange={handleChange}
          value={bar.passwordConfirmation}
          className="input"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="addressLine1"
          placeholder="Address"
          onChange={handleChange}
          value={bar.addressLine1}
          className="input"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
          value={bar.city}
          className="input"
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="postcode"
          placeholder="Postcode"
          onChange={handleChange}
          value={bar.postcode}
          className="input"
        />
      </div>
      <div className="form-group">
        <textarea
          type="text"
          name="description"
          placeholder="Enter a brief description of your bar"
          rows="3"
          onChange={handleChange}
          value={bar.description}
          className="textarea"
        >
        </textarea>
      </div>

      <button className="button is-primary login-button">Register</button>
    </form>
  );
};

export default BarRegisterForm;
