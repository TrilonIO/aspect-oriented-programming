import { Transaction } from 'src/database/transaction';
import { AdoptionRequest } from './adoption-request';
import { DataNeededForAdoption } from './data-needed-for-adoption.dto';

export class AdoptionRequestFactory {
  async create(
    dto: DataNeededForAdoption,
    transaction: Transaction,
  ): Promise<AdoptionRequest> {
    return new AdoptionRequest();
  }
}
