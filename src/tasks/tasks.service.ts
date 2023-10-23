import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {}

  private logger = new Logger('TaskRepository');

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.find();
  }

  async getTaskById(id: number): Promise<Task> {
    const found = await this.taskRepository.findOneBy({ id });

    if (!found) {
      throw new NotFoundException(`Task with ID ${id} non found`);
    }

    return found;
  }

  async createTask(createTaskDto) {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    try {
      await this.taskRepository.save(task);
    } catch (e) {
      this.logger.error(
        `Failed to create a task", DTO: ${JSON.stringify(createTaskDto)}`,
        e.stack,
      );
      throw new InternalServerErrorException('Error saving task');
    }

    return task;
  }
}
