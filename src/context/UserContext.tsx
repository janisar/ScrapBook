import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import {User} from '../models/user';
import {retrieveData, storeData} from '../storage/AsyncStorage';
import {userIdKey, userKey} from '../hooks/useLoginUser';
import {Auth} from 'aws-amplify';
import {Profile} from 'react-native-fbsdk-next';
import {getUniqueId} from 'react-native-device-info';

const ProfileContext = createContext<{
  profile: User;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  setProfile: (user: User) => void;
  isLoading: boolean;
  logOut: () => void;
}>({
  profile: {},
  loggedIn: false,
  setLoggedIn: (_: boolean) => {},
  setProfile: (_: User) => {},
  isLoading: true,
  logOut: () => {},
});

const UserContextProvider: FunctionComponent = ({children}) => {
  const [profile, setProfile] = useState<User>({});
  const [profileLoading, setProfileLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    fetchUserFromAsyncStorage();
  }, []);

  useEffect(() => {
    if (loggedIn && profile) {
      Auth.currentUserInfo().then(user => {
        if (user === null) {
          Profile.getCurrentProfile().then(currentProfile => {
            if (currentProfile) {
              setProfile({
                email: currentProfile.email,
                id: currentProfile.userID,
                imageUrl: currentProfile.imageURL,
                birthDate: profile.birthDate || profile.birthDate,
                sex: profile.sex || profile.sex,
              });
            }
          });
        } else if (!profile) {
          setProfile({
            id: user.id,
            name: user.attributes.name,
            birthDate: user.attributes.birthdate,
            sex: user.attributes.sex,
            email: user.attributes.email,
          });
        }
      });
    }
  }, [loggedIn]);

  useEffect(() => {
    if (profile?.complete) {
      storeData(userKey, profile);
    }
  }, [profile]);

  const fetchUserFromAsyncStorage = async () => {
    const data = await retrieveData<User>(userKey);
    if (data) {
      setProfile({...data, birthDate: data.birthDate, sex: data.sex});
      setLoggedIn(true);
      setProfileLoading(false);
    } else {
      retrieveData<string>(userIdKey).then(userId => {
        if (!userId) {
          const id = getUniqueId();
          storeData(userIdKey, id);
          setProfile({...profile, id: id});
          setProfileLoading(false);
        } else {
          setProfile({...profile, id: userId});
          setProfileLoading(false);
        }
      });
    }
  };

  const logOut = async () => {
    await Auth.signOut();
    setLoggedIn(false);
    setProfile({id: getUniqueId()});
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        isLoading: profileLoading,
        loggedIn,
        setLoggedIn,
        logOut,
      }}>
      {children}
    </ProfileContext.Provider>
  );
};

export {UserContextProvider, ProfileContext};
