import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  private logger = new Logger('RecipeService');

  async createRecipe(createRecipeDto: CreateRecipeDto, user) {
    const { title, description } = createRecipeDto;

    const recipe = new Recipe();
    recipe.title = title;
    recipe.description = description;
    recipe.user = user;

    try {
      await this.recipeRepository.save(recipe);
      this.logger.verbose(`User "${user.username}" creating new recipe. Data: ${JSON.stringify(createRecipeDto)}`);
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }
}
