import { Body, Controller, Post } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Controller()
export class AppController {
  private client = ClientProxyFactory.create({
    transport: Transport.TCP,
    options: { port: 4001 },
  });

  @Post('add')
  async createProduct(@Body() name: string, price: string) {
    return await lastValueFrom(
      this.client.send('add_product', { name, price }),
    );
  }
}
