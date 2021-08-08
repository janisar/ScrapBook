import {useContext, useEffect, useState} from 'react';
import {retrieveData, storeData} from '../storage/AsyncStorage';
import {FBAccessToken} from 'react-native-fbsdk-next/types/FBAccessToken';
import {ProfileContext} from '../context/Context';
import {User} from '../models/user';

export const fbUserKey = 'fbUserKey';
export const userKey = 'scrapbook-user';

export type UserField = 'fbUserData' | 'age' | 'sex' | 'dating';
export type UserValue = number | string | FBAccessToken | null;

export const useLoginUser = (): [
  User | undefined,
  (field: UserField) => (value: UserValue) => void,
  (value?: FBAccessToken | null) => void,
  () => void,
  () => Promise<string | null | undefined>,
] => {
  const {profile, setProfile} = useContext(ProfileContext);
  const [user, setUser] = useState<User>();

  useEffect(() => {
    setUser(profile);
  }, [profile]);

  const getToken = async (): Promise<string | null | undefined> => {
    if (profile?.fbUserData?.accessToken) {
      return profile?.fbUserData?.accessToken;
    } else {
      return await retrieveData(fbUserKey);
    }
  };

  const facebookLogin = (value?: FBAccessToken | null) => {
    if (value) {
      saveField('fbUserData')(value);
      storeData('fbUserKey', value);
    }
  };

  const complete = () => {
    const result = {...user, complete: true};
    setUser(result);
    setProfile(result);
  };

  const saveField =
    (field: 'fbUserData' | 'age' | 'sex' | 'dating') =>
    (value: number | string | FBAccessToken | null) => {
      setUser({...user, [`${field}`]: value});
    };

  return [user, saveField, facebookLogin, complete, getToken];
};
