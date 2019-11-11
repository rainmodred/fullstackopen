import React from 'react';
import { connect } from 'react-redux';
import { Message } from 'semantic-ui-react';

function Notification(props) {
  const { message, type } = props.notification;

  if (message === '') {
    return null;
  }

  if (type === 'positive') {
    return <Message positive>{message}</Message>;
  }

  return <Message negative>{message}</Message>;
}

function mapStateToProps(state) {
  return {
    notification: state.notification,
  };
}

export default connect(mapStateToProps)(Notification);
