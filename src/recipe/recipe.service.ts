import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { CreateRecipeDto } from './dto/create-recipe';
import { generateImageName } from '../recipe/utils/util';
import { uploadImageToS3 } from '../recipe/utils/s3-bucket-uploader';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private recipeRepository: Repository<Recipe>,
  ) {}

  private logger = new Logger('RecipeService');

  async getAll() {
    return await this.recipeRepository
      .createQueryBuilder('recipe')
      .leftJoinAndSelect('recipe.createdBy', 'user')
      // .where('recipe.createdBy IS NOT NULL')
      .select(['recipe', 'user.username'])
      .getMany();
  }

  async getById(id) {
    return await this.recipeRepository.findOneBy({ id });
  }

  async createRecipe(createRecipeDto: CreateRecipeDto, image, user) {
    const { title, description } = createRecipeDto;

    const recipe = new Recipe();
    recipe.title = title;
    recipe.description = description;
    recipe.createdBy = user;
    recipe.image = await RecipeService.uploadImage(image);

    try {
      await this.recipeRepository.save(recipe);
      this.logger.verbose(
        `User "${user.username}" creating new recipe. Data: ${JSON.stringify(
          createRecipeDto,
        )}`,
      );
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      const result = await this.recipeRepository.delete(id);

      if (result.affected === 0) {
        throw new NotFoundException(`Recipe with ID ${id} not found`);
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  static async uploadImage(imageFile: Express.Multer.File) {
    const imageName = generateImageName();
    const uploadResult = await uploadImageToS3(
      imageFile.buffer,
      imageFile.mimetype,
      imageName,
    );
    const imageUrl = uploadResult.Location;

    return imageUrl;
  }
}
