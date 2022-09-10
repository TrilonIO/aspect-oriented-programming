import { Module } from '@nestjs/common';
import { FakeAdaptersModule } from 'src/fake-adapters/fake-adapters.module';
import { ErrorMonitoringProvider } from '../error-monitoring-provider';
import { DatadogErrorMonitoringProvider } from './datadog-error-monitoring.provider';

@Module({
  imports: [FakeAdaptersModule],
  providers: [
    {
      provide: ErrorMonitoringProvider,
      useClass: DatadogErrorMonitoringProvider,
    },
  ],
  exports: [ErrorMonitoringProvider],
})
export class DatadogErrorMonitoringProviderModule {}
