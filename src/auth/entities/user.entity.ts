import { Recipe } from 'src/recipe/entities/recipe.entity';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

@Entity()
@Unique(['username', 'email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @OneToMany(() => Recipe, (recipe) => recipe.createdBy, { eager: true })
  recipes: Recipe[];

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}