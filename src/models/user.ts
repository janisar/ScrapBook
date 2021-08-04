import {FBAccessToken} from 'react-native-fbsdk-next/types/FBAccessToken';

export interface User {
  fbUserData?: FBAccessToken;
  age?: number;
  sex?: string;
  dating?: string;
  complete?: boolean;
}
