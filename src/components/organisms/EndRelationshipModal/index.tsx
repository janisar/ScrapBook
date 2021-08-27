import React, {FunctionComponent, useState} from 'react';
import {Modal} from '../../Modal';
import {DateSelect} from '../../atoms/Date';
import {Text, View} from 'react-native';
import Button from '../../molecules/Button';
import {Partner} from '../../../models/partner';
import {useTranslation} from 'react-i18next';
import {SelectItem} from '../../../models';

type Props = {
  partner: Partner;
  hide: () => void;
  visible: boolean;
  end: (endDate: Date) => void;
};

export const EndRelationshipModal: FunctionComponent<Props> = ({
  partner,
  visible,
  hide,
  end,
}) => {
  const [endDate, setEndDate] = useState<Date>(new Date());
  const {t} = useTranslation('values');
  const types: SelectItem[] = t('relationships', {returnObjects: true});
  const type = types.find(t1 => t1.value === partner.type)?.label;
  return (
    <Modal visible={visible} height={'100%'} closable={true} hide={hide}>
      <View
        style={{
          width: '100%',
          height: '80%',
          backgroundColor: '#fff',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 20,
          paddingHorizontal: 50,
        }}>
        <Text style={{fontWeight: '300', fontSize: 20}}>
          Sorry to see your {type?.toLowerCase()} with {partner.name} to end.
        </Text>
        <View>
          <Text style={{marginBottom: 5, paddingLeft: 10}}>
            When did it end?
          </Text>
          <DateSelect
            date={endDate}
            onChange={date => {
              setEndDate(new Date(date as string));
            }}
            width={240}
          />
        </View>
        <Button
          extendedStyle={{}}
          disabled={endDate === undefined}
          onPress={() => end(endDate)}
          label={'Update'}
        />
      </View>
    </Modal>
  );
};
