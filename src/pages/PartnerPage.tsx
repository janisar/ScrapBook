import React, {FunctionComponent, useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {Text} from '../components/atoms/Text';
import {Label} from '../components/atoms/Label';
import Button from '../components/molecules/Button';
import {useNavigation} from '@react-navigation/native';
import {useCountries} from '../hooks/useCountries';
import {Select} from '../components/atoms/Select';
import {Partner} from '../models/partner';
import {PartnerContext} from '../context/PartnerContext';
import {useTranslation} from 'react-i18next';
import {getPartnerDuration} from '../utils/dateUtils';

type Props = {
  route: {params: {partner: Partner}};
};

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    alignItems: 'center',
    flex: 1,
  },
  info: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 80,
    flex: 2,
  },
  actionButton: {
    width: 120,
  },
  buttonRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '80%',
    flex: 1,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  formComponent: {
    marginTop: 25,
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
  const {partners, setPartners, deletePartner} = useContext(PartnerContext);

  useEffect(() => {
    const {partner} = route.params;
    setUpdatedPartner(Partner.create(partner));
    setCountry(partner.country);
  }, [route.params]);

  const deleteCurrentPartner = () => {
    if (currentPartner) {
      deletePartner(currentPartner);
    }
    navigation.goBack();
  };

  const save = (p?: Partner) => {
    if (p) {
      setPartners([
        ...partners.filter(partner => p.name !== partner.name),
        p.withCountry(country),
      ]);
    }
    navigation.goBack();
  };

  useEffect(() => {
    navigation.setOptions({title: currentPartner?.name});
  }, [navigation, currentPartner]);

  const types: {[key: string]: [string]} = t('types', {returnObjects: true});

  return (
    <View style={styles.page}>
      <View style={styles.info}>
        <Text extendedStyle={styles.formComponent}>
          {t('name')}: {currentPartner?.name}
        </Text>
        <Text extendedStyle={styles.formComponent}>
          {types[`${currentPartner?.type}`]}
        </Text>
        <Text extendedStyle={styles.formComponent}>
          Lasted {getPartnerDuration(currentPartner)}
        </Text>
        <Label extendedStyle={styles.formComponent}>
          Where was the person from?
        </Label>
        <Select
          onChange={(c: string) => setCountry(c)}
          placeholder={'Country'}
          value={country}
          items={countries}
          onNext={() => {}}
        />
      </View>
      <View style={styles.buttonRow}>
        <Button
          secondary={true}
          extendedStyle={styles.actionButton}
          onPress={deleteCurrentPartner}
          label={'Delete'}
          inProgress={false}
          disabled={false}
        />
        <Button
          extendedStyle={styles.actionButton}
          onPress={() => save(currentPartner)}
          label={'Save'}
          inProgress={false}
          disabled={false}
        />
      </View>
    </View>
  );
};
