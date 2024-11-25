import { IsString } from 'class-validator';

export class CreateColumnDto {
  @IsString()
  name: string;
}
