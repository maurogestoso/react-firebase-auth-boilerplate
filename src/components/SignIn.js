import React from 'react';
import { withRouter } from 'react-router-dom';

import { SignUpLink } from './SignUp';
import * as routes from '../constants/routes';
import {doSignInWithEmailAndPassword} from '../firebase/auth';
import {byPropKey} from '../utils';

const SignInPage = ({ history }) => (
  <div>
    <h1>SignInPage</h1>
    <SignInForm history={history} />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInForm extends React.Component {
  state = { ...INITIAL_STATE }

  onChange = event => {
    const {value, dataset: { key } } = event.target;
    this.setState(byPropKey(key, value));
  }

  onSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;
    const { history } = this.props;
    doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
  }

  render () {
    const {
      email,
      password,
      error
    } = this.state;

    const isInvalid = 
      email === '' ||
      password === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input 
          type="text"
          value={email}
          data-key="email"
          onChange={this.onChange}
          placeholder="Email Address"
        />
        <input 
          type="password"
          value={password}
          data-key="password"
          onChange={this.onChange}
          placeholder="Password"
        />
        <button type="submit" disabled={isInvalid}>
          Sign In
        </button>

        { error && <p>{error.message}</p> }
      </form>
    )
  }

}

export default withRouter(SignInPage);

export {
  SignInForm,
};
