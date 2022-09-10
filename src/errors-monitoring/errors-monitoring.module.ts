import { Module } from '@nestjs/common';
import { DiscoveryModule } from '@nestjs/core';
import { DatadogErrorMonitoringProviderModule } from './datadog/datadog-errors-monitoring-provider.module';
import { ErrorsMonitoringExplorer } from './errors-monitoring.explorer';

@Module({
  imports: [DiscoveryModule, DatadogErrorMonitoringProviderModule],
  providers: [ErrorsMonitoringExplorer],
})
export class ErrorsMonitoringModule {}
