import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { RecipeModule } from './recipe/recipe.module';
import { Recipe } from './recipe/entities/recipe.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Recipe],
      //Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
      synchronize: true,
    }),
    RecipeModule,
    AuthModule,
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
