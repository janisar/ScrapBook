import React, {useContext} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Header2} from '../components/atoms/Header2';
import {PartnerListCard} from '../components/organisms/PartnerListCard';
import {useNavigation} from '@react-navigation/native';
import {PartnerContext} from '../context/Context';
import {NoPartners} from '../components/molecules/NoPartners';
import {AddButton} from '../components/molecules/AddButton';

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
    display: 'flex',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  partnersList: {
    display: 'flex',
    flex: 9,
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: '100%',
    marginBottom: 20,
  },
  actionButton: {
    display: 'flex',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
});

export const HistoryPage = () => {
  const {partners} = useContext(PartnerContext);
  const navigation = useNavigation();
  const {t} = useTranslation('history');

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.innerWrapper}>
        <Header2 extendedStyle={styles.header}>{t('title')}</Header2>
        {partners.length > 0 && (
          <ScrollView style={styles.partnersList}>
            {partners.map(partner => {
              return (
                <PartnerListCard
                  partner={partner}
                  allPartners={partners}
                  key={partner.name}
                />
              );
            })}
          </ScrollView>
        )}
        {partners.length === 0 && <NoPartners message={t('noPartners')} />}
      </View>
      <View style={styles.actionButton}>
        <AddButton onPress={() => navigation.navigate('AddPartner')} />
      </View>
    </SafeAreaView>
  );
};
