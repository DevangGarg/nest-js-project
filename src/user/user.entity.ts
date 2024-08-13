import { Entity, PrimaryGeneratedColumn, Column, JoinColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @JoinColumn({ name: 'name' })
  name: string;

  @Column()
  @JoinColumn({ name: 'surname' })
  surname: string;

  @Column({ unique: true })
  @JoinColumn({ name: 'username' })
  username: string;

  @Column()
  @JoinColumn({ name: 'birthdate' })
  birthdate: Date;

  @Column({ default: false })
  @JoinColumn({ name: 'blocked' })
  blocked: boolean;
}
