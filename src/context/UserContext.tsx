import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import {User} from '../models/user';
import {retrieveData, storeData} from '../storage/AsyncStorage';
import {userKey} from '../hooks/useLoginUser';

const ProfileContext = createContext<{
  profile: User;
  setProfile: (user: User) => void;
  isLoading: boolean;
}>({
  profile: {},
  setProfile: (_: User) => {},
  isLoading: true,
});

const UserContextProvider: FunctionComponent = ({children}) => {
  const [profile, setProfile] = useState<User>({});
  const [profileLoading, setProfileLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchUserFromAsyncStorage();
  }, []);

  useEffect(() => {
    if (profile?.complete) {
      storeData(userKey, profile);
    }
  }, [profile]);

  const fetchUserFromAsyncStorage = async () => {
    const data = await retrieveData<User>(userKey);
    if (data) {
      setProfile(data);
    }
    setProfileLoading(false);
  };

  return (
    <ProfileContext.Provider
      value={{profile, setProfile, isLoading: profileLoading}}>
      {children}
    </ProfileContext.Provider>
  );
};

export {UserContextProvider, ProfileContext};
