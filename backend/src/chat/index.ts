import { Socket } from "socket.io";

//Emit message to all users in room
function handleMessage(socket: Socket, message: string) {
  console.log('message')
  socket.rooms.forEach((room) => {
    socket.to(room).emit('message', {user: socket.id, message});
    console.log(message)
  })
}

export { handleMessage };
