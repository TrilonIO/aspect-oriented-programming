import { Transaction } from 'src/database/transaction';
import { Adoption } from './adoption';

export abstract class AdoptionRepository {
  abstract create(adoption: Adoption, transaction: Transaction): Promise<void>;
}
