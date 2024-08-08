import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Block } from './block.entity';
import { BlockRepository } from './block.repository';
import { BlockService } from './block.service';
import { BlockController } from './block.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Block, BlockRepository])],
  providers: [BlockService],
  controllers: [BlockController],
})
export class BlockModule {}
