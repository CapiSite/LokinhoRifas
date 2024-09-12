import { ApplicationError } from '../../protocols';

export function duplicatedEmailError(): ApplicationError {
  return {
    name: 'DuplicatedEmailError',
    message: 'Endereço de email já existe!',
  };
}

export function duplicatedNameError(): ApplicationError {
  return {
    name: 'DuplicatedNameError',
    message: 'Nome de usuário já existe!',
  };
}
