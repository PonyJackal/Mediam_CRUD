import { Controller, Post, Get, Patch, Body, Request, UseGuards } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { UsersService } from './users.service';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get("profile")
    @ApiOkResponse({ type: UserEntity })
    async getProfile(@Request() req) {
        const { id, username } = req.user;
        const result = await this.usersService.findOne(+id);
        return result;
    }

    @UseGuards(JwtAuthGuard)
    @Patch("update")
    @ApiOkResponse({ type: UserEntity })
    async updateProfile(@Request() req) {
        const { id } = req.user;
        const { username } = req.body;
        const result = await this.usersService.update(+id, username);
        return result;
    }
}
