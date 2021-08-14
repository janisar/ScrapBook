import React, {useContext, useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Header2} from '../components/atoms/Header2';
import {PartnerListCard} from '../components/organisms/PartnerListCard';
import {useNavigation} from '@react-navigation/native';
import {NoPartners} from '../components/molecules/NoPartners';
import {AddButton} from '../components/molecules/AddButton';
import {PartnerContext} from '../context/PartnerContext';
import {Text} from '../components/atoms/Text';
import {Partner} from '../models/partner';
import { getYearFromDate } from "../utils/dateUtils";

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginBottom: 20,
    color: '#535353',
    fontSize: 20,
  },
  wrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '90%',
    display: 'flex',
    flex: 1,
  },
  innerWrapper: {
    display: 'flex',
    alignItems: 'center',
    flex: 11,
    width: '100%',
  },
  partnersList: {
    display: 'flex',
    flex: 11,
    flexDirection: 'column',
    paddingVertical: 10,
    paddingHorizontal: 30,
    width: '100%',
    marginBottom: 20,
  },
  actionButton: {
    display: 'flex',
    flex: 1,
  },
  year: {
    fontWeight: '100',
    marginBottom: 8,
    marginTop: 12,
  },
});

export const HistoryPage = () => {
  const {partners} = useContext(PartnerContext);
  const navigation = useNavigation();
  const {t} = useTranslation('history');

  function getYear(partner: Partner, index: number): number | undefined {
    if (partner.startDate) {
      const partnerYear = getYearFromDate(partner.startDate);
      if (index === 0) {
        return partnerYear;
      }
      const prevPartnerYear = getYearFromDate(partners[index - 1].startDate!);
      if (partnerYear !== prevPartnerYear) {
        return partnerYear;
      }
    }
    return undefined;
  }

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.innerWrapper}>
        <Header2 extendedStyle={styles.header}>{t('title')}</Header2>
        {partners.length > 0 && (
          <ScrollView style={styles.partnersList}>
            {partners.map((partner, index) => {
              return (
                <View key={partner.id}>
                  {getYear(partner, index) && (
                    <Text extendedStyle={styles.year}>
                      {getYear(partner, index)}
                    </Text>
                  )}
                  <PartnerListCard partner={partner} allPartners={partners} />
                </View>
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
