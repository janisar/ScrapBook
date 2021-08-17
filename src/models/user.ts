import {Synchronise} from './index';

export class User extends Synchronise {
  auth?: 'facebook' | 'congnito';
  imageUrl?: string;
  name?: string;
  email?: string;
  password?: string;
  birthDate?: string;
  sex?: string;
  dating?: string;
  complete?: boolean;
}
