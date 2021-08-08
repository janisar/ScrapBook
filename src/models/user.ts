import {FBAccessToken} from 'react-native-fbsdk-next/types/FBAccessToken';

export interface User {
  id?: string;
  auth?: 'facebook';
  fbUserData?: FBAccessToken;
  age?: number;
  sex?: string;
  dating?: string;
  complete?: boolean;
}
