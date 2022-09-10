import { Module } from '@nestjs/common';
import { AdoptionModule } from './adoption/adoption.module';
import { ErrorsMonitoringModule } from './errors-monitoring/errors-monitoring.module';

@Module({
  imports: [
    AdoptionModule,
    ...(process.env.reportErrors ? [ErrorsMonitoringModule] : []),
  ],
})
export class AppModule {}
