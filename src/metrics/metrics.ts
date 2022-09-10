import { RequestId } from 'src/common/request-id';

export abstract class Metrics {
  abstract begin(requestId: RequestId): void;
  abstract finish(requestId: RequestId): void;
}
