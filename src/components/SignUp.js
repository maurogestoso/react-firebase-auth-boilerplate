import React from 'react';
import { Link, withRouter } from 'react-router-dom';

import * as routes from '../constants/routes';
import { auth } from '../firebase';
import { byPropKey } from '../utils'

const SignUpPage = ({ history }) => (
  <div>
    <h1>SignUpPage</h1>
    <SignUpForm history={history} />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};

class SignUpForm extends React.Component {
  state = INITIAL_STATE;

  onSubmit = event => {
    event.preventDefault();

    const {
      username,
      email,
      passwordOne
    } = this.state;

    const { history } = this.props;

    auth.doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        this.setState(() => ({ ...INITIAL_STATE }))
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState(byPropKey('error', error));
      })
  }

  onChange = event => {
    const { value, dataset: { key } } = event.target;
    this.setState(byPropKey(key, value));
  }

  render() {
    const {
      username,
      email,
      passwordOne,
      passwordTwo,
      error
    } = this.state;

    const isInvalid = 
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';

    return (
      <form onSubmit={this.onSubmit}>
        <input 
          value={username}
          data-key="username"
          onChange={this.onChange}
          type="text"
          placeholder="Full Name"
        />
        <input 
          value={email}
          data-key="email"
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input 
          value={passwordOne}
          data-key="passwordOne"
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <input 
          value={passwordTwo}
          data-key="passwordTwo"
          onChange={this.onChange}
          type="password"
          placeholder="Confirm Password"
        />
        <button type="submit" disabled={isInvalid}>
          Sign Up
        </button>

        { error && <p>{ error.message }</p>}
      </form>
    )
  }
}

const SignUpLink = () => (
  <p>
    Don't have an account?
    {' '}
    <Link to={routes.SIGN_UP}>Sign Up</Link>
  </p>
)

export default withRouter(SignUpPage);

export {
  SignUpForm,
  SignUpLink,
};
