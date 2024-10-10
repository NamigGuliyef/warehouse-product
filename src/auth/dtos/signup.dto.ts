import { IsEmail, IsString, Matches, MinLength } from "class-validator";

export class SignUpDto {
  @IsString()
  name: string;
  @IsEmail()
  email: string;
  @MinLength(6)
  @Matches(new RegExp('^[A-Za-z0-9]+$'))
  password: string;
}
