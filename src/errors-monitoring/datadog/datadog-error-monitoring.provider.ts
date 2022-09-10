import { Injectable } from '@nestjs/common';
import { Datadog } from 'src/datadog/datadog';
import { ErrorMonitoringProvider } from '../error-monitoring-provider';

@Injectable()
export class DatadogErrorMonitoringProvider implements ErrorMonitoringProvider {
  constructor(private readonly datadog: Datadog) {}
  attach(
    instance: Record<string, (...args: unknown[]) => Promise<void>>,
    methodName: string,
  ): void {
    const originalMethod = instance[methodName];

    instance[methodName] = async (...args: unknown[]) => {
      try {
        return await originalMethod.apply(instance, args);
      } catch (e) {
        this.datadog.registerError(e);
        throw e;
      }
    };
  }
}
