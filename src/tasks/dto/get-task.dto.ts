import { IsEnum, IsNotEmpty, IsOptional, isNotEmpty } from 'class-validator';
import { TaskStatus } from '../task.model';

export class GettasksFilterDto {
  @IsOptional()
  @IsNotEmpty()
  @IsEnum(TaskStatus)
  status?: string;

  @IsOptional()
  @IsNotEmpty()
  search?: string;
}
