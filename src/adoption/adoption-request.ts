import { Adoption } from './adoption';

export class AdoptionRequest {
  adopt(): Adoption {
    return new Adoption();
  }
}
