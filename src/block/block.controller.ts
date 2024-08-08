import { Controller, Post, Delete, Param } from '@nestjs/common';
import { BlockService } from './block.service';
import { Block } from './block.entity';

@Controller('blocks')
export class BlockController {
  constructor(private readonly blockService: BlockService) {}

  @Post(':blockerId/:blockedId')
  async blockUser(
    @Param('blockerId') blockerId: string,
    @Param('blockedId') blockedId: string,
  ): Promise<Block> {
    return this.blockService.blockUser(blockerId, blockedId);
  }

  @Delete(':blockerId/:blockedId')
  async unblockUser(
    @Param('blockerId') blockerId: string,
    @Param('blockedId') blockedId: string,
  ): Promise<void> {
    await this.blockService.unblockUser(blockerId, blockedId);
  }
}
