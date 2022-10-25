import { Injectable } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { Connection } from 'src/database/connection';
import { ErrorsMonitoring } from 'src/errors-monitoring/errors-monitoring.decorator';
import { LogAroundDecorator } from 'src/logging/logging.decorator';
import { AdoptionRequestFactory } from './adoption-request.factory';
import { AdoptionRepository } from './adoption.repository';
import { DataNeededForAdoption } from './data-needed-for-adoption.dto';

@Injectable()
export class AdoptService {
  constructor(
    private readonly adoptionRepository: AdoptionRepository,
    private readonly adoptionRequestFactory: AdoptionRequestFactory,
    private readonly connection: Connection,
    private readonly eventPublisher: EventPublisher,
  ) {}

  // @AttachMetrics
  @ErrorsMonitoring
  @LogAroundDecorator('Adoption')
  async adopt(dto: DataNeededForAdoption): Promise<void> {
    const adoption = await this.connection.transaction(async (transaction) => {
      const adoptionRequest = await this.adoptionRequestFactory.create(
        dto,
        transaction,
      );
      const adoption = adoptionRequest.adopt();
      this.eventPublisher.mergeObjectContext(adoption);
      return this.adoptionRepository.create(adoption, transaction);
    });
    adoption.commit();
  }
}
