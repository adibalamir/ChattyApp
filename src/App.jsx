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

const generateRandomId = (alphabet => {
  const alphabetLength = alphabet.length;
  const randoIter = (key, n) => {
    if (n === 0) {
      return key;
    }
    const randoIndex = Math.floor(Math.random() * alphabetLength);
    const randoLetter = alphabet[randoIndex];
    return randoIter(key + randoLetter, n - 1);
  };
  return () => randoIter("", 10);
})("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ");

class App extends Component {
  constructor() {
    super();
    this.state={
      messages: [],
      currentUser: {id: 1, username: "Bob"}
    }
  }
  componentDidMount() {
    this.socket = new WebSocket("ws://localhost:3001/")

    this.socket.addEventListener("open", (event)=>{
      console.log("Connected to server")
    })

    this.socket.addEventListener("message", this.receiveMessage);
  }

  createMessage = (msg) => {
    const newMessage = {
      id: uuidv1(),
      username: this.state.currentUser.username,
      content: msg
    }
    // const messages = this.state.messages.concat(newMessage)
    // return this.setState({messages: messages})
    this.socket.send(JSON.stringify(newMessage));
  }

  receiveMessage = e => {
    const msg = JSON.parse(e.data);
    console.log(msg)
     this.setState(prevState => ({
        ...prevState,
        messages: prevState.messages.concat(msg)
      }));
  };

  render() {
    return (
      <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messageList={this.state.messages} />
      <Chatbar currentUser={this.state.currentUser} createMessage={this.createMessage} />
      </div>
    );
  }
}

export default App;
