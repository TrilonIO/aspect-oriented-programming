export abstract class Datadog {
  abstract registerError(error: Error): Promise<void>;
}
