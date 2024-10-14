import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dtos/signup.dto';
import { LoginDto } from './dtos/login.dto';
import { RefreshTokenDto } from './dtos/refreshtoken.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  // todo : post signup
  @Post('/signup')
  async signup(@Body() signupData: SignUpDto) {
    return await this.authService.signup(signupData);
  }


  // todo : post login
  @Post('/login')
  async login(@Body() loginData: LoginDto) {
    return await this.authService.login(loginData);
  }


  @Post('/refresh')
  async refreshToken(@Body() refreshTokenData: RefreshTokenDto) {
    return this.authService.refreshToken(refreshTokenData.refreshToken)
  }

}
