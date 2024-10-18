import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';
import { MessagePattern } from '@nestjs/microservices';

@Injectable()
export class AppService {
  constructor(
    @InjectModel(Product.name) private readonly productModel: Model<Product>,
  ) {}

  // mikroservisdən istifadə edirik
  @MessagePattern('add_product')
  async createProduct(name: string, price: string): Promise<Product> {
    return await this.productModel.create({ name, price });
  }
}
