import React from 'react';
import { Pressable, Text } from 'react-native';

import { styles } from '../utils/styling';

export default function Button(props) {
  const { onPress, title } = props;
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{title}</Text>
    </Pressable>
  );
}
