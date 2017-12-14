import React from 'react';
import { Link } from 'react-router-dom';

import { byPropKey } from '../utils';
import { auth } from '../firebase';
import * as routes from '../constants/routes';

const PasswordForgetPage = () => (
  <div>
    <h1>PasswordForgetPage</h1>
    <PasswordForgetForm />
  </div>
);

const INITIAL_STATE = {
  email: '',
  error: null,
};

class PasswordForgetForm extends React.Component {
  state = { ...INITIAL_STATE }

  onChange = event => {
    const { value, dataset: { key } } = event.target;
    this.setState(byPropKey(key, value));
  }

  onSubmit = event => {
    console.log('hello')
    event.preventDefault();
    auth.doPasswordReset(this.state.email)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      });
  }

  render() {
    const { email, error } = this.state;
    return (
      <form onSubmit={this.onSubmit}>
        <input 
          type="text"
          data-key="email"
          value={email}
          onChange={this.onChange}
          placeholder="Email Address"
        />
        <button type="submit">
          Reset My Password
        </button>

        { error && <p>{error.message}</p> }
      </form>
    )
  }
}

const PasswordForgetLink = () => (
  <p>
    <Link to={routes.PASSWORD_FORGET}>Forgot Password?</Link>
  </p>
)

export default PasswordForgetPage;

export {
  PasswordForgetForm,
  PasswordForgetLink,
};
