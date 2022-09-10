import { RequestId } from 'src/common/request-id';
import { Metrics } from 'src/metrics/metrics';

export class FakeMetrics implements Metrics {
  begin(requestId: RequestId): void {
    console.log(`Metrics started ${requestId}`);
  }
  finish(requestId: RequestId): void {
    console.log(`Metrics finished ${requestId}`);
  }
}
