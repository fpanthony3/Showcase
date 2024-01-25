import React, { useState, useContext } from 'react';
import { View, ScrollView, TouchableOpacity, Text, Image } from 'react-native';

import AdFree from '../subscriptionScreens/AdFree';
import Novice from '../subscriptionScreens/Novice';
import Apprentice from '../subscriptionScreens/Apprentice';
import Magician from '../subscriptionScreens/Magician';
import Genie from '../subscriptionScreens/Genie';

import { styles } from '../utils/styling';

const SubscriptionInfo = () => {
  const [adFreeSwitch, setAdFreeSwitch] = useState(false);
  const [noviceSwitch, setNoviceSwitch] = useState(false);
  const [apprenticeSwitch, setApprenticeSwitch] = useState(false);
  const [magicianSwitch, setMagicianSwitch] = useState(false);
  const [genieSwitch, setGenieSwitch] = useState(false);

  const onAdFreePress = () => {
    if (adFreeSwitch === false) {
      setAdFreeSwitch(true);
      setNoviceSwitch(false);
      setApprenticeSwitch(false);
      setMagicianSwitch(false);
      setGenieSwitch(false);
    } else {setAdFreeSwitch(false);}
  };
  
  const onNovicePress = () => {
    if (noviceSwitch === false) {
      setNoviceSwitch(true);
      setAdFreeSwitch(false);
      setApprenticeSwitch(false);
      setMagicianSwitch(false);
      setGenieSwitch(false);
    } else {setNoviceSwitch(false);}
  };

  const onApprenticePress = () => {
    if (apprenticeSwitch === false) {
      setApprenticeSwitch(true)
      setAdFreeSwitch(false);
      setMagicianSwitch(false);
      setGenieSwitch(false);
      setNoviceSwitch(false);
    } else {setApprenticeSwitch(false);}
  };

  const onMagicianPress = () => {
    if (magicianSwitch === false) {
      setMagicianSwitch(true);
      setAdFreeSwitch(false);      
      setNoviceSwitch(false);
      setApprenticeSwitch(false);
      setGenieSwitch(false);
    } else {setMagicianSwitch(false);}
  };

  const onGeniePress = () => {
    if (genieSwitch === false) {
      setGenieSwitch(true);
      setAdFreeSwitch(false);
      setNoviceSwitch(false);
      setApprenticeSwitch(false);
      setMagicianSwitch(false);
    } else {setGenieSwitch(false);}
  };

  return (
    <View style={styles.container}>
      <View style={styles.space}></View>
      <View style={styles.textBlockView}>
        <Text> </Text>
        <Text style={styles.textBlockText}>
          {'     '}
          Want more signals, more options, and access to features? Check out our
          various subscription plans:
        </Text>
      </View>

      <ScrollView style={{}}>
        <TouchableOpacity style={styles.dropTab} onPress={onAdFreePress}>
          <Text>Ad Free</Text>
          <View>
            <Image
              style={styles.downArrow}
              source={require('../images/downArrow.png')}
            />
          </View>
        </TouchableOpacity>

        <View style={{ marginHorizontal: 30 }}>
          {adFreeSwitch === true ? <AdFree /> : null}
        </View>

        <TouchableOpacity style={styles.dropTab} onPress={onNovicePress}>
          <Text>Novice</Text>
          <View>
            <Image
              style={styles.downArrow}
              source={require('../images/downArrow.png')}
            />
          </View>
        </TouchableOpacity>

        <View style={{ marginHorizontal: 30 }}>
          {noviceSwitch === true ? <Novice /> : null}
        </View>

        <TouchableOpacity style={styles.dropTab} onPress={onApprenticePress}>
          <Text>Apprentice</Text>
          <View>
            <Image
              style={styles.downArrow}
              source={require('../images/downArrow.png')}
            />
          </View>
        </TouchableOpacity>

        <View style={{ marginHorizontal: 30 }}>
          {apprenticeSwitch === true ? <Apprentice /> : null}
        </View>

        <TouchableOpacity style={styles.dropTab} onPress={onMagicianPress}>
          <Text>Magician</Text>
          <View>
            <Image
              style={styles.downArrow}
              source={require('../images/downArrow.png')}
            />
          </View>
        </TouchableOpacity>

        <View style={{ marginHorizontal: 30 }}>
          {magicianSwitch === true ? <Magician /> : null}
        </View>

        <TouchableOpacity style={styles.dropTab} onPress={onGeniePress}>
          <Text>Genie</Text>
          <View>
            <Image
              style={styles.downArrow}
              source={require('../images/downArrow.png')}
            />
          </View>
        </TouchableOpacity>

        <View style={{ marginHorizontal: 30 }}>
          {genieSwitch === true ? <Genie /> : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default SubscriptionInfo;
