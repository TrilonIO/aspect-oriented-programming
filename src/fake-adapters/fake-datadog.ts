import { Datadog } from 'src/datadog/datadog';

export class FakeDatadog implements Datadog {
  async registerError(error: Error): Promise<void> {
    console.error({ message: 'Error registered in the Datadog', error });
  }
}
