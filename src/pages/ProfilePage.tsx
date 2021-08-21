import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView as RNScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '../components/atoms/Text';
import {ProgressChart, BarChart} from 'react-native-chart-kit';
import {useStatistics} from '../hooks/useStatistics';
import {Mode} from '../models';
import {ProfileContext} from '../context/UserContext';
import {ProfileInfoModal} from '../components/organisms/ProfileInfoModal';

type Props = {};

export const ProfilePage: FunctionComponent<Props> = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>(Mode.ALL_TIME);
  const [allTime, lastYear, yearsData] = useStatistics(mode);
  const {profile} = useContext(ProfileContext);

  useEffect(() => {
    if (!profile.birthDate || !profile.sex) {
      setModalVisible(true);
    }
  }, [profile]);

  const data = {
    labels: Array.from(yearsData.keys()),
    datasets: [
      {
        data: Array.from(yearsData.values()),
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#f1f1f1',
    backgroundGradientTo: '#f1f1f1',
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(167, 42, 199, ${opacity})`,
    strokeWidth: 2,
  };

  return (
    <SafeAreaView style={styles.page}>
      <ProfileInfoModal
        visible={modalVisible}
        hide={() => setModalVisible(false)}
      />
      <RNScrollView>
        <View style={styles.chart}>
          <ProgressChart
            data={
              mode === Mode.ALL_TIME
                ? [allTime / 100]
                : [(100 - lastYear) / 100]
            }
            fromNumber={2}
            radius={90}
            hideLegend={true}
            width={Dimensions.get('window').width}
            height={320}
            chartConfig={chartConfig}
          />
          <Text extendedStyle={styles.description}>
            {mode === Mode.ALL_TIME &&
              `${
                100 - allTime
              }% of people in the world have had more partners than you`}
            {mode === Mode.LAST_YEAR &&
              `Last year ${lastYear}% of people have had more partners than you`}
          </Text>
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
              <Text
                extendedStyle={mode === Mode.LAST_YEAR ? styles.active : {}}>
                Past year
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 40}}>
            <BarChart
              yAxisSuffix={''}
              xAxisLabel={''}
              flatColor={true}
              withInnerLines={false}
              showBarTops={true}
              fromZero={true}
              data={data}
              segments={2}
              withCustomBarColorFromData={false}
              width={Dimensions.get('window').width}
              height={200}
              yAxisLabel={''}
              chartConfig={chartConfig}
            />
          </View>
          <View
            style={{marginTop: 40, paddingHorizontal: 30, paddingBottom: 40}}>
            <Text>
              Remember your sexuality is not something that makes you more or
              valuable as a person.
            </Text>
          </View>
        </View>
      </RNScrollView>
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
    marginTop: 20,
    alignItems: 'center',
  },
  description: {
    marginHorizontal: 40,
    marginTop: 20,
    fontStyle: 'italic',
  },
  actionButtons: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-around',
    marginTop: 30,
    alignItems: 'center',
    width: '70%',
  },
  active: {
    color: 'blue',
  },
});
