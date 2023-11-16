/// <reference types="multer" />
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe';
export declare class RecipeService {
    private recipeRepository;
    constructor(recipeRepository: Repository<Recipe>);
    private logger;
    getAll(): Promise<Recipe[]>;
    getById(id: any): Promise<Recipe>;
    createRecipe(createRecipeDto: CreateRecipeDto, image: any, user: any): Promise<void>;
    deleteById(id: string): Promise<void>;
    static uploadImage(imageFile: Express.Multer.File): Promise<string>;
}
