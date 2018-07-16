import React, {Component} from 'react';
import Message from "./Message.jsx";

class MessageList extends Component {
  render(){
    return(
      <main className="messages">
        {this.props.messageList.map (message=>
          <Message type={message.type} key={message.id} username={message.username} content={message.content} color={this.props.currentUser.color} />
        )}
      </main>
    )
  }
}

export default MessageList