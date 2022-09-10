import { Injectable } from '@nestjs/common';
import { ErrorMonitoringProvider } from '../error-monitoring-provider';

@Injectable()
export class DatadogErrorMonitoringProvider implements ErrorMonitoringProvider {
  attach(
    instance: Record<string, (...args: unknown[]) => Promise<void>>,
    methodName: string,
  ): void {
    const originalMethod = instance[methodName];

    instance[methodName] = async function (...args: unknown[]) {
      try {
        return originalMethod.apply(this, args);
      } catch (e) {
        this.datadog.registerError(e);
        throw e;
      }
    };
  }
}
