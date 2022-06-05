import { Type } from 'class-transformer';
import { IsArray, IsIn, IsInt, IsOptional, IsString } from 'class-validator';

const sort = ['asc', 'desc'] as const;

export class GetProductsQuery {
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  category: number;

  @IsString()
  @IsOptional()
  search: string;

  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @IsString({ each: true })
  manufacturers: string;

  @IsOptional()
  @IsIn(sort)
  price: string;
}
