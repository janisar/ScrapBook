import {useContext, useEffect, useState} from 'react';
import {retrieveData} from '../storage/AsyncStorage';
import {FBAccessToken} from 'react-native-fbsdk-next/types/FBAccessToken';
import {ProfileContext} from '../context/Context';
import {User} from '../models/user';

export const fbUserKey = 'fbUser';
export const userKey = 'scrapbook-user';

export type UserField = 'fbUserData' | 'age' | 'sex' | 'dating';
export type UserValue = number | string | FBAccessToken | null;

export const useLoginUser = (): [
  User | undefined,
  (field: UserField) => (value: UserValue) => void,
  () => void,
  () => Promise<string | null | undefined>,
] => {
  const {profile, setProfile} = useContext(ProfileContext);
  const [user, setUser] = useState<User>();
  const [asyncData, setAsyncData] = useState<User>();

  useEffect(() => {
    setUser(profile);
  }, [profile]);

  useEffect(() => {
    fetchUserFromAsyncStorage();
  }, []);

  const fetchUserFromAsyncStorage = async () => {
    const data = await retrieveData<User>(userKey);
    if (data) {
      setAsyncData(data);
      setProfile(data);
    }
  };

  useEffect(() => {
    if (!user) {
      setUser(asyncData);
    }
  }, [asyncData, user]);

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
    setProfile(result);
  };

  const saveField =
    (field: 'fbUserData' | 'age' | 'sex' | 'dating') =>
    (value: number | string | FBAccessToken | null) => {
      setUser({...user, [`${field}`]: value});
    };

  return [user, saveField, complete, getToken];
};
