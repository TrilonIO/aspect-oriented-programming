import { Transaction } from './transaction';

export abstract class Connection {
  abstract transaction(
    fn: (transaction: Transaction) => Promise<void>,
  ): Promise<void>;
}
