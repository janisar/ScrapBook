import React, {FunctionComponent} from 'react';
import {StyleSheet, View} from 'react-native';
import {Input} from '../../atoms/Input';
import Button from '../Button';
import {ScrollViewPage} from '../../../i18n/models';

type InputComponentProps = {
  onChange: (value: string) => void;
  page: ScrollViewPage;
  onNext: () => void;
  width?: number;
  placeholder?: string;
};

const styles = StyleSheet.create({
  inputComponent: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  actionButton: {
    alignItems: 'center',
    textAlign: 'center',
  },
});

export const InputComponent: FunctionComponent<InputComponentProps> = ({
  onChange,
  page,
  onNext,
  width,
  placeholder,
}) => {
  return (
    <View style={styles.inputComponent}>
      <Input
        onChange={onChange}
        width={width}
        placeholder={placeholder}
        editable={true}
      />
      {page.action && (
        <Button
          inProgress={false}
          disabled={false}
          label={page.action}
          onPress={() => onNext()}
          extendedStyle={styles.actionButton}
        />
      )}
    </View>
  );
};
