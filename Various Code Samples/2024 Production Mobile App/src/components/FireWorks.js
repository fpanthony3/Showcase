import React from 'react';
import { View, Text, StyleSheet, Platform, Vibration } from 'react-native';
import Fireworks from 'react-native-fireworks';

export default function FireWorks() {
  return (
    <Fireworks
      speed={1}
      //density={8}
      //colors={['#ff0', '#ff3', '#cc0', '#ff4500', '#ff6347']}
      //iterations={5}
      height={300}
      //width={200}
      zIndex={10}
      //circular={true}
    />
  );
}
