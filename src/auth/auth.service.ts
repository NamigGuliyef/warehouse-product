import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { SignUpDto } from './dtos/signup.dto';
import { Product } from './schema/product.schema';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>,
  ) {}

  async signup(signupData: SignUpDto) {
    const { name, email } = signupData;
    //  email yoxla
    const emailExist = await this.ProductModel.findOne({
      email: signupData.email,
    });
    if (emailExist) throw new BadRequestException('Email artıq mövcuddur');
    // şifrə hash etmək
    const hashedPass = await bcrypt.hash(signupData.password, 10);
    // Bazaya yazmaq
    return await this.ProductModel.create({
      name,
      email,
      password: hashedPass,
    });
  }

  async login(loginData: LoginDto) {
    // Email yoxlanılır
    const { email, password } = loginData;
    const product = await this.ProductModel.findOne({ email });
    if (!product) throw new UnauthorizedException('Email doğru deyil!');
    // Şifrə yoxlanılır
    const comparePass = await bcrypt.compare(password, product.password);
    if (!comparePass) throw new UnauthorizedException('Şifrə doğru deyil');
    // Token alınır
    return { message: 'success' };
  }
}
