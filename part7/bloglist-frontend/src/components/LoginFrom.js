import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Notification from './Notification';
import { useField } from '../hooks/index';
import { login } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';

function LoginForm({ user, login, setNotification }) {
  const username = useField('text');
  const password = useField('password');

  useEffect(() => {
    if (user.error) {
      setNotification({ message: user.error, type: 'error' }, 5);
    }
  }, [password, setNotification, user, username]);

  async function handleSubmit(e) {
    e.preventDefault();
    await login({ username: username.props.value, password: password.props.value });
    username.reset();
    password.reset();
  }
  return (
    <>
      <h2>log in to application</h2>
      <Notification />
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            username
            <input {...username.props} />
          </label>
        </div>
        <div>
          <label>
            password
            <input {...password.props} />
          </label>
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
}

function mapStateToProps(state) {
  return {
    user: state.login,
  };
}

const mapDispatchToProps = {
  login,
  setNotification,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
