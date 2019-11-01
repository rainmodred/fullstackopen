import React from 'react';

const Notification = ({ store }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  };
  const { message } = store.getState().notification;
  if (!message) return null;

  return <div style={style}>{message}</div>;
};

export default Notification;
