import React, {Component} from 'react';

class Chatbar extends Component {
  render(){
    const handleKeyPressMessage = (e) => {
      if (e.key === 'Enter') {
        const messageInput = e.target
        const message = this.props.createMessage(messageInput.value)
        messageInput.value = "";
      }
    }
    const handleKeyPressUsername = (e) => {
      if (e.key === 'Enter') {
        const messageInput = e.target
        const message = this.props.createNotification(messageInput.value)
        this.props.handleUsernameChange(e)
      }
    }
    return(
    <footer className="chatbar">
      <input className="chatbar-username" onKeyPress={handleKeyPressUsername} defaultValue={this.props.currentUser.username} placeholder="Your Name (Optional)" />
      <input className="chatbar-message" onKeyPress={handleKeyPressMessage} placeholder="Type a message and hit ENTER" />
    </footer>
    )
  }
}

export default Chatbar