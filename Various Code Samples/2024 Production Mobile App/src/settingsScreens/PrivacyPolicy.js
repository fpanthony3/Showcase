import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';

import Settings from '../utils/FunctionContext';
import { styles } from '../utils/styling';

import { Policy } from '../contents/Policy';

const PrivacyPolicy = () => {
  const context = useContext(Settings);

  return (
    <View style={styles.container}>
      <Policy />
    </View>
  );
};

export default PrivacyPolicy;
