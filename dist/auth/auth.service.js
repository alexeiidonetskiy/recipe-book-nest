"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
const typeorm_2 = require("@nestjs/typeorm");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    constructor(userRepository, jwtService) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.logger = new common_1.Logger('AuthService');
    }
    async signUp(authCredentialsDto) {
        const { username, password, email } = authCredentialsDto;
        const user = new user_entity_1.User();
        user.username = username;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, user.salt);
        try {
            await this.userRepository.save(user);
        }
        catch (e) {
            if (e.code === '23505') {
                throw new common_1.ConflictException('Username already exists');
            }
            else {
                throw new common_1.InternalServerErrorException(e);
            }
        }
    }
    async signIn(authCredentialsDto) {
        const { email, username } = await this.validateUserPassword(authCredentialsDto);
        if (!email) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { username };
        const accessToken = await this.jwtService.sign(payload);
        this.logger.debug(`Generated  JWT Token with payload ${JSON.stringify(payload)}`);
        return { accessToken };
    }
    async hashPassword(password, salt) {
        return bcrypt.hash(password, salt);
    }
    async validateUserPassword(authCredentialsDto) {
        const { email, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({ email });
        if (user && (await user.validatePassword(password))) {
            return user;
        }
        else {
            return null;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map