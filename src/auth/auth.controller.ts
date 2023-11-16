import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  LoginCredentialsDto,
  RegistrationCredentialsDto,
} from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signin')
  signIn(
    @Body(ValidationPipe) authCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.signIn(authCredentialsDto);
  }

  @Post('/signup')
  signUp(
    @Body(ValidationPipe) authCredentialsDto: RegistrationCredentialsDto,
  ): Promise<void> {
    return this.authService.signUp(authCredentialsDto);
  }
}
