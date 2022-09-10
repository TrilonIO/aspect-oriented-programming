import { Controller, Post } from '@nestjs/common';
import { RequestId } from 'src/common/request-id';
import { AdoptService } from './adoption.service';

@Controller()
export class AdoptionController {
  constructor(private readonly adoptService: AdoptService) {}

  @Post('adopt')
  async adopt(): Promise<void> {
    const requestId = new RequestId();
    await this.adoptService.adopt({}, requestId);
  }
}
