import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';

import Settings from '../utils/FunctionContext';
import { styles } from '../utils/styling';

import { Terms } from '../contents/Terms';

const TermsOfUse = () => {
  const context = useContext(Settings);

  return (
    <View style={styles.container}>
      <Terms />
    </View>
  );
};

export default TermsOfUse;
