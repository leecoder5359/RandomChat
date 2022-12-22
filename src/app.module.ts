import { Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { AppController } from './app.controller';
import { ChatsModule } from './chats/chats.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
  }),
  MongooseModule.forRoot(process.env.MONGODB_URI2, {
    useNewUrlParser: true,
  }),
  ChatsModule,
],
  controllers: [AppController],
  providers: [],
})

export class AppModule implements NestModule {
  private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;

  configure() {
    mongoose.set('debug', this.isDev);
  }
}