import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { LessThanOrEqual, MoreThanOrEqual, Between } from 'typeorm';

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
    minAge?: string,
    maxAge?: string,
  ): Promise<User[]> {
    const currentYear = new Date().getFullYear();

    let minBirthdate: Date | undefined;
    let maxBirthdate: Date | undefined;

    // Convert minAge and maxAge to numbers if they are provided
    const minAgeNum = minAge !== undefined ? parseInt(minAge, 10) : undefined;
    const maxAgeNum = maxAge !== undefined ? parseInt(maxAge, 10) : undefined;

    // Check if minAge is a valid number
    if (minAge !== undefined && (isNaN(minAgeNum) || minAgeNum < 0)) {
      throw new Error('Invalid minAge provided');
    }

    // Check if maxAge is a valid number
    if (maxAge !== undefined && (isNaN(maxAgeNum) || maxAgeNum < 0)) {
      throw new Error('Invalid maxAge provided');
    }

    // Calculate birthdate range based on valid minAge and maxAge
    if (minAgeNum !== undefined) {
      minBirthdate = new Date(currentYear - minAgeNum, 0, 1);
    }

    if (maxAgeNum !== undefined) {
      maxBirthdate = new Date(currentYear - maxAgeNum, 11, 31);
    }

    // Construct the query conditionally based on the provided parameters
    const whereCondition: any = {};

    if (username) {
      whereCondition.username = username;
    }

    if (minBirthdate && maxBirthdate) {
      whereCondition.birthdate = Between(maxBirthdate, minBirthdate);
    } else if (minBirthdate) {
      whereCondition.birthdate = LessThanOrEqual(minBirthdate);
    } else if (maxBirthdate) {
      whereCondition.birthdate = MoreThanOrEqual(maxBirthdate);
    }

    // Execute the query with the constructed where condition
    return this.userRepository.find({ where: whereCondition });
  }
}
