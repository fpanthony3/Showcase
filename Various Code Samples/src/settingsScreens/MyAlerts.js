import React, { useState, useEffect } from 'react';
import { View, Switch, Text, Image, ScrollView } from 'react-native';

import { styles } from '../utils/styling';
import { defaultUserData } from '../utils/dataFiles/DefaultUserData';
import AppSettings from './AppSettings';

const MyAlerts = () => {
  const [userData, setUserData] = useState(defaultUserData);

  let emailInactive = true;
  let smsInactive = true;
  let pushInactive = true;
  let buyInactive = true;
  let sellInactive = true;
  let newsletter = true;

  const [newsletterEnabled, newsletterIsEnabled] = useState(false);
  const newsletterSwitch = () =>
    newsletterIsEnabled((previousState) => !previousState);

  const [pushEnabled, pushIsEnabled] = useState(false);
  const pushSwitch = () => pushIsEnabled((previousState) => !previousState);

  const [emailEnabled, emailIsEnabled] = useState(false);
  const emailSwitch = () => emailIsEnabled((previousState) => !previousState);

  const [smsEnabled, smsIsEnabled] = useState(false);
  const smsSwitch = () => smsIsEnabled((previousState) => !previousState);

  const [buyEnabled, buyIsEnabled] = useState(false);
  const buySwitch = () => buyIsEnabled((previousState) => !previousState);

  const [sellEnabled, sellIsEnabled] = useState(false);
  const sellSwitch = () => sellIsEnabled((previousState) => !previousState);

  if (userData.subscriptionLevel > 2) {
    buyInactive = false;
  }
  if (userData.subscriptionLevel > 2) {
    sellInactive = false;
  }
  if (userData.subscriptionLevel > 2) {
    emailInactive = false;
  }
  if (userData.subscriptionLevel > 3) {
    pushInactive = false;
  }
  if (userData.subscriptionLevel > 4) {
    smsInactive = false;
  }

  const renderLevel = (userData) => {
    if (userData.subscriptionLevel === 7) return <Text>GENIE</Text>;
    if (userData.subscriptionLevel === 6) return <Text>MAGICIAN</Text>;
    if (userData.subscriptionLevel === 5) return <Text>APPRENTICE</Text>;
    if (userData.subscriptionLevel === 4) return <Text>NOVICE</Text>;
    if (userData.subscriptionLevel === 3) return <Text>AD FREE</Text>;
    return <Text>FREE ACCESS</Text>;
  };

  useEffect(() => {
    async function prepare() {
      try {
        setTimeout(async () => {
          const storage = await AsyncStorage.getItem('@stactUserDataStorage');
          setUserData(JSON.parse(storage));
          alert('Storage Set!');
        }, 1000);
      } catch (e) {
        alert('ERROR', JSON.stringify(e));
      }
    }
    prepare();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.alertsTextView}>
        <Text>My Alert Settings</Text>
      </View>

      <View style={{ marginLeft: 10 }}>
        <Text>My Subscription: {renderLevel(userData)} </Text>
      </View>

      <View style={styles.newsLetterContainerView}>
        <View style={[styles.newsLetterTextView, { marginLeft: 10 }]}>
          <Text>Newsletter Subscription</Text>
        </View>
        <View style={styles.newsLetterSwitchView}>
          <Switch
            trackColor={{ false: 'azure', true: 'royalblue' }}
            thumbColor={newsletterEnabled ? 'darkslategrey' : 'darkslategrey'}
            ios_backgroundColor="lightslategrey"
            onValueChange={newsletterSwitch}
            value={newsletterEnabled}
          />
        </View>
      </View>

      <View style={styles.alertMeView}>
        <Text>Alert Me With...</Text>
      </View>

      <View style={styles.switchContainerView}>
        <View style={styles.switchLabelView}>
          <Text>EMAIL</Text>
          {emailInactive === true ? (
            <Text style={styles.upgradeFontText}> (Upgrade for Access) </Text>
          ) : null}
        </View>
        <View style={styles.switchView}>
          <Switch
            trackColor={{ false: 'azure', true: 'royalblue' }}
            thumbColor={emailEnabled ? 'darkslategrey' : 'darkslategrey'}
            ios_backgroundColor="lightslategrey"
            onValueChange={emailSwitch}
            value={emailEnabled}
            disabled={emailInactive}
          />
        </View>
      </View>

      <View style={styles.switchContainerView}>
        <View style={styles.switchLabelView}>
          <Text>PUSH</Text>
          {pushInactive === true ? (
            <Text style={styles.upgradeFontText}> (Upgrade for Access) </Text>
          ) : null}
        </View>
        <View style={styles.switchView}>
          <Switch
            trackColor={{ false: 'azure', true: 'royalblue' }}
            thumbColor={pushEnabled ? 'darkslategrey' : 'darkslategrey'}
            ios_backgroundColor="lightslategrey"
            onValueChange={pushSwitch}
            value={pushEnabled}
            disabled={pushInactive}
          />
        </View>
      </View>

      <View style={styles.switchContainerView}>
        <View style={styles.switchLabelView}>
          <Text>SMS</Text>
          {smsInactive === true ? (
            <Text style={styles.upgradeFontText}> (Upgrade for Access) </Text>
          ) : null}
        </View>
        <View style={styles.switchView}>
          <Switch
            trackColor={{ false: 'azure', true: 'royalblue' }}
            thumbColor={smsEnabled ? 'darkslategrey' : 'darkslategrey'}
            ios_backgroundColor="lightslategrey"
            onValueChange={smsSwitch}
            value={smsEnabled}
            disabled={smsInactive}
          />
        </View>
      </View>

      <View style={styles.alertMeView}>
        <Text>Alert Me When...</Text>
      </View>

      <View style={styles.switchContainerView}>
        <View style={styles.switchLabelView}>
          <Text>BUY</Text>
          {buyInactive === true ? (
            <Text style={styles.upgradeFontText}> (Upgrade for Access) </Text>
          ) : null}
        </View>
        <View style={styles.switchView}>
          <Switch
            trackColor={{ false: 'azure', true: 'royalblue' }}
            thumbColor={buyEnabled ? 'darkslategrey' : 'darkslategrey'}
            ios_backgroundColor="lightslategrey"
            onValueChange={buySwitch}
            value={buyEnabled}
            disabled={buyInactive}
          />
        </View>
      </View>

      <View style={styles.switchContainerView}>
        <View style={styles.switchLabelView}>
          <Text>SELL</Text>
          {sellInactive === true ? (
            <Text style={styles.upgradeFontText}> (Upgrade for Access) </Text>
          ) : null}
        </View>
        <View style={styles.switchView}>
          <Switch
            trackColor={{ false: 'azure', true: 'royalblue' }}
            thumbColor={sellEnabled ? 'darkslategrey' : 'darkslategrey'}
            ios_backgroundColor="lightslategrey"
            onValueChange={sellSwitch}
            value={sellEnabled}
            disabled={sellInactive}
          />
        </View>


        <View>
        <AppSettings />
        </View>


      </View>
    </ScrollView>
  );
};

export default MyAlerts;
