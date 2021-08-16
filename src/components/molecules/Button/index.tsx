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
  inProgress?: boolean;
  disabled?: boolean;
  secondary?: boolean;
};

const Button: FunctionComponent<Props> = ({
  onPress,
  label,
  extendedStyle,
  secondary,
  inProgress = false,
  disabled = false,
}) => {
  const styles = stylesheet(secondary);
  return (
    <View
      style={{
        ...styles.outerWrapper,
        ...extendedStyle,
      }}>
      <TouchableOpacity
        disabled={disabled || inProgress}
        style={{...styles.button, ...extendedStyle.button}}
        onPress={onPress}>
        {inProgress ? (
          <ActivityIndicator />
        ) : (
          <Text extendedStyle={styles.label}>{label}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const stylesheet = (secondary?: boolean) =>
  StyleSheet.create({
    label: {
      fontSize: 18,
      color: 'white',
      textAlign: 'center',
      fontWeight: 'bold',
    },
    button: {
      width: '100%',
      height: 49,
      backgroundColor: secondary ? 'gray' : 'purple',
      borderRadius: 5,
      justifyContent: 'center',
      bottom: 0,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    outerWrapper: {
      width: '100%',
      flexDirection: 'row',
    },
  });

export default Button;
