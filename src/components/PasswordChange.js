import React from 'react';

import { byPropKey } from '../utils';
import { auth } from '../firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class PasswordChangeForm extends React.Component {
  state = { ...INITIAL_STATE }

  onChange = event => {
    const { value, dataset: { key } } = event.target;
    this.setState(byPropKey(key, value));
  }

  onSubmit = event => {
    event.preventDefault();
    auth.doPasswordUpdate(this.state.passwordOne)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
      })
      .catch(error => {
        this.setState(byPropKey('error', error))
      });
  }

  render() {
    const { passwordOne, passwordTwo, error } = this.state;
    const isInvalid = 
      passwordOne === '' ||
      passwordOne !== passwordTwo;

    return (
      <form onSubmit={this.onSubmit}>
        <input 
          value={passwordOne}
          type="password"
          placeholder="Password"
          onChange={this.onChange}
          data-key="passwordOne"
        />
        <input 
          value={passwordTwo}
          type="password"
          placeholder="Repeat Password"
          onChange={this.onChange}
          data-key="passwordTwo"
        />
        <button type="submit" disabled={isInvalid}>
          Change My Password
        </button>
        { error && <p>{error.message}</p> }
      </form>
    );
  }
}

export default PasswordChangeForm;
