import { Adoption } from 'src/adoption/adoption';
import { AdoptionRepository } from 'src/adoption/adoption.repository';
import { Transaction } from 'src/database/transaction';

export class FakeAdoptionRepository implements AdoptionRepository {
  async create(adoption: Adoption, transaction: Transaction): Promise<void> {
    console.log(`Adoption Saved`);
  }
}
