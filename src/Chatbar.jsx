import React, {Component} from 'react';

class Chatbar extends Component {
  render(){
    const handleKeyPressM = (e) => {
      if (e.key === 'Enter') {
        const messageInput = e.target
        const message = this.props.createMessage(messageInput.value)
        messageInput.value = "";
      }
    }
    const handleKeyPressU = (e) => {
      if (e.key === 'Enter') {
        const messageInput = e.target
        const message = this.props.createNotification(messageInput.value)
        this.props.handleUsernameChange(e)
      }
    }
    return(
    <footer className="chatbar">
      <input className="chatbar-username" onKeyPress={handleKeyPressU} defaultValue={this.props.currentUser.username} placeholder="Your Name (Optional)" />
      <input className="chatbar-message" onKeyPress={handleKeyPressM} placeholder="Type a message and hit ENTER" />
    </footer>
    )
  }
}

export default Chatbar