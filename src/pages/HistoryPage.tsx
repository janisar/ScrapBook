import React, {useContext} from 'react';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {Header2} from '../components/atoms/Header2';
import {PartnerListCard} from '../components/organisms/PartnerListCard';
import {useNavigation} from '@react-navigation/native';
import {NoPartners} from '../components/molecules/NoPartners';
import {AddButton} from '../components/molecules/AddButton';
import {PartnerContext, partnersSortFunc} from '../context/PartnerContext';
import {Text} from '../components/atoms/Text';

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginBottom: 20,
    color: '#535353',
    fontSize: 20,
    flexDirection: 'row',
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
  addButton: {
    alignSelf: 'flex-end',
  },
  headerWrapper: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  headerAdd: {
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export const HistoryPage = () => {
  const {partners} = useContext(PartnerContext);
  const navigation = useNavigation();
  const {t} = useTranslation('history');

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.innerWrapper}>
        <View style={styles.headerWrapper}>
          <Header2 extendedStyle={styles.header}>{t('title')}</Header2>
          {partners.size > 0 && (
            <View style={styles.headerAdd}>
              <AddButton
                onPress={() => navigation.navigate('AddPartner')}
                width={12}
              />
            </View>
          )}
        </View>

        {partners.size > 0 && (
          <ScrollView style={styles.partnersList}>
            {Array.from(partners.keys())
              .sort()
              .map(year => {
                return (
                  <View key={year}>
                    <Text extendedStyle={styles.year}>{year}</Text>
                    {partners
                      .get(year)
                      ?.sort(partnersSortFunc())
                      .map(partner => (
                        <PartnerListCard
                          key={partner.id}
                          partner={partner}
                          allPartners={Array.from(partners.values()).flatMap(
                            a => a,
                          )}
                        />
                      ))}
                  </View>
                );
              })}
          </ScrollView>
        )}
        {partners.size === 0 && <NoPartners message={t('noPartners')} />}
      </View>
      {partners.size === 0 && (
        <View style={styles.actionButton}>
          <AddButton
            onPress={() => navigation.navigate('AddPartner')}
            width={14}
          />
        </View>
      )}
    </SafeAreaView>
  );
};
