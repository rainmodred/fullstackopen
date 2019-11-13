import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Form, Button, Header } from 'semantic-ui-react';
import Notification from './Notification';
import { useField } from '../hooks/index';
import { login } from '../reducers/loginReducer';
import { setNotification } from '../reducers/notificationReducer';

function LoginForm({ user, login, setNotification }) {
  const username = useField('text', 'username');
  const password = useField('password', 'password');

  useEffect(() => {
    if (user.error) {
      setNotification({ message: user.error, type: 'negative' }, 5);
    }
  }, [password, setNotification, user, username]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (username.props.value === '') {
      setNotification({ message: `username can't be blank`, type: 'negative' }, 5);
      return;
    }
    if (password.props.value === '') {
      setNotification({ message: `password can't be blank`, type: 'negative' }, 5);
      return;
    }
    await login({ username: username.props.value, password: password.props.value });
    username.reset();
    password.reset();
  }
  return (
    <>
      <Header as="h2" textAlign="center">
        Log in to application
      </Header>
      <Notification />
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <input {...username.props} />
        </Form.Field>
        <Form.Field>
          <input {...password.props} />
        </Form.Field>
        <Button color="green" type="submit">
          login
        </Button>
      </Form>
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
