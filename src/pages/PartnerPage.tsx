import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, View} from 'react-native';
import {Text} from '../components/atoms/Text';
import Button from '../components/molecules/Button';
import {useNavigation} from '@react-navigation/native';
import {useCountries} from '../hooks/useCountries';
import {Partner} from '../models/partner';
import {PartnerContext} from '../context/PartnerContext';
import {useTranslation} from 'react-i18next';
import {getPartnerDuration} from '../utils/dateUtils';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {DateSelect} from '../components/atoms/Date';
import {InputSelect} from '../components/molecules/InputSelect';
import {mapPartners, mapPartnersForAsyncStorage} from '../utils/partners';

type Props = {
  route: {params: {partner: Partner}};
};

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    alignItems: 'center',
  },
  info: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingHorizontal: 50,
    marginTop: 80,
    flex: 2,
  },
  actionButton: {
    width: 120,
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 100,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 30,
    minWidth: '100%',
    // backgroundColor: 'gray',
    justifyContent: 'space-evenly',
  },
  value: {
    fontWeight: '500',
    marginLeft: 20,
  },
});

export const PartnerPage: FunctionComponent<Props> = ({route}) => {
  const {t} = useTranslation('common');
  const [countries] = useCountries();
  const [country, setCountry] = useState<string | undefined>(undefined);
  const [currentPartner, setUpdatedPartner] = useState<Partner | undefined>(
    undefined,
  );
  const navigation = useNavigation();
  const {partners, setPartners, deletePartner, syncPartner} =
    useContext(PartnerContext);

  useEffect(() => {
    const {partner} = route.params;
    setUpdatedPartner(Partner.create(partner));
    setCountry(partner.country);
  }, [route.params]);

  const deleteCurrentPartner = () => {
    Alert.alert(
      t('removeAlertTitle'),
      t('removeAlertBody', {name: currentPartner?.name}),
      [
        {
          style: 'cancel',
          onPress: () => {},
          text: 'Cancel',
        },
        {
          style: 'default',
          onPress: () => {
            if (currentPartner) {
              deletePartner(currentPartner);
            }
            navigation.goBack();
          },
          text: 'Ok',
        },
      ],
    );
  };

  const save = (p?: Partner) => {
    if (p) {
      const partnersList = mapPartnersForAsyncStorage(partners);
      const newList = partnersList.filter(p1 => p1.id !== p?.id);
      newList.push(currentPartner!);
      setPartners(mapPartners(newList));
      syncPartner(p);
    }
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({title: currentPartner?.name});
  }, [navigation, currentPartner]);

  const types: {[key: string]: [string]} = t('types', {returnObjects: true});

  return (
    <ScrollView contentContainerStyle={styles.page}>
      <View style={styles.info}>
        <View style={styles.row}>
          <FontAwesomeIcon
            size={80}
            icon={faUserFriends}
            color={'purple'}
            style={{opacity: 0.8}}
          />
        </View>
        <View style={{...styles.row, marginTop: 30}}>
          <Text>{t('name')}:</Text>
          <Text extendedStyle={styles.value}>{currentPartner?.name}</Text>
        </View>
        <View style={styles.row}>
          <Text>{t('Type')}:</Text>
          <Text extendedStyle={styles.value}>
            {types[`${currentPartner?.type}`]}
          </Text>
        </View>
        <View style={styles.row}>
          <Text>{t('lasted')}: </Text>
          <Text extendedStyle={styles.value}>
            {getPartnerDuration(currentPartner)}
          </Text>
        </View>
        <View style={styles.row}>
          <Text>{t('Started at')}:</Text>
          <DateSelect
            width={190}
            date={currentPartner?.startDate!}
            onChange={startDate => {
              currentPartner?.withStartDate(startDate as string);
            }}
          />
        </View>
        <View style={{...styles.row, marginTop: 0}}>
          <Text>{t('from')}: </Text>
          <View style={styles.value}>
            <InputSelect
              onValueChange={value => {
                currentPartner?.withCountry(value);
              }}
              items={countries}
              width={190}
              value={countries.find(c => c.value === country)}
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonRow}>
        <Button
          secondary={true}
          extendedStyle={styles.actionButton}
          onPress={deleteCurrentPartner}
          label={t('delete')}
          inProgress={false}
          disabled={false}
        />
        <Button
          extendedStyle={styles.actionButton}
          onPress={() => save(currentPartner)}
          label={t('save')}
          inProgress={false}
          disabled={false}
        />
      </View>
    </ScrollView>
  );
};
