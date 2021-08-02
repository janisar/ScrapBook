import {useEffect, useState} from 'react';
import {retrieveData, storeData} from '../storage/AsyncStorage';
import {FBAccessToken} from 'react-native-fbsdk-next/types/FBAccessToken';

export const fbUserKey = 'fbUser';
export const userKey = 'scrapbook-user';

export type UserField = 'fbUserData' | 'age' | 'sex' | 'dating';
export type UserValue = number | string | FBAccessToken | null;

export interface User {
  fbUserData?: FBAccessToken;
  age?: number;
  sex?: string;
  dating?: string;
  complete?: boolean;
}

export const useLoginUser = (): [
  User | undefined,
  (field: UserField) => (value: UserValue) => void,
  () => void,
  () => Promise<string | null | undefined>,
] => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    retrieveData<User>(userKey).then(result => {
      if (result) {
        setUser(result);
      }
    });
  }, []);

  const getToken = async (): Promise<string | null | undefined> => {
    if (user?.fbUserData?.accessToken) {
      return user?.fbUserData?.accessToken;
    } else {
      return await retrieveData(fbUserKey);
    }
  };

  const complete = () => {
    const result = {...user, complete: true};
    setUser(result);
    storeData(userKey, result);
  };

  const saveField =
    (field: 'fbUserData' | 'age' | 'sex' | 'dating') =>
    (value: number | string | FBAccessToken | null) => {
      setUser({...user, [`${field}`]: value});
    };

  return [user, saveField, complete, getToken];
};
