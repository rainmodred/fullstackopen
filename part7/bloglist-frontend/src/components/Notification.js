import React from 'react';
import { connect } from 'react-redux';

function Notification(props) {
  const { message, type } = props.notification;

  if (message === '') {
    return null;
  }

  return <div className={`message ${type}`}>{message}</div>;
}

function mapStateToProps(state) {
  return {
    notification: state.notification,
  };
}

export default connect(mapStateToProps)(Notification);
