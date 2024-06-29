import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';
export class UpdateUserContentDto extends PartialType(OmitType(CreateUserDto, ['password'] as const)) {}