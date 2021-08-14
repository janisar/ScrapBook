import React, {FunctionComponent} from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {Header2} from '../../atoms/Header2';
import {Text} from '../../atoms/Text';
import {getYearFromDate} from '../../../utils/dateUtils';
import Button from '../../molecules/Button';
import {SelectItem} from '../../../models';
import {Partner} from '../../../models/partner';

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    maxHeight: '80%',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#cecece',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    display: 'flex',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  partner: {
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
    flex: 1,
  },
  partnerHeader: {
    flex: 1,
    justifyContent: 'flex-end',
    textAlign: 'center',
    marginTop: 20,
  },
  modalButton: {
    flex: 1,
  },
  partnerRow: {
    flex: 1,
  },
  modalContent: {
    flex: 10,
    justifyContent: 'center',
  },
});

type Props = {
  country: SelectItem;
  partners: Partner[];
  onClose: () => void;
};

export const PartnerMapModal: FunctionComponent<Props> = ({
  country,
  partners,
  onClose,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Header2 extendedStyle={styles.partnerHeader}>
              {country.label}
            </Header2>
            {partners
              .filter(p => p.country === country.value)
              .map(partner => {
                return (
                  <View style={styles.partner} key={partner.id}>
                    <View style={styles.partnerRow}>
                      <Text>
                        {'\u2022 '}
                        {getYearFromDate(partner.startDate!)} - {partner.name}
                      </Text>
                    </View>
                  </View>
                );
              })}
          </View>
          <Button
            onPress={onClose}
            extendedStyle={styles.modalButton}
            label={'Close'}
            inProgress={false}
            disabled={false}
          />
        </View>
      </View>
    </Modal>
  );
};
