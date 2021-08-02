import React, {FunctionComponent} from 'react';
import {Image, SafeAreaView, StyleSheet} from 'react-native';
import {Text} from '../components/atoms/Text';
import {useLoginUser} from '../hooks/useLoginUser';
import {useFacebookUser} from '../hooks/useFacebookUser';

type Props = {};

export const ProfilePage: FunctionComponent<Props> = () => {
  const [userProfile] = useLoginUser();
  const [profile] = useFacebookUser(userProfile);

  return (
    <SafeAreaView style={styles.page}>
      {profile?.imageURL && (
        <Image style={styles.image} source={{uri: profile?.imageURL}} />
      )}
      <Text>Hello {profile?.name}</Text>
      <Text>Your age - {userProfile?.age}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 25,
    marginBottom: 30
  },
});
