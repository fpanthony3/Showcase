import React, { useState, useContext } from 'react';
import { View, TouchableOpacity, Text, Image, ScrollView } from 'react-native';

import Settings from '../utils/FunctionContext';
import { styles } from '../utils/styling';

import { About } from '../contents/About';
import { Tutorial } from '../contents/Tutorial';
import { Using } from '../contents/Using';
import { Disclaimer } from '../contents/Disclaimer';

const AboutInfo = () => {
  const context = useContext(Settings);

  const [origin, setOrigin] = useState(null);
  const [originSwitch, setOriginSwitch] = useState(true);

  const [signals, setSignals] = useState(null);
  const [signalsSwitch, setSignalsSwitch] = useState(true);

  const [howto, setHowto] = useState(null);
  const [usingHowto, setHowtoSwitch] = useState(true);

  const onOriginPress = () => {
    {
      originSwitch === false ? setOriginSwitch(true) : setOriginSwitch(false);
    }
    if (originSwitch === true) {
      setHowtoSwitch(true);
      setSignalsSwitch(true);

      setHowto(null);
      setSignals(null);

      setOrigin(About);
    } else {
      setOrigin(null);
    }
  };

  const onSignalsPress = () => {
    {
      signalsSwitch === false
        ? setSignalsSwitch(true)
        : setSignalsSwitch(false);
    }
    if (signalsSwitch === true) {
      setOriginSwitch(true);
      setHowtoSwitch(true);

      setOrigin(null);
      setHowto(null);

      setSignals(Tutorial);
    } else {
      setSignals(null);
    }
  };

  const onHowtoPress = () => {
    {
      usingHowto === false ? setHowtoSwitch(true) : setHowtoSwitch(false);
    }
    if (usingHowto === true) {
      setSignalsSwitch(true);
      setOriginSwitch(true);

      setSignals(null);
      setOrigin(null);

      setHowto(Using);
    } else {
      setHowto(null);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.space}></View>

      <View style={styles.appInfoLabelView}>
        <Text style={styles.appInfoLabelText}>
          Stock, Trend, And Crypto Trade Genie
        </Text>
        <Text style={styles.stactGenieLabelText}>S.T.A.C.T. Genie</Text>
      </View>

      <View style={styles.revLevelView}>
        <Text>Rev {context.revLevel}</Text>
      </View>

      <View style={styles.space}></View>

      <ScrollView>
        <View style={styles.learnMoreLabelView}>
          <Text>Learn more about...</Text>
        </View>

        <TouchableOpacity style={styles.dropTab} onPress={onOriginPress}>
          <Text>The Origins</Text>
          <View>
            <Image
              style={styles.downArrow}
              source={require('../images/downArrow.png')}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.displayContainer}>
          <Text style={styles.displayText}>{origin || null}</Text>
        </View>

        <TouchableOpacity style={styles.dropTab} onPress={onSignalsPress}>
          <Text>The Signals</Text>
          <View>
            <Image
              style={styles.downArrow}
              source={require('../images/downArrow.png')}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.displayContainer}>
          <Text style={styles.displayText}>{signals || null}</Text>
        </View>

        <TouchableOpacity style={styles.dropTab} onPress={onHowtoPress}>
          <Text>How To</Text>
          <View>
            <Image
              style={styles.downArrow}
              source={require('../images/downArrow.png')}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.displayContainer}>
          <Text style={styles.displayText}>{howto || null}</Text>
        </View>

        <View>
          <Text style={styles.disclaimerTitle}>Disclaimer:</Text>
          <Text style={styles.disclaimer}>{Disclaimer}</Text>
        </View>
      </ScrollView>

      <View style={{ margin: 20 }}>
        <Text> {'\u00A9'} 2022 STACT GENIE. All rights reserved</Text>
      </View>
    </View>
  );
};

export default AboutInfo;
