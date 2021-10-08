import React from 'react';

const Notification = (props) => {
  if (props.data) {
    const { type, message } = props.data;
    return <div className={type}>{message}</div>;
  }
  return null;
};

export default Notification;
