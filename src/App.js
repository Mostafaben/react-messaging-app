import React from 'react';
import './style.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import io from 'socket.io-client';
const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling', 'flashsocket'],
});

export default function App() {
  const [user, setUser] = React.useState(null);
  const [activeUsers, setActiveUsers] = React.useState([]);
  const inputRef = React.useRef(null);
  const [messages, setMessages] = React.useState([]);

  React.useEffect(() => {
    socket.on('chat message', (message) => {
      const msgs = messages;
      msgs.push(message);
      setMessages([...msgs]);
    });
    socket.on('user_id', (user) => {
      setUser(user);
    });
    socket.on('active-users', (users) => {
      setActiveUsers(users);
    });
    return () => socket.disconnect();
  }, []);

  function sendMessage() {
    const message = inputRef.current.value;
    if (message.length == 0) return;
    socket.emit('chat message', { message, user });
    inputRef.current.value = '';
  }

  return (
    <div className="mainContainer">
      <div className="activeUsers">
        {activeUsers.map((user) => (
          <User user={user} key={user.id} />
        ))}
      </div>
      <div className="conversation">
        {messages.map((message, index) => (
          <Message
            msg={message}
            key={`${index}_message`}
            sent={message.user.id == user.id}
          />
        ))}
      </div>
      <div className="inputContainer">
        <input type="text" placeholder="write something ..." ref={inputRef} />
        <button className="sendButton" onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

export function User({ user }) {
  return user ? (
    <div className="activeUser">
      <img src={user.img} />
      <p>{user.name}</p>
    </div>
  ) : null;
}

export function Message({ msg, sent }) {
  let classes = 'message';
  if (sent) {
    classes += ' sent';
  } else {
    classes += ' recived';
  }
  return <div className={classes}>{msg.message}</div>;
}
