import { Transaction } from './transaction';

export abstract class Connection {
  abstract transaction<R>(
    fn: (transaction: Transaction) => Promise<R>,
  ): Promise<R>;
}
