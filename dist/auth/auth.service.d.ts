import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginCredentialsDto, RegistrationCredentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private userRepository;
    private jwtService;
    constructor(userRepository: Repository<User>, jwtService: JwtService);
    private logger;
    signUp(authCredentialsDto: RegistrationCredentialsDto): Promise<void>;
    signIn(authCredentialsDto: LoginCredentialsDto): Promise<{
        accessToken: string;
    }>;
    private hashPassword;
    validateUserPassword(authCredentialsDto: LoginCredentialsDto): Promise<User>;
}
