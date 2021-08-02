import React, {FunctionComponent} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Text} from '../../atoms/Text';

type Props = {
  onPress: () => void;
  label: string;
  extendedStyle?: any;
  inProgress: boolean;
  disabled: boolean;
};

const Button: FunctionComponent<Props> = ({
  onPress,
  label,
  extendedStyle,
  inProgress = false,
  disabled = false,
}) => {
  const styles = stylesheet;
  return (
    <View
      style={{
        ...styles.outerWrapper,
        ...extendedStyle,
        ...extendedStyle.outerWrapper,
      }}>
      <TouchableOpacity
        disabled={disabled || inProgress}
        style={{...styles.button, ...extendedStyle.button}}
        onPress={onPress}>
        {inProgress ? <ActivityIndicator /> : <Text extendedStyle={styles.label}>{label}</Text>}
      </TouchableOpacity>
    </View>
  );
};

const stylesheet = StyleSheet.create({
  label: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    width: '80%',
    height: 49,
    backgroundColor: 'purple',
    borderRadius: 5,
    alignContent: 'center',
    justifyContent: 'center',
    bottom: 0,
  },
  outerWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default Button;
