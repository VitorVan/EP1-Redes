import React, {} from 'react';

import { socket } from '../../App';
import { ChatContainer, EmitButton, Message, MessageContainer, MessagesContainer } from './styles';

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
              <p>{message.user}</p>
              <p>{message.message}</p>
            </div>
          ))
        }
      </MessagesContainer>
      <MessageContainer>
        <Message onChange={handleChange} value={message}/>
        <EmitButton onClick={handleClick}>Enviar</EmitButton>
      </MessageContainer>
    </ChatContainer>
  )
}
