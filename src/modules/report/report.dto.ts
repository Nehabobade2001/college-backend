import { IsDateString, IsInt, IsOptional } from 'class-validator'

export class ReportFilterDto {
  @IsOptional()
  @IsDateString()
  startDate?: string

  @IsOptional()
  @IsDateString()
  endDate?: string

  @IsOptional()
  @IsInt()
  centerId?: number

  @IsOptional()
  @IsInt()
  courseId?: number

  @IsOptional()
  @IsInt()
  studentId?: number
}
