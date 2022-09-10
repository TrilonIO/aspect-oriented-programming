import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { AdoptionRepository } from 'src/adoption/adoption.repository';
import { Connection } from 'src/database/connection';
import { Datadog } from 'src/datadog/datadog';
import { Metrics } from 'src/metrics/metrics';
import { FakeAdoptionRepository } from './fake-adoption.repository';
import { FakeConnection } from './fake-connection';
import { FakeDatadog } from './fake-datadog';
import { FakeMetrics } from './fake-metrics';

@Module({
  imports: [CqrsModule],
  providers: [
    { provide: AdoptionRepository, useClass: FakeAdoptionRepository },
    { provide: Connection, useClass: FakeConnection },
    { provide: Datadog, useClass: FakeDatadog },
    { provide: Metrics, useClass: FakeMetrics },
  ],
  exports: [AdoptionRepository, Connection, CqrsModule, Datadog, Metrics],
})
export class FakeAdaptersModule {}
