import React from 'react';
import { View, Image, Text } from 'react-native';

import { styles } from '../utils/styling';

export default function Header(props) {
  const { title } = props;
  return (
    <View style={styles.appHeader}>
      <Image style={styles.logo} source={require('../images/genieLogo.png')} />
      <View style={styles.companyHeader}>
        <Image style={styles.sg} source={require('../images/stactGenie.png')} />
        <View style={styles.longDescription}>
          <Text style={styles.centerText}>{title}</Text>
        </View>
      </View>
    </View>
  );
}
