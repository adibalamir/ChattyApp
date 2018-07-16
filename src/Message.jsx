import React, {Component} from 'react';

function Message (props) {
  if (props.type === "incomingMessage") {
    return (
      <div className="message">
        <span style={{color: props.color}} className="message-username">{props.username}</span>
        <span className="message-content">{props.content}</span>
      </div>
    )
  }
  if (props.type === "incomingNotification") {
    return (
      <div className="notification">
        <span className="notification-content"><em>{props.content}</em></span>
      </div>
    )
  }
}

export default Message