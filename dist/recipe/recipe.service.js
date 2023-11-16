"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var RecipeService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecipeService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const recipe_entity_1 = require("./entities/recipe.entity");
const util_1 = require("../recipe/utils/util");
const s3_bucket_uploader_1 = require("../recipe/utils/s3-bucket-uploader");
let RecipeService = RecipeService_1 = class RecipeService {
    constructor(recipeRepository) {
        this.recipeRepository = recipeRepository;
        this.logger = new common_1.Logger('RecipeService');
    }
    async getAll() {
        return await this.recipeRepository
            .createQueryBuilder('recipe')
            .leftJoinAndSelect('recipe.createdBy', 'user')
            .select(['recipe', 'user.username'])
            .getMany();
    }
    async getById(id) {
        return await this.recipeRepository.findOneBy({ id });
    }
    async createRecipe(createRecipeDto, image, user) {
        const { title, description } = createRecipeDto;
        const recipe = new recipe_entity_1.Recipe();
        recipe.title = title;
        recipe.description = description;
        recipe.createdBy = user;
        recipe.image = await RecipeService_1.uploadImage(image);
        try {
            await this.recipeRepository.save(recipe);
            this.logger.verbose(`User "${user.username}" creating new recipe. Data: ${JSON.stringify(createRecipeDto)}`);
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    async deleteById(id) {
        try {
            const result = await this.recipeRepository.delete(id);
            if (result.affected === 0) {
                throw new common_1.NotFoundException(`Recipe with ID ${id} not found`);
            }
        }
        catch (e) {
            throw new common_1.InternalServerErrorException(e);
        }
    }
    static async uploadImage(imageFile) {
        const imageName = (0, util_1.generateImageName)();
        const uploadResult = await (0, s3_bucket_uploader_1.uploadImageToS3)(imageFile.buffer, imageFile.mimetype, imageName);
        const imageUrl = uploadResult.Location;
        return imageUrl;
    }
};
exports.RecipeService = RecipeService;
exports.RecipeService = RecipeService = RecipeService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(recipe_entity_1.Recipe)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], RecipeService);
//# sourceMappingURL=recipe.service.js.map