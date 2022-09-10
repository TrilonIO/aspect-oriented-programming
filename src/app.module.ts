import { Module } from '@nestjs/common';
import { AdoptionModule } from './adoption/adoption.module';
import { DatadogErrorMonitoringProviderModule } from './errors-monitoring/datadog/datadog-errors-monitoring-provider.module';
import { ErrorsMonitoringModule } from './errors-monitoring/errors-monitoring.module';

@Module({
  imports: [
    AdoptionModule,
    ...(process.env.reportErrors
      ? [
          ErrorsMonitoringModule.withHandlerModule(
            DatadogErrorMonitoringProviderModule,
          ),
        ]
      : []),
  ],
})
export class AppModule {}
