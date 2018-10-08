import { InMemoryDbService } from 'angular-in-memory-web-api';
import { User } from '../_models/auth';

/** mimics communication with a remote data server by using the In-memory Web API module */
export class InMemoryDataService implements InMemoryDbService {
  createDb() {  
    // The in-memory web api library currently assumes that every collection has a primary key called id.
    const accounts = [
      { id: 99, special_name: 'agc' },
      { id: 100, special_name: 'bhc' }
    ];
    return {accounts};
  }

  // Overrides the genId method to ensure that a user always has an id.
  // If the accounts array is empty,
  // the method below returns the initial number (99).
  // if the accounts array is not empty, the method below returns the highest
  // user id + 1.
  genId(accounts: User[]): number {
    return accounts.length > 0 ? Math.max(...accounts.map(user => user.id)) + 1 : 99;
  }
}
