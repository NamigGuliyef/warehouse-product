import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) { }


  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()
    const token = request.headers.authorization?.split(' ')[1]
    if (!token) throw new UnauthorizedException('Invalid token')
    try {
      const payload = this.jwtService.verify(token)
      request.userId = payload.userId
    } catch (error) {
      throw new UnauthorizedException('Invalid token')
    }
    return true
  }
}
