/// <reference types="multer" />
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe';
import { User } from '../auth/entities/user.entity';
export declare class RecipeController {
    private recipeService;
    constructor(recipeService: RecipeService);
    getAllRecipes(): Promise<import("./entities/recipe.entity").Recipe[]>;
    getById(id: number): Promise<import("./entities/recipe.entity").Recipe>;
    createRecipe(createRecipeDto: CreateRecipeDto, image: Express.Multer.File, user: User): Promise<void>;
    deleteById(id: string): Promise<void>;
}
