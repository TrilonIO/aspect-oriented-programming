export abstract class ErrorMonitoringProvider {
  abstract attach(
    instance: Record<string, (...args: unknown[]) => Promise<void>>,
    methodName: string,
  ): void;
}
