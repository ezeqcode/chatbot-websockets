import { PartialType } from '@nestjs/mapped-types';
import { CreateVenombotDto } from './create-venombot.dto';

export class UpdateVenombotDto extends PartialType(CreateVenombotDto) {}
