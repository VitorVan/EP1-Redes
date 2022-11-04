import React, {} from 'react';
import send from '../../images/send.svg';
import { socket } from '../../App';
import { ChatContainer, EmitButton, Message, MessageContainer, MessagesContainer, UserName, UserMessage } from './styles';

interface IMessage {
  message: string;
  user: string;
}

export default function ChatGame() {
  const [message, setMessage] = React.useState('');
  const [messages, setMessages] = React.useState<IMessage[]>([]);

  socket.on('message', (message: IMessage) => {
    console.log('chegou')
    setMessages([...messages, message]);
  })

  function handleClick(e: any){
    e.preventDefault();
    socket.emit('message', message);
    setMessages([...messages, {message, user: 'me'}]);
    setMessage('');
  }

  function handleChange(e: any ){
    setMessage(e.target.value);
  }

  return (
    <ChatContainer>
      <MessagesContainer>
        {messages.map(message => (
            <div>
              <UserName>{message.user}</UserName>
              <UserMessage>{message.message}</UserMessage>
            </div>
          ))
        }
      </MessagesContainer>
      <MessageContainer>
        <Message onChange={handleChange} value={message}/>
        <EmitButton onClick={handleClick}>
          <img src={send} alt="" />
        </EmitButton>
      </MessageContainer>
    </ChatContainer>
  )
}