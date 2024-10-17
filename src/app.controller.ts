import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from './auth/auth.guard';

@UseGuards(AuthGuard)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  ProtectedRoute(@Req() request) {    
    return { message: "Access", userId: request.userId}
  };
}
