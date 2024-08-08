import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() user: Partial<User>): Promise<User> {
    return this.userService.createUser(user);
  }

  @Get('search')
  async searchUsers(
    @Query('username') username?: string,
    @Query('minAge') minAge?: number,
    @Query('maxAge') maxAge?: number,
  ): Promise<User[]> {
    return this.userService.searchUsers(username, minAge, maxAge);
  }
  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return this.userService.findUsers();
  }

  @Put(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() user: Partial<User>,
  ): Promise<User> {
    const existingUser = await this.userService.findUserById(id);
    if (existingUser) {
      return this.userService.createUser({ ...existingUser, ...user });
    }
    return null;
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: string): Promise<void> {
    return this.userService.deleteUser(id);
  }
}
