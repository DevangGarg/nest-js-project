import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { LessThanOrEqual, MoreThanOrEqual, FindOptionsWhere } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(user: Partial<User>): Promise<User> {
    const newUser = this.userRepository.create(user);
    return this.userRepository.save(newUser);
  }

  async findUserById(id: string): Promise<User> {
    return this.userRepository.findOne({ where: { id } });
  }

  async findUsers(): Promise<User[]> {
    return this.userRepository.find();
  }

  async deleteUser(id: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (user) {
      await this.userRepository.remove(user);
    }
  }

  async searchUsers(
    username?: string,
    minAge?: number,
    maxAge?: number,
  ): Promise<User[]> {
    const now = new Date();
    const queryConditions: FindOptionsWhere<User> = {};

    if (username) {
      queryConditions.username = username;
    }

    if (minAge !== undefined) {
      const minBirthdate = new Date(
        now.getFullYear() - minAge,
        now.getMonth(),
        now.getDate(),
      );
      queryConditions.birthdate = LessThanOrEqual(minBirthdate);
    }

    if (maxAge !== undefined) {
      const maxBirthdate = new Date(
        now.getFullYear() - maxAge,
        now.getMonth(),
        now.getDate(),
      );
      queryConditions.birthdate = MoreThanOrEqual(maxBirthdate);
    }

    return this.userRepository.find({ where: queryConditions });
  }
}
