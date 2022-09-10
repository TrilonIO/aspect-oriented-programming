import { Injectable, OnModuleInit } from '@nestjs/common';
import { DiscoveryService, MetadataScanner, Reflector } from '@nestjs/core';
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper';
import { ErrorMonitoringProvider } from './error-monitoring-provider';
import { ERRORS_MONITORING_KEY } from './errors-monitoring.decorator';

@Injectable()
export class ErrorsMonitoringExplorer implements OnModuleInit {
  constructor(
    private discoveryService: DiscoveryService,
    private errorMonitoringProvider: ErrorMonitoringProvider,
    private metadataScanner: MetadataScanner,
    private reflector: Reflector,
  ) {}

  onModuleInit(): void {
    this.explore();
  }

  explore(): void {
    const instanceWrappers: InstanceWrapper[] =
      this.discoveryService.getProviders();

    instanceWrappers.forEach((wrapper: InstanceWrapper) => {
      const { instance } = wrapper;

      if (!instance) {
        return;
      }

      // scanFromPrototype will iterate through all providers' methods
      this.metadataScanner.scanFromPrototype(
        instance,
        Object.getPrototypeOf(instance),
        (methodName: string) => this.lookupProviderMethod(instance, methodName),
      );
    });
  }

  lookupProviderMethod(
    instance: Record<string, (arg: unknown) => Promise<void>>,
    methodName: string,
  ) {
    const methodRef = instance[methodName];
    const isPointCutSet = this.reflector.get<string[]>(
      ERRORS_MONITORING_KEY,
      methodRef,
    );

    if (!isPointCutSet) {
      return;
    }

    this.errorMonitoringProvider.attach(instance, methodName);
  }
}
