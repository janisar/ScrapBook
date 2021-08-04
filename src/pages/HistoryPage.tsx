import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Header2} from '../components/atoms/Header2';
import {PartnerListCard} from '../components/organisms/PartnerListCard';
import {usePartners} from '../hooks/usePartners';
import {useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginBottom: 20,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '90%',
    display: 'flex',
  },
  innerWrapper: {
    paddingVertical: 0,
    display: 'flex',
  },
  add: {
    marginBottom: 200,
    flex: 1,
  },
  partnersList: {
    display: 'flex',
    flex: 9,
    flexDirection: 'column',
    paddingVertical: 10,
    marginBottom: 20,
  },
  actionButton: {
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
});

export const HistoryPage = () => {
  const [p] = usePartners();
  const navigation = useNavigation();
  const {t} = useTranslation('history');

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.innerWrapper}>
        <Header2 extendedStyle={styles.header}>{t('title')}</Header2>
        <ScrollView style={styles.partnersList}>
          {p.map(partner => {
            return (
              <PartnerListCard
                partner={partner}
                allPartners={p}
                key={partner.name}
              />
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.actionButton}>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddPartner')}
          style={styles.add}>
          <Text>{t('add')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
