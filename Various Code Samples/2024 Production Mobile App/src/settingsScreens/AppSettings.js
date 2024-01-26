import React, { useState, useContext } from 'react';
import { View, Text, Image, Switch, ScrollView } from 'react-native';

import Settings from '../utils/FunctionContext';

import { styles } from '../utils/styling';

/*<TouchableOpacity style={styling.editBlockTouch}>
        <Image
          style={styling.editBlockImage}
          source={require('../images/edit.png')}
        />
        <Text style={styling.editBlockText}>EDIT</Text>
      </TouchableOpacity>*/

const AppSettings = () => {
  const context = useContext(Settings);

  const [blueEnabled, setBlueEnabled] = useState(false);
  const blueSwitch = () => setBlueEnabled((previousState) => !previousState);

  const [greenEnabled, setGreenEnabled] = useState(false);
  const greenSwitch = () => setGreenEnabled((previousState) => !previousState);

  const [darkEnabled, setDarkEnabled] = useState(false);
  const darkSwitch = () => setDarkEnabled((previousState) => !previousState);

  const [twofaEnabled, setTwofaEnabled] = useState(false);
  const twofaSwitch = () => {
    setTwofaEnabled((previousState) => !previousState),
      setShouldShow(!shouldShow);
  };

  const [emailfaEnabled, setEmailfaEnabled] = useState(false);
  const emailfaSwitch = () =>
    setEmailfaEnabled((previousState) => !previousState);

  const [smsfaEnabled, setSmsfaEnabled] = useState(false);
  const smsfaSwitch = () => setSmsfaEnabled((previousState) => !previousState);

  const [faceidEnabled, setFaceidEnabled] = useState(false);
  const faceidSwitch = () =>
    setFaceidEnabled((previousState) => !previousState);

  const [pinEnabled, setPinEnabled] = useState(false);
  const pinSwitch = () => setPinEnabled((previousState) => !previousState);

  const [shouldShow, setShouldShow] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={styles.avatarIconView}>
          <Image
            style={styles.avatarIconImage}
            source={require('../images/genieHead.png')}
          />
        </View>
        <View style={styles.alignCenterView}>
          <Text>{context.userName}</Text>
        </View>
      </View>
      <View style={styles.blockLabelView}>
        <Text> APP THEME:</Text>
        <View style={styles.switchBlockView}>
          <View style={styles.settingsSwitchLabelView}>
            <Text> Blue</Text>
          </View>
          <View style={styles.settingsSwitchView}>
            <Switch
              trackColor={styles.trackColorSwitch}
              thumbColor={blueEnabled ? 'darkslategrey' : 'darkslategrey'}
              ios_backgroundColor="lightslategrey"
              onValueChange={blueSwitch}
              value={blueEnabled}
            />
          </View>
        </View>
      </View>
      <View style={styles.switchBlockView}>
        <View style={styles.settingsSwitchLabelView}>
          <Text> Green</Text>
        </View>
        <View style={styles.settingsSwitchView}>
          <Switch
            trackColor={styles.trackColorSwitch}
            thumbColor={greenEnabled ? 'darkslategrey' : 'darkslategrey'}
            ios_backgroundColor="lightslategrey"
            onValueChange={greenSwitch}
            value={greenEnabled}
          />
        </View>
      </View>
      <View style={styles.switchBlockView}>
        <View style={styles.settingsSwitchLabelView}>
          <Text> Dark</Text>
        </View>
        <View style={styles.settingsSwitchView}>
          <Switch
            trackColor={styles.trackColorSwitch}
            thumbColor={darkEnabled ? 'darkslategrey' : 'darkslategrey'}
            ios_backgroundColor="lightslategrey"
            onValueChange={darkSwitch}
            value={darkEnabled}
          />
        </View>
      </View>
      <View style={styles.blockLabelView}></View>
      <View>
        <Text> SECURITY:</Text>
        <View style={styles.switchBlockView}>
          <View style={styles.settingsSwitchLabelView}>
            <Text> Face ID</Text>
          </View>
          <View style={styles.settingsSwitchView}>
            <Switch
              trackColor={styles.trackColorSwitch}
              thumbColor={greenEnabled ? 'darkslategrey' : 'darkslategrey'}
              ios_backgroundColor="lightslategrey"
              onValueChange={faceidSwitch}
              value={faceidEnabled}
            />
          </View>
        </View>
        <View style={styles.switchBlockView}>
          <View style={styles.settingsSwitchLabelView}>
            <Text> PIN</Text>
          </View>
          <View style={styles.settingsSwitchView}>
            <Switch
              trackColor={styles.trackColorSwitch}
              thumbColor={darkEnabled ? 'darkslategrey' : 'darkslategrey'}
              ios_backgroundColor="lightslategrey"
              onValueChange={pinSwitch}
              value={pinEnabled}
            />
          </View>
        </View>

        <View style={styles.switchBlockView}>
          <View style={styles.settingsSwitchLabelView}>
            <Text> 2FA</Text>
          </View>
          <View style={styles.settingsSwitchView}>
            <Switch
              trackColor={styles.trackColorSwitch}
              thumbColor={twofaEnabled ? 'darkslategrey' : 'darkslategrey'}
              ios_backgroundColor="lightslategrey"
              onValueChange={twofaSwitch}
              value={twofaEnabled}
            />
          </View>
        </View>
      </View>

      {shouldShow ? (
        <View style={styles.hiddenBlockView}>
          <View>
            <View style={styles.hiddenSwitchBlockView}>
              <View style={styles.settingsSwitchLabelView}>
                <Text> Email</Text>
              </View>
              <View style={styles.hiddenSwitchView}>
                <Switch
                  trackColor={styles.trackColorSwitch}
                  thumbColor={
                    emailfaEnabled ? 'darkslategrey' : 'darkslategrey'
                  }
                  ios_backgroundColor="lightslategrey"
                  onValueChange={emailfaSwitch}
                  value={emailfaEnabled}
                />
              </View>
            </View>
          </View>

          <View>
            <View style={styles.hiddenSwitchBlockView}>
              <View style={styles.settingsSwitchLabelView}>
                <Text> SMS</Text>
              </View>
              <View style={styles.hiddenSwitchView}>
                <Switch
                  trackColor={styles.trackColorSwitch}
                  thumbColor={smsfaEnabled ? 'darkslategrey' : 'darkslategrey'}
                  ios_backgroundColor="lightslategrey"
                  onValueChange={smsfaSwitch}
                  value={smsfaEnabled}
                />
              </View>
            </View>
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
};

export default AppSettings;
