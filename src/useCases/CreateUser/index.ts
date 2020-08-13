import { MailtrapMailProvider } from '@src/providers/implementations/MailtrapMailProvider';
import { PostgresUserRepository } from '@src/repositories/implementations/PostgresUserRepository';

import { CreateUserController } from './CreateUserController';
import { CreateUserUserCase } from './CreateUserUseCase';

const mailtrapMailProvider = new MailtrapMailProvider();

const postgresUserRepository = new PostgresUserRepository();

const createUserCase = new CreateUserUserCase(
  postgresUserRepository,
  mailtrapMailProvider,
);

const createUserController = new CreateUserController(createUserCase);

export { createUserCase, createUserController };
