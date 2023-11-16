import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RecipeService } from './recipe.service';
import { CreateRecipeDto } from './dto/create-recipe';
import { User } from '../auth/entities/user.entity';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard())
@Controller('recipes')
export class RecipeController {
  constructor(private recipeService: RecipeService) {}

  @Get()
  getAllRecipes() {
    return this.recipeService.getAll();
  }

  @Get('/:id')
  getById(@Param('id', ParseIntPipe) id: number) {
    return this.recipeService.getById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @UsePipes(ValidationPipe)
  createRecipe(
    @Body() createRecipeDto: CreateRecipeDto,
    @UploadedFile() image: Express.Multer.File,
    @GetUser() user: User,
  ) {
    return this.recipeService.createRecipe(createRecipeDto, image, user);
  }

  @Delete('/:id')
  deleteById(@Param('id') id: string) {
    return this.recipeService.deleteById(id);
  }
}
