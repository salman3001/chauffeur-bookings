import {
  OnGatewayConnection,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import User from 'src/users/entities/user.entity';
import { Notification } from '../entities/notification.entity';

@WebSocketGateway({
  namespace: 'notifications',
})
export class NotificationsGateway implements OnGatewayConnection {
  @WebSocketServer() server: Server;

  notify(user: User, notification: Notification) {
    const room = `notification-room-${user.id}`;
    this.server.of(room).emit('new-notification', notification);
  }

  handleConnection(client: Socket /*, ...args: any[]*/) {
    const room = `notification-room-${client.handshake.auth?.user?.id}`;
    client.join(room);
    client.emit('room-joined', room);
  }
  // handleDisconnect(client: Socket) {
  //   console.log(`Client connected: ${client.id}`);
  //   client.join('notificationsRoom'); // Joining a room named 'notificationsRoom'
  // }
}
