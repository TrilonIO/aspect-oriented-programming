import { Adoption } from 'src/adoption/adoption';
import { AdoptionRepository } from 'src/adoption/adoption.repository';
import { Transaction } from 'src/database/transaction';

export class FakeAdoptionRepository implements AdoptionRepository {
  async create(
    adoption: Adoption,
    transaction: Transaction,
  ): Promise<Adoption> {
    console.log(`Adoption Saved`);
    return adoption;
  }
}
