import {useEffect, useState} from 'react';
import {Profile} from 'react-native-fbsdk-next';
import {FBProfile} from 'react-native-fbsdk-next/types/FBProfile';
import {User} from '../models/user';

export const useFacebookUser = (user?: User): [FBProfile | null] => {
  const [profile, setProfile] = useState<FBProfile | null>(null);
  useEffect(() => {
    if (user?.fbUserData?.accessToken) {
      Profile.getCurrentProfile().then(currentProfile => {
        if (currentProfile) {
          setProfile(currentProfile);
        }
      });
    }
  }, [user?.fbUserData?.accessToken]);

  return [profile];
};
