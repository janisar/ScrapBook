import React, {FunctionComponent, useContext, useState} from 'react';
import {Modal} from '../../Modal';
import {ScrollView} from '../../atoms/ScrollView';
import {Button, StyleSheet, View} from 'react-native';
import {Header2} from '../../atoms/Header2';
import {Text} from '../../atoms/Text';
import {InputDateField} from '../../molecules/InputDateField';
import {InputSelect} from '../../molecules/InputSelect';
import {items} from '../ScrapBookSignUp';
import {useScrollView} from '../../../hooks/useScrollView';
import {ProfileContext} from '../../../context/UserContext';
import {ModalContent} from '../../Modal/ModalContent';

type Props = {
  visible: boolean;
  hide: () => void;
};

export const ProfileInfoModal: FunctionComponent<Props> = ({visible, hide}) => {
  const {profile, setProfile} = useContext(ProfileContext);
  const [birthDate, setBirthDate] = useState<string | undefined>(
    profile.birthDate,
  );
  const [sex, setSex] = useState<string | undefined>(profile.sex);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const [offset, toNextPage] = useScrollView(3, () => {}, null, width);

  return (
    <Modal visible={visible} height={'100%'}>
      <ScrollView pagesCount={3} offset={offset}>
        <View style={styles.scrollViewContent}>
          <View
            style={styles.modalContent}
            onLayout={event => {
              const {width: w} = event.nativeEvent.layout;
              setWidth(w);
            }}>
            <Header2>We need some information</Header2>
            <Text>
              In order to show you the most accurate statistics we need some
              basic information from you.
            </Text>
            <Button
              title={'Start'}
              onPress={() => {
                toNextPage();
              }}
            />
          </View>
        </View>
        <View style={styles.scrollViewContent}>
          <ModalContent value={profile.birthDate} next={toNextPage}>
            <Header2>Enter your date of birth</Header2>
            <InputDateField
              onValueChange={val => {
                setBirthDate(val);
              }}
              onConfirm={() => {
                toNextPage();
              }}
              value={profile.birthDate}
              width={140}
              label={'Your birth date'}
            />
            <View />
          </ModalContent>
        </View>
        <View style={styles.scrollViewContent}>
          <ModalContent value={profile.sex} next={toNextPage}>
            <Header2>Select your sex</Header2>
            <InputSelect
              onValueChange={value => setSex(value)}
              width={140}
              items={items}
            />
            <Button
              title={'Done'}
              onPress={() => {
                if (sex && birthDate) {
                  hide();
                  setProfile({
                    ...profile,
                    sex: sex,
                    birthDate: birthDate,
                    complete: true,
                  });
                }
              }}
            />
          </ModalContent>
        </View>
      </ScrollView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexBasis: '100%',
    maxWidth: '100%',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 15,
    alignItems: 'center',
  },
  modalContent: {
    flex: 1,
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    alignItems: 'center',
    width: '100%',
  },
});
