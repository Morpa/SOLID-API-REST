import { User } from '@src/entities/User';
import { IMailProvider } from '@src/providers/IMailProvider';
import { IUsersRepository } from '@src/repositories/IUsersRepository';

import { ICreateUserRequestDTO } from './CreateUserDTO';

export class CreateUserUserCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<void> {
    const userAlreadyExists = await this.usersRepository.findByEmail(
      data.email,
    );

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const user = new User(data);

    await this.usersRepository.save(user);

    await this.mailProvider.sendMail({
      to: { name: data.name, email: data.email },
      from: { name: 'App', email: 'email@email.com' },
      subject: 'Seja bem vindo',
      body: '<p>Você já pode fazer login na plataforma</p>',
    });
  }
}
