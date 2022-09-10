import { Connection } from 'src/database/connection';
import { Transaction } from 'src/database/transaction';

export class FakeConnection implements Connection {
  async transaction(
    fn: (transaction: Transaction) => Promise<void>,
  ): Promise<void> {
    await fn(new Transaction());
  }
}
