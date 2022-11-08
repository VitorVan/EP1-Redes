/** Materiais técnicos utilizados para inspiração */
/**
 * https://www.youtube.com/watch?v=-jXfKDYJJvo&t=575s
 * https://www.youtube.com/watch?v=HrkECIzaQvE&t=1800s
 */

import { Socket } from 'socket.io';

/** Função responsável por emitir mensagens para todos os usuários presentes na sala (jogo) */
function handleMessage(socket: Socket, message: string) {
  socket.rooms.forEach((room) => {
    socket.to(room).emit('message', { user: socket.id, message });
  });
}

export { handleMessage };
