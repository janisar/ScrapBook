import {FBAccessToken} from 'react-native-fbsdk-next/types/FBAccessToken';
import {Synchronise} from './index';

export class User extends Synchronise {
  auth?: 'facebook' | 'internal';
  fbUserData?: FBAccessToken;
  name?: string;
  email?: string;
  password?: string;
  age?: number;
  sex?: string;
  dating?: string;
  complete?: boolean;
}
