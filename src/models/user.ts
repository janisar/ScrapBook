import {FBAccessToken} from 'react-native-fbsdk-next/types/FBAccessToken';
import {Synchronise} from './index';

export class User extends Synchronise {
  auth?: 'facebook';
  fbUserData?: FBAccessToken;
  age?: number;
  sex?: string;
  dating?: string;
  complete?: boolean;
}
