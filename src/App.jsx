import React, {Component} from 'react';
import Chatbar from "./Chatbar.jsx";
import Message from "./Message.jsx";
import MessageList from "./MessageList.jsx";
import uuidv1 from 'uuid/v1';

// let messages = [
//         {
//           id: 1,
//           username: "Bob",
//           content: "Has anyone seen my marbles?"
//         },
//         {
//           id: 2,
//           username: "Anonymous",
//           content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
//         },
//       ]

class App extends Component {
  constructor() {
    super();
    this.state={
      currentUser: {username: "Anonymous", color: null},
      messages: [],
      online: null
    }
  }
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/")

    this.socket.addEventListener("open", (event)=>{
      console.log("Connected to server")
      this.receiveMessage
    })

    this.socket.addEventListener("message", this.receiveMessage);
    this.socket.addEventListener("close", this.receiveMessage);
  }

  createMessage = (msg) => {
    const newMessage = {
      type: "incomingMessage",
      id: uuidv1(),
      username: this.state.currentUser.username,
      content: msg
    }
    this.socket.send(JSON.stringify(newMessage))
  }

  createNotification = (notif) => {
    const newNotification = {
      type: "incomingNotification",
      id: uuidv1(),
      content: "*" + this.state.currentUser.username + " changed to " + notif + "*"
    }
    this.socket.send(JSON.stringify(newNotification))
  }

  handleUsernameChange = (event) => {
    console.log("hello")
    console.log(event.target.value)
    this.setState({currentUser: {username: event.target.value}});
  }

  receiveMessage = e => {
    const msg = JSON.parse(e.data);
    console.log(msg)
    if (msg.type === "userOnline" || msg.type === "userOffline"){
      this.setState({
        online: msg.count,
      })
    } else {
      this.setState(prevState => ({
        ...prevState,
        messages: prevState.messages.concat(msg)
      }));
    }
  };

  render() {
    console.log(this.state.currentUser)
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <p className="navbar-connectedUsers">{this.state.online} user(s) online.</p>
      </nav>
        <MessageList messageList={this.state.messages} currentUser={this.state.currentUser} />
        <Chatbar currentUser={this.state.currentUser} createMessage={this.createMessage} createNotification={this.createNotification} handleUsernameChange={this.handleUsernameChange} />
      </div>
    );
  }
}

export default App;
