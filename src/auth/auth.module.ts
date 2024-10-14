import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, productSchema } from './schema/product.schema';
import { RefreshToken, RefreshTokenSchema } from './schema/refresh-token.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: productSchema }, { name: RefreshToken.name, schema: RefreshTokenSchema }]),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule { }
