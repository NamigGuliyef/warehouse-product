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
import { JwtService } from '@nestjs/jwt'
import { RefreshToken } from './schema/refresh-token.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Product.name) private ProductModel: Model<Product>, private jwtService: JwtService,
    @InjectModel(RefreshToken.name) private RefreshTokenModel: Model<RefreshToken>
  ) { }

  async signup(signupData: SignUpDto) {
    const { name, email } = signupData;
    //  email yoxla
    const emailExist = await this.ProductModel.findOne({
      email: signupData.email
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
    return this.generateUserToken(product._id)

  }

  async generateUserToken(_id) {
    const token = this.jwtService.sign({ _id }, { expiresIn: '1h' })
    const refreshToken = uuidv4()
    const expiryDate = new Date()
    expiryDate.setDate(expiryDate.getDate() + 3)
    await this.RefreshTokenModel.create({ token: refreshToken, userId: _id, expiryDate })
    return { token, refreshToken }
  }



  async refreshToken(refreshToken: string) {
    const token = await this.RefreshTokenModel.findOneAndDelete({ token: refreshToken, expiryDate: { $gte: new Date() } })
    if (!token) throw new UnauthorizedException("Refresh token is invalid")
    return this.generateUserToken(token.userId)
  }
}
