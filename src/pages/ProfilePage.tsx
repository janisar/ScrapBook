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
import {PartnerContext} from '../context/PartnerContext';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUsers} from '@fortawesome/free-solid-svg-icons';
import {useTranslation} from 'react-i18next';

type Props = {};

export const ProfilePage: FunctionComponent<Props> = () => {
  const {t} = useTranslation('profile');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [mode, setMode] = useState<Mode>(Mode.ALL_TIME);
  const {partners} = useContext(PartnerContext);
  const [allTime, lastYear] = useStatistics(mode);
  const {profile} = useContext(ProfileContext);

  console.log(partners)
  useEffect(() => {
    if (!profile.birthDate || !profile.sex) {
      setModalVisible(true);
    }
  }, [profile]);

  const data = {
    labels: Array.from(partners.keys()).sort(),
    datasets: [
      {
        data: Array.from(partners.keys())
          .sort()
          .map(key => partners.get(key)?.length),
      },
    ],
  };

  const chartConfig = {
    backgroundGradientFrom: '#f1f1f1',
    backgroundGradientTo: '#f1f1f1',
    decimalPlaces: 0,
    barPercentage: 0.75,
    color: (opacity = 1) => `rgba(167, 42, 199, ${opacity})`,
    strokeWidth: 1,
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
            fromNumber={0}
            radius={100}
            hideLegend={true}
            width={Dimensions.get('window').width}
            height={320}
            chartConfig={chartConfig}
          />
          <Text extendedStyle={styles.description}>
            {mode === Mode.ALL_TIME && t('allTime', {val: 100 - allTime})}
            {mode === Mode.LAST_YEAR && t('pastYear', {val: lastYear})}
          </Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity onPress={() => setMode(Mode.ALL_TIME)}>
              <Text extendedStyle={mode === Mode.ALL_TIME ? styles.active : {}}>
                {t('allTimeBtn')}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setMode(Mode.LAST_YEAR);
              }}>
              <Text
                extendedStyle={mode === Mode.LAST_YEAR ? styles.active : {}}>
                {t('pastYearBtn')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 40, width: '100%'}}>
            <BarChart
              style={partners.size > 6 ? styles.barchart : {}}
              yAxisSuffix={''}
              xAxisLabel={''}
              withInnerLines={false}
              showBarTops={true}
              fromZero={true}
              data={data}
              segments={3}
              withCustomBarColorFromData={false}
              width={Dimensions.get('window').width}
              height={250}
              yAxisLabel={''}
              chartConfig={chartConfig}
            />
          </View>
          <View style={{flexDirection: 'row', marginTop: 30}}>
            <FontAwesomeIcon
              icon={faUsers}
              style={{
                color: 'purple',
                marginTop: 'auto',
                marginBottom: 'auto',
                marginRight: 10,
                opacity: 0.8,
              }}
            />
            <Text>{t('totalCountLabel')}</Text>
            <Text extendedStyle={{color: 'purple', fontWeight: '500'}}>
              {Array.from(partners.values()).flatMap(a => a).length}
            </Text>
          </View>
          <View
            style={{marginTop: 40, paddingHorizontal: 30, paddingBottom: 40}}>
            <Text>{t('disclaimer')}</Text>
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
  barchart: {
    right: 35,
  },
});
