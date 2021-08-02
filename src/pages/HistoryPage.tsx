import React, { useContext, useState } from "react";
import {
  Alert,
  Modal,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Partner, PartnerForm} from '../models';
import {HistoryEntryForm} from '../containers/forms/HistoryEntryForm';
import {useTranslation} from 'react-i18next';
import {Header2} from '../components/atoms/Header2';
import {PartnerListCard} from '../components/organisms/PartnerListCard';
import {usePartners} from '../hooks/usePartners';
import { useNavigation } from "@react-navigation/native";
import { AppState } from "../context/Context";

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '90%',
    display: 'flex',
  },
  innerWrapper: {
    paddingVertical: 40,
  },
  add: {
    marginBottom: 200,
    flex: 1,
  },
  partnersList: {
    display: 'flex',
    flex: 1,
    marginVertical: 'auto',
    flexDirection: 'column',
    paddingVertical: 10,
  },
});

export const HistoryPage = () => {
  const [p] = usePartners();
  const navigation = useNavigation();
  const {t} = useTranslation('history');

  const {partners} = useContext(AppState);

  console.log(partners);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.innerWrapper}>
        <Header2>{t('title')}</Header2>
        <View style={styles.partnersList}>
          {p.map(partner => {
            return (
              <PartnerListCard
                partner={partner}
                allPartners={p}
                key={partner.name}
              />
            );
          })}
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddPartner')}
          style={styles.add}>
          <Text>{t('add')}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
