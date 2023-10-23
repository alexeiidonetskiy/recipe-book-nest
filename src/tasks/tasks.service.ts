import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private usersRepository: Repository<Task>,
  ) {}

  async findAll(): Promise<Task[]> {
    return await this.usersRepository.find();
  }

  async createTask(createTaskDto) {
    const { title } = createTaskDto;

    const task = new Task();
    task.title = title;

    try {
      await this.usersRepository.save(task);
    } catch (e) {
      throw new InternalServerErrorException('Error saving task');
    }

    return task;
  }

}