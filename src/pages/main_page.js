import faker from 'faker';
import React from 'react';
import io from 'socket.io-client';
import { format } from 'timeago.js';
import './../styles/main_page.css';

export const socket = io('http://localhost:3000', {
  transports: ['websocket', 'polling', 'flashsocket'],
});

const DATA = {
  activeUsers: new Array(5).fill(null).map(() => {
    return {
      _id: faker.random.uuid(),
      fullName: faker.name.findName(),
      imageUrl: faker.random.image(),
    };
  }),
  messages: new Array(30).fill(null).map((_, index) => {
    return {
      message: faker.lorem.paragraph(),
      isSent: faker.random.boolean(),
      createdAt: faker.date.past(),
    };
  }),
};

export default function MainPage() {
  return (
    <div className="row">
      <div className="col col-3">
        <div className="searchContainer">
          <input className="form-control" placeholder="search..." />
        </div>
        <div className="activeUsers">
          {DATA.activeUsers.map((user, index) => (
            <ActiveUser key={index + '-user'} user={user} />
          ))}
        </div>
        <div className="lastMessages">
          {new Array(4).fill(null).map((_, index) => (
            <LastMessage key={`${index}-lastMessage`} />
          ))}
        </div>
      </div>
      <div className="col col-9">
        <div className="conversationHeader">
          <ConversationUser user={DATA.activeUsers[0]} />
        </div>
        <div className="conversationContent">
          {DATA.messages.map((message, index) => {
            return (
              <Message
                message={message.message}
                key={`${index}-message`}
                isSent={message.isSent}
                createdAt={message.createdAt}
              />
            );
          })}
        </div>
        <div className="conversationAction">
          <input type="text" placeholder="type something...." />
        </div>
      </div>
    </div>
  );
}

export function ActiveUser({ user }) {
  const { imageUrl, fullName } = user;
  return (
    <div className="activeUserContainer">
      <img src={imageUrl} className="avatar" />
      <p>{fullName}</p>
    </div>
  );
}

export function ConversationUser({ user }) {
  return (
    <div className="conversationUserContainer">
      <img src={user.imageUrl} />
      <p>{user.fullName}</p>
    </div>
  );
}

export function LastMessage({
  message = faker.random.words(30),
  sender = DATA.activeUsers[0],
  createdAt = new Date(),
  status = true,
}) {
  return (
    <div className="lastMessageContainer">
      <img src={sender.imageUrl} className="avatar" />
      {status ? <div className="active"></div> : null}
      <div className="content">
        <p>{sender.fullName}</p>
        <span> {message}</span>
      </div>
      <span className="createdAt">{format(createdAt)}</span>
    </div>
  );
}

export function Message({
  message = faker.random.words(30),
  isSent = true,
  status,
  createdAt = new Date(),
  sender,
}) {
  let classes = 'messageContainer ';
  if (isSent) {
    classes += ' sent';
  } else {
    classes += 'recived';
  }

  return (
    <div className={classes}>
      {message}
      <span className="messageTime">{format(createdAt)}</span>
    </div>
  );
}
