import React, {FunctionComponent, useState} from 'react';
import {
  Modal as RNModal,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faTimes} from '@fortawesome/free-solid-svg-icons';

type Props = {
  visible: boolean;
  height?: string;
  width?: string | number;
  closable?: boolean;
  hide?: () => void;
  ref?: any;
};

export const Modal: FunctionComponent<Props> = ({
  visible,
  height,
  width,
  hide,
  closable,
  ref,
  children,
}) => {
  const styles = getStyles(height);
  return (
    <RNModal
      ref={ref}
      animationType="slide"
      transparent={true}
      visible={visible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <View
              style={{
                backgroundColor: '#fff',
              }}>
              {closable && (
                <TouchableOpacity
                  style={{paddingRight: 10, paddingTop: 10}}
                  onPress={() => {
                    hide && hide();
                  }}>
                  <FontAwesomeIcon
                    icon={faTimes}
                    size={20}
                    style={{alignSelf: 'flex-end'}}
                  />
                </TouchableOpacity>
              )}
              {children}
            </View>
          </View>
        </View>
      </View>
    </RNModal>
  );
};

const getStyles = (height: string = '80%') =>
  StyleSheet.create({
    centeredView: {
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 20,
      maxHeight: height,
      width: '100%',
    },
    modalView: {
      margin: 20,
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
