import { Logger } from '@nestjs/common';
import { 
  ConnectedSocket, 
  MessageBody, 
  OnGatewayConnection, 
  OnGatewayDisconnect, 
  OnGatewayInit, 
  SubscribeMessage, 
  WebSocketGateway 
} from '@nestjs/websockets';
import { Socket } from "socket.io";

@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway 
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  
    private logger = new Logger('chat')

    constructor() {
      this.logger.log('constructor');
    }
    handleDisconnect(@ConnectedSocket() socket: Socket) {
      this.logger.log('DisConnection... ', `${socket.id} ${socket.nsp.name}`);
    }

    handleConnection(@ConnectedSocket() socket: Socket) {
      this.logger.log('Connection... ', `${socket.id} ${socket.nsp.name}`);
    }

    afterInit() {
      this.logger.log("init");
    }
    @SubscribeMessage('new_user')
    handleNewUser(
      @MessageBody() username: string, 
      @ConnectedSocket() socket: Socket,
    ) {
      // console.log('socket', socket.id)
      // console.log('username', username)

      // socket.emit("hello_user", "hello! " + username);

      socket.broadcast.emit('user_connected', username);
    }
}
