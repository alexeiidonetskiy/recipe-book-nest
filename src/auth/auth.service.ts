import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcryptjs';
import {
  LoginCredentialsDto,
  RegistrationCredentialsDto,
} from './dto/auth-credentials.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  private logger = new Logger('AuthService');

  async signUp(authCredentialsDto: RegistrationCredentialsDto): Promise<void> {
    const { username, password, email } = authCredentialsDto;

    const user = new User();
    user.username = username;
    user.email = email;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await this.userRepository.save(user);
    } catch (e) {
      if (e.code === '23505') {
        throw new ConflictException('Username already exists');
      } else {
        throw new InternalServerErrorException(e);
      }
    }
  }

  async signIn(
    authCredentialsDto: LoginCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, username } =
      await this.validateUserPassword(authCredentialsDto);

    if (!email) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayload = { username };

    const accessToken = await this.jwtService.sign(payload);
    this.logger.debug(
      `Generated  JWT Token with payload ${JSON.stringify(payload)}`,
    );

    return { accessToken };
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }

  async validateUserPassword(
    authCredentialsDto: LoginCredentialsDto,
  ): Promise<User> {
    const { email, password } = authCredentialsDto;
    const user = await this.userRepository.findOneBy({ email });

    if (user && (await user.validatePassword(password))) {
      return user;
    } else {
      return null;
    }
  }
}
