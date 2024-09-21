import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { Repository } from "typeorm";
import { User } from "../entities/user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { JwtPayload } from "../interfaces";
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {
        super({
            secretOrKey: process.env.JWT_SECRET,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }
    async validate(payload: JwtPayload) {
        const { id } = payload;
        const user = await this.userRepository.findOneBy({ id });
        if (!user) {
            throw new UnauthorizedException('Token not valid');
        }
        if (!user.is_active) {
            throw new UnauthorizedException('User is inactive, talk with an admin');
        }
        return user;
    }
}