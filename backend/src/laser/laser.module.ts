import { Module } from '@nestjs/common';
import { LaserService } from './laser.service';
import { LaserController } from './laser.controller';

@Module({
  controllers: [LaserController],
  providers: [LaserService],
  exports: [LaserService],
})
export class LaserModule {}
