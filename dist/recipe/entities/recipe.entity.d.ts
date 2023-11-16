import { User } from '../../auth/entities/user.entity';
export declare class Recipe {
    id: string;
    title: string;
    description: string;
    image: string;
    createdBy: User;
    createdAt: Date;
}
