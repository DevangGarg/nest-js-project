import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async findByUsername(username: string): Promise<User | undefined> {
    return this.findOne({ where: { username } });
  }

  async createAndSave(user: Partial<User>): Promise<User> {
    const newUser = this.create(user);
    return this.save(newUser);
  }

  async findOneById(id: string): Promise<User | undefined> {
    return this.findOne({ where: { id } });
  }

  async findAll(): Promise<User[]> {
    return this.find();
  }

  async removeUser(user: User): Promise<void> {
    await this.remove(user);
  }
}
