import React, {Component} from 'react';

class MessageList extends Component {
  render(){
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        const messageInput = e.target
        const message = this.props.createMessage(messageInput.value)
        messageInput.value = "";
      }
    }
    return(
    <footer className="chatbar">
      <input className="chatbar-username" defaultValue={this.props.currentUser.username} placeholder="Your Name (Optional)" />
      <input className="chatbar-message" onKeyPress={handleKeyPress} placeholder="Type a message and hit ENTER" />
    </footer>
    )
  }
}

export default MessageList