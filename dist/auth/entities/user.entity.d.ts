import { Recipe } from '../../recipe/entities/recipe.entity';
import { BaseEntity } from 'typeorm';
export declare class User extends BaseEntity {
    id: number;
    username: string;
    email: string;
    password: string;
    salt: string;
    recipes: Recipe[];
    validatePassword(password: string): Promise<boolean>;
}
