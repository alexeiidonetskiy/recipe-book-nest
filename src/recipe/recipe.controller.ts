import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe';
import { User } from 'src/auth/user.entity';
import { GetUser } from 'src/auth/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard())
@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
    @GetUser() user: User,
  ) {
    return this.recipeService.createRecipe(createRecipeDto, user);
  }
}
