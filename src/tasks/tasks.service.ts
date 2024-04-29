import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GettasksFilterDto } from './dto/get-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 'asdasd',
      title: 'hello',
      description: 'world',
      status: TaskStatus.OPEN,
    },
    {
      id: 'asdasgd',
      title: 'hello',
      description: 'world',
      status: TaskStatus.OPEN,
    },
  ];

  getAllTasks() {
    return this.tasks;
  }

  getTasksWIthFilters(FilterDto: GettasksFilterDto): Task[] {
    const { status, search } = FilterDto;

    let tasks = this.getAllTasks();

    // do something with status
    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    // do something with search
    if (search) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(search) || task.description.includes(search),
      );
    }

    // return final result
    return tasks;
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find((task) => task.id === id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  deleteTask(id: string): void {
    const found = this.getTaskById(id); // we are using getTaskById to throw an error if task not found
    this.tasks = this.tasks.filter((task) => task.id !== found.id);
  }

  createTask(createTaskTdo: CreateTaskDto): Task {
    const { title, description } = createTaskTdo;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  updateTask(id: string, status: TaskStatus): Task {
    const task = this.getTaskById(id); // we are using getTaskById to throw an error if task not found
    task.status = status;
    return task;
  }
}
