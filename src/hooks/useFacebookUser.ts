import {useEffect, useState} from 'react';
import {Profile} from 'react-native-fbsdk-next';
import {User} from './useLoginUser';
import {FBProfile} from 'react-native-fbsdk-next/types/FBProfile';

export const useFacebookUser = (user?: User): [FBProfile | null] => {
  const [profile, setProfile] = useState<FBProfile | null>(null);
  useEffect(() => {
    if (user?.fbUserData?.accessToken) {
      Profile.getCurrentProfile().then(currentProfile => {
        if (currentProfile) {
          setProfile(currentProfile);
        }
      });
      // Create a graph request asking for user information with a callback to handle the response.
    }
  }, [user?.fbUserData?.accessToken]);

  return [profile];
};
