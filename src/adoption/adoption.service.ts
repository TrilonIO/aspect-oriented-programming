import { Injectable, Logger } from '@nestjs/common';
import { EventPublisher } from '@nestjs/cqrs';
import { RequestId } from 'src/common/request-id';
import { Connection } from 'src/database/connection';
import { Datadog } from 'src/datadog/datadog';
import { ErrorsMonitoring } from 'src/errors-monitoring/errors-monitoring.decorator';
import { LogAroundDecorator } from 'src/logging/logging.decorator';
import { Metrics } from 'src/metrics/metrics';
import { AdoptionRequestFactory } from './adoption-request.factory';
import { AdoptionRepository } from './adoption.repository';
import { DataNeededForAdoption } from './data-needed-for-adoption.dto';

@Injectable()
export class AdoptService {
  private readonly logger = new Logger('Adopt');

  constructor(
    private readonly adoptionRepository: AdoptionRepository,
    private readonly adoptionRequestFactory: AdoptionRequestFactory,
    private readonly connection: Connection,
    private eventPublisher: EventPublisher,
    private readonly datadog: Datadog,
    private readonly metrics: Metrics,
  ) {}

  async adopt(dto: DataNeededForAdoption, requestId: RequestId): Promise<void> {
    try {
      this.logger.log({
        message: 'Adoption started',
        data: { ...dto, requestId },
      });
      this.metrics.begin(requestId);

      const adoption = await this.connection.transaction(
        async (transaction) => {
          const adoptionRequest = await this.adoptionRequestFactory.create(
            dto,
            transaction,
          );
          const adoption = adoptionRequest.adopt();
          this.eventPublisher.mergeObjectContext(adoption);
          return this.adoptionRepository.create(adoption, transaction);
        },
      );

      adoption.commit();

      this.metrics.finish(requestId);
      this.logger.log({
        message: 'Adoption completed',
        data: { ...dto, requestId },
      });
    } catch (e) {
      this.logger.error({
        message: 'Adoption failed',
        error: e,
        data: { ...dto, requestId },
      });
      this.datadog.registerError(e);
      throw e;
    }
  }
}

// @Injectable()
// export class AdoptService {
//   constructor(
//     private readonly adoptionRepository: AdoptionRepository,
//     private readonly adoptionRequestFactory: AdoptionRequestFactory,
//     private readonly connection: Connection,
//     private readonly eventPublisher: EventPublisher,
//     private readonly datadog: Datadog,
//     private readonly metrics: Metrics,
//   ) {}

//   @LogAroundDecorator('Adoption')
//   async adopt(dto: DataNeededForAdoption, requestId: RequestId): Promise<void> {
//     try {
//       this.metrics.begin(requestId);

//       const adoption = await this.connection.transaction(
//         async (transaction) => {
//           const adoptionRequest = await this.adoptionRequestFactory.create(
//             dto,
//             transaction,
//           );
//           const adoption = adoptionRequest.adopt();
//           this.eventPublisher.mergeObjectContext(adoption);
//           return this.adoptionRepository.create(adoption, transaction);
//         },
//       );
//       adoption.commit();

//       this.metrics.finish(requestId);
//     } catch (e) {
//       this.datadog.registerError(e);
//       throw e;
//     }
//   }
// }

// @Injectable()
// export class AdoptService {
//   constructor(
//     private readonly adoptionRepository: AdoptionRepository,
//     private readonly adoptionRequestFactory: AdoptionRequestFactory,
//     private readonly connection: Connection,
//     private readonly eventPublisher: EventPublisher,
//   ) {}

//   @AttachMetrics
//   @ErrorsMonitoring
//   @LogAroundDecorator('Adoption')
//   async adopt(dto: DataNeededForAdoption): Promise<void> {
//     const adoption = await this.connection.transaction(async (transaction) => {
//       const adoptionRequest = await this.adoptionRequestFactory.create(
//         dto,
//         transaction,
//       );
//       const adoption = adoptionRequest.adopt();
//       this.eventPublisher.mergeObjectContext(adoption);
//       return this.adoptionRepository.create(adoption, transaction);
//     });
//     adoption.commit();
//   }
// }

// @Injectable()
// export class AdoptService {
//   constructor(
//     private readonly adoptionRepository: AdoptionRepository,
//     private readonly adoptionRequestFactory: AdoptionRequestFactory,
//     private readonly connection: Connection,
//     private eventPublisher: EventPublisher,
//   ) {}

//   @Transactional()
//   async adopt(dto: DataNeededForAdoption): Promise<void> {
//     const adoptionRequest = await this.adoptionRequestFactory.create(dto);
//     const adoption = adoptionRequest.adopt();
//     this.eventPublisher.mergeObjectContext(adoption);
//     await this.adoptionRepository.create(adoption);
//     adoption.commit();
//   }
// }
