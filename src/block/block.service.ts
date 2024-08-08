import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Block } from './block.entity';
import { BlockRepository } from './block.repository';
import { User } from '../user/user.entity';

@Injectable()
export class BlockService {
  constructor(
    @InjectRepository(Block)
    private readonly blockRepository: BlockRepository,
  ) {}

  async blockUser(blockerId: string, blockedId: string): Promise<Block> {
    const block = this.blockRepository.create({
      blocker: { id: blockerId } as User,
      blocked: { id: blockedId } as User,
    });
    return this.blockRepository.save(block);
  }

  async unblockUser(blockerId: string, blockedId: string): Promise<void> {
    const block = await this.blockRepository.findOne({
      where: { blocker: { id: blockerId }, blocked: { id: blockedId } },
    });
    if (block) {
      await this.blockRepository.remove(block);
    }
  }
}
