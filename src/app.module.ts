import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ global: true, secret: process.env.JWT_SECRET_KEY }),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule { }
