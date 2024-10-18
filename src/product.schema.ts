import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ versionKey: false, timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  price: string;
}

export const productSchema = SchemaFactory.createForClass(Product);
