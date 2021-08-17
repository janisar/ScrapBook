import React, {
  createContext,
  FunctionComponent,
  useEffect,
  useState,
} from 'react';
import {User} from '../models/user';
import {retrieveData, storeData} from '../storage/AsyncStorage';
import {userKey} from '../hooks/useLoginUser';
import {addUserFetch} from '../fetch/user';
import {Auth} from 'aws-amplify';
import {Profile} from 'react-native-fbsdk-next';

const ProfileContext = createContext<{
  profile: User;
  loggedIn: boolean;
  setLoggedIn: (loggedIn: boolean) => void;
  setProfile: (user: User) => void;
  isLoading: boolean;
}>({
  profile: {},
  loggedIn: false,
  setLoggedIn: (_: boolean) => {},
  setProfile: (_: User) => {},
  isLoading: true,
});

const UserContextProvider: FunctionComponent = ({children}) => {
  const [profile, setProfile] = useState<User>({});
  const [profileLoading, setProfileLoading] = useState<boolean>(true);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    fetchUserFromAsyncStorage();
  }, []);

  useEffect(() => {
    if (loggedIn) {
      Auth.currentUserInfo().then(user => {
        if (user === null) {
          Profile.getCurrentProfile().then(currentProfile => {
            if (currentProfile) {
              setProfile({
                email: currentProfile.email,
                id: currentProfile.userID,
                imageUrl: currentProfile.imageURL,
              });
            }
          });
        } else {
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
      if (!data.synced) {
        addUserFetch(data)
          .then(response => {
            if (response.ok) {
              setProfile({...data, synced: true});
            } else {
              setProfile(data);
            }
            setProfileLoading(false);
          })
          .catch(err => {
            console.log(err);
            setProfile(data);
            setProfileLoading(false);
          });
      } else {
        setProfile(data);
        setProfileLoading(false);
      }
    } else {
      setProfileLoading(false);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profile,
        setProfile,
        isLoading: profileLoading,
        loggedIn,
        setLoggedIn,
      }}>
      {children}
    </ProfileContext.Provider>
  );
};

export {UserContextProvider, ProfileContext};
