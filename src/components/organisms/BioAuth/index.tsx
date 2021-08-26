import React, {FunctionComponent, useEffect, useState} from 'react';
import {retrieveData, storeData} from '../../../storage/AsyncStorage';
import ReactNativeBiometrics from 'react-native-biometrics';
import {StyleSheet, Text, Vibration, View} from 'react-native';
import VirtualKeyboard from 'react-native-virtual-keyboard';
import {useTranslation} from 'react-i18next';

enum AuthState {
  NONE,
  CONFIRMED,
  TEMP,
  SET_UP,
}

type AuthProps = {
  setAuth: (val: boolean) => void;
};

export const BioAuth: FunctionComponent<AuthProps> = ({setAuth}) => {
  const {t} = useTranslation('auth');
  const [code, setCode] = useState('');
  const [state, setState] = useState(AuthState.NONE);
  const [tempCode, setTempCode] = useState('');
  const [secret, setSecret] = useState<string | undefined>(undefined);
  const [confirmedCode, setConfirmedCode] = useState('');

  useEffect(() => {
    retrieveData<string>('passcode').then(passcode => {
      if (passcode?.length === 4) {
        setSecret(passcode);
        setState(AuthState.SET_UP);
      }
    });
  }, []);

  useEffect(() => {
    ReactNativeBiometrics.isSensorAvailable().then(({biometryType}) => {
      if (
        (biometryType === ReactNativeBiometrics.FaceID ||
          biometryType === ReactNativeBiometrics.TouchID) &&
        state === AuthState.SET_UP
      ) {
        ReactNativeBiometrics.simplePrompt({
          promptMessage: t('Face ID'),
          cancelButtonText: t('Cancel'),
        }).then(({success}) => {
          setAuth(success);
        });
      }
    });
  }, [state]);

  const validateCode =
    (
      validatingCode: string,
      setResult: (val: string) => void,
      validate: (c: string) => boolean,
    ) =>
    (inputCharacter: string) => {
      const id = validatingCode;
      if (inputCharacter === 'back') {
        if (validatingCode === '') {
          return;
        } else {
          setResult(id.substring(0, id.length - 1));
        }
      } else {
        let c = id + inputCharacter;
        if (c.length === 4) {
          if (validate(c)) {
          } else {
            setResult(c);
            setTimeout(() => {
              setResult('');
            }, 600);
            Vibration.vibrate(10);
            return '';
          }
        } else {
          setResult(id + inputCharacter);
        }
      }
    };

  return (
    <View style={styles.component}>
      {state === AuthState.NONE && (
        <>
          <Text style={styles.header}>{t('setUp')}</Text>
          <Text style={styles.code}>{tempCode}</Text>
          <VirtualKeyboard
            cellStyle={styles.cell}
            color="black"
            pressMode="char"
            applyBackspaceTint={true}
            onPress={validateCode(tempCode, setTempCode, c => {
              setTempCode(c);
              setState(AuthState.TEMP);
              return true;
            })}
          />
        </>
      )}
      {state === AuthState.TEMP && (
        <>
          <Text style={styles.header}>{t('confirmCode')}</Text>
          <Text style={styles.code}>{confirmedCode}</Text>
          <VirtualKeyboard
            cellStyle={styles.cell}
            color="black"
            pressMode="char"
            applyBackspaceTint={true}
            onPress={validateCode(
              confirmedCode,
              setConfirmedCode,
              (c: string) => {
                if (c === tempCode) {
                  setState(AuthState.CONFIRMED);
                  storeData('passcode', c);
                  setSecret(c);
                  return true;
                } else {
                  return false;
                }
              },
            )}
          />
        </>
      )}
      {(state === AuthState.CONFIRMED || state === AuthState.SET_UP) && (
        <>
          <Text style={styles.header}>{t('enterCode')}</Text>
          <Text style={styles.code}>{code}</Text>
          <VirtualKeyboard
            cellStyle={styles.cell}
            color="black"
            pressMode="char"
            applyBackspaceTint={true}
            onPress={validateCode(code, setCode, (c: string) => {
              if (c === secret) {
                setAuth(true);
                return true;
              }
              return false;
            })}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  component: {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  header: {fontSize: 30},
  code: {fontSize: 28, marginTop: 20, height: 28},
  cell: {
    height: 78,
  },
});
