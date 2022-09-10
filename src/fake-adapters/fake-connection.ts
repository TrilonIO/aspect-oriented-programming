import { Connection } from 'src/database/connection';
import { Transaction } from 'src/database/transaction';

export class FakeConnection implements Connection {
  async transaction<R>(
    fn: (transaction: Transaction) => Promise<R>,
  ): Promise<R> {
    return await fn(new Transaction());
  }
}
