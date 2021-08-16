import React, {FunctionComponent, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '../components/atoms/Text';
import {useLoginUser} from '../hooks/useLoginUser';
import {useFacebookUser} from '../hooks/useFacebookUser';
// @ts-ignore
import Pie from 'react-native-pie';
import {useStatistics} from '../hooks/useStatistics';
import {Mode} from '../models';
import {Auth} from 'aws-amplify';

type Props = {};

export const ProfilePage: FunctionComponent<Props> = () => {
  const [userProfile] = useLoginUser();
  const [profile] = useFacebookUser(userProfile);
  const [mode, setMode] = useState<Mode>(Mode.ALL_TIME);
  const [allTime, lastYear] = useStatistics(mode);

  const [cognitoUser, setCognitoUser] = useState<any>();

  useEffect(() => {
    if (!profile) {
      Auth.currentUserInfo().then(user => {
        setCognitoUser(user);
      });
    }
  }, [profile]);

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.header}>
        {profile?.imageURL && (
          <Image style={styles.image} source={{uri: profile?.imageURL}} />
        )}
        {!profile && (
          <Image style={styles.image} source={require('./index.png')} />
        )}
        <Text extendedStyle={styles.name}>{profile ? profile.name : cognitoUser?.attributes.name}</Text>
      </View>
      <View style={styles.chart}>
        <Pie
          radius={80}
          innerRadius={70}
          sections={[
            {
              percentage: mode === Mode.ALL_TIME ? allTime : 100 - lastYear,
              color: 'purple',
            },
            {
              percentage: mode === Mode.ALL_TIME ? 100 - allTime : lastYear,
              color: 'gray',
            },
          ]}
        />
        <Text extendedStyle={styles.description}>
          {mode === Mode.ALL_TIME &&
            `You've had more partners than ${allTime}% of people in the world`}
          {mode === Mode.LAST_YEAR &&
            `Last year ${lastYear}% of people have had more partners than you`}
        </Text>
      </View>
      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => setMode(Mode.ALL_TIME)}>
          <Text extendedStyle={mode === Mode.ALL_TIME ? styles.active : {}}>
            All time
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setMode(Mode.LAST_YEAR);
          }}>
          <Text extendedStyle={mode === Mode.LAST_YEAR ? styles.active : {}}>
            Past year
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
  },
  name: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  header: {
    flex: 2,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 25,
    marginBottom: 30,
  },
  chart: {
    flex: 2,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  description: {
    marginHorizontal: 40,
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '70%',
  },
  active: {
    color: 'blue',
  },
});
