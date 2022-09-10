import { DynamicModule, Module, Type } from '@nestjs/common';
import { ErrorsMonitoringExplorer } from './errors-monitoring.explorer';

@Module({
  providers: [ErrorsMonitoringExplorer],
})
export class ErrorsMonitoringModule {
  static withHandlerModule(module: Type<unknown>): DynamicModule {
    return {
      module: ErrorsMonitoringModule,
      imports: [module],
    };
  }
}
