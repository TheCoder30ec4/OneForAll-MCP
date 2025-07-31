import { post } from '../api';

export const sessionLogin = (idToken: string) => {
  return post('sessionLogin', { idToken });
};
