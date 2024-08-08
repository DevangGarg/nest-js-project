import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Block {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'blocker_id' })
  blocker: User;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'blocked_id' })
  blocked: User;
}
