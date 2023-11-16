import { User } from '../../auth/entities/user.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ nullable: true })
  image: string;

  @ManyToOne(() => User, (user) => user.recipes, { eager: false })
  @JoinColumn({ name: 'createdBy' })
  createdBy: User;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
