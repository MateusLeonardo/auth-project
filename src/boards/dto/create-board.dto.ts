import { IsString, MinLength } from 'class-validator';

export class CreateBoardDto {
  @MinLength(4)
  @IsString()
  name: string;
}
