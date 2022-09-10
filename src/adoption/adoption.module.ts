import { Module } from '@nestjs/common';
import { FakeAdaptersModule } from 'src/fake-adapters/fake-adapters.module';
import { AdoptionRequestFactory } from './adoption-request.factory';
import { AdoptionController } from './adoption.controller';
import { AdoptService } from './adoption.service';

@Module({
  imports: [FakeAdaptersModule],
  providers: [AdoptService, AdoptionRequestFactory],
  controllers: [AdoptionController],
})
export class AdoptionModule {}
