import { AuthService } from './auth.service';
import { LoginCredentialsDto, RegistrationCredentialsDto } from './dto/auth-credentials.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(authCredentialsDto: LoginCredentialsDto): Promise<{
        accessToken: string;
    }>;
    signUp(authCredentialsDto: RegistrationCredentialsDto): Promise<void>;
}
