import {useContext, useEffect, useState} from 'react';
import {Profile} from 'react-native-fbsdk-next';
import {FBProfile} from 'react-native-fbsdk-next/types/FBProfile';
import {User} from '../models/user';
import {ProfileContext} from '../context/UserContext';

export const useFacebookUser = (user?: User): [FBProfile | null] => {
  const {setLoggedIn} = useContext(ProfileContext);
  const [profile, setProfile] = useState<FBProfile | null>(null);
  useEffect(() => {
    Profile.getCurrentProfile().then(currentProfile => {
      if (currentProfile) {
        setProfile(currentProfile);
        setLoggedIn(true);
      }
    });
  }, [user?.fbUserData?.accessToken]);

  return [profile];
};
