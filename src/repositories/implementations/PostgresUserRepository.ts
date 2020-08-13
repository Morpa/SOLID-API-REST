import { User } from '@src/entities/User';

import { IUsersRepository } from '../IUsersRepository';

export class PostgresUserRepository implements IUsersRepository {
  private users: User[] = [];

  async findByEmail(email: string): Promise<User> {
    const userSearch = this.users.find(user => user.email === email);

    return userSearch;
  }

  async save(user: User): Promise<void> {
    this.users.push(user);
  }
}
