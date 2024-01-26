import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { theme } from '../utils/themes';
import { styles } from '../utils/styling';

import AboutInfo from '../settingsScreens/AboutInfo';
import SubscriptionInfo from '../settingsScreens/Subscriptions';
import ContactUs from '../settingsScreens/ContactUs';
import MyAccount from '../settingsScreens/MyAccount';
import MyAlerts from '../settingsScreens/MyAlerts';
import AppSettings from '../settingsScreens/AppSettings';

class SettingsScreen extends React.Component {
  state = {
    userData: {
      user_id: '',
      subscription_level: 0,
      language: 'english',
      theme: 'default',
      // ... other local fields
    },
    loading: true,
  };

  componentDidMount() {
    this.prepareData();
  }

  prepareData = async () => {
    try {
      const localData = await AsyncStorage.getItem('@testStorage');
      alert(JSON.stringify(localData));

      if (localData) {
        const mergedData = { ...this.state.userData, ...JSON.parse(localData) };
        this.setState({ userData: mergedData, loading: false });
      } else {
        // Handle the case where local data is not available
        Alert.alert('Local data is not available.');
        this.setState({ loading: false }); // Set loading to false to render UI
      }
    } catch (e) {
      // Handle any errors during data retrieval
      Alert.alert('Error retrieving local data:', e);
      this.setState({ loading: false }); // Set loading to false to render UI
    }
  };

  renderLevel() {
    const { userData } = this.state;

    if (userData && userData.subscription_level === 7)
      return <Text>GENIE</Text>;
    if (userData && userData.subscription_level === 6)
      return <Text>MAGICIAN</Text>;
    if (userData && userData.subscription_level === 5)
      return <Text>APPRENTICE</Text>;
    if (userData && userData.subscription_level === 4)
      return <Text>NOVICE</Text>;
    if (userData && userData.subscription_level === 3)
      return <Text>AD FREE</Text>;
    return <Text>FREE ACCESS</Text>;
  }

  renderAction() {
    const { userData } = this.state;

    if (userData && userData.subscription_level === 6)
      return (
        <Text style={styles.alignRightText}>
          Upgrade to <Text style={styles.subscriptionUpgradeText}>GENIE</Text>
        </Text>
      );
    else if (userData && userData.subscription_level === 5)
      return (
        <Text style={styles.alignRightText}>
          Upgrade to{' '}
          <Text style={styles.subscriptionUpgradeText}>MAGICIAN</Text>
        </Text>
      );
    else if (userData && userData.subscription_level === 4)
      return (
        <Text style={styles.alignRightText}>
          Upgrade to{' '}
          <Text style={styles.subscriptionUpgradeText}>APPRENTICE</Text>
        </Text>
      );
    else if (userData && userData.subscription_level === 3)
      return (
        <View style={styles.columnView}>
          <Text style={styles.alignRightText}>
            Become a <Text style={styles.subscriptionUpgradeText}>NOVICE</Text>
          </Text>
        </View>
      );
    else if (userData && userData.subscription_level === 2)
      return (
        <View style={styles.columnView}>
          <Text style={styles.alignRightText}>Go AD FREE or Subscribe</Text>
        </View>
      );
    else if (userData && userData.subscription_level === 1)
      return <Text style={styles.alignRightText}>Create an Account</Text>;
    return <Text>Create Profile or Account</Text>;
  }
  
  //<Text> FOR TESTING ONLY </Text>
        //<Text> subscription_level: {userData.subscription_level}</Text>
        //<Text> ------------------------------------</Text>

  render() {
    return (      
      <View style={styles.container}>

        


        {this.state.userData.subscription_level === 7 ? (
          <View style={styles.subscriptionGenieView}>
            <Text style={styles.subscriptionGenieText}>
              Woohoo! You are a GENIE
            </Text>
          </View>
        ) : (
          <View style={styles.subscriptionUpgradeView}>
            <View style={styles.subscriptionUpgradeLeftView}>
              <Text>Want More Access?</Text>
            </View>
            <View style={styles.subscriptionUpgradeRightView}>
              {this.renderAction(this.state.userData)}
            </View>
          </View>
        )}

        <View style={styles.avatarIconView}>
          <Image
            style={styles.avatarIconImage}
            source={require('../images/genieHead.png')}
          />
        </View>
        <View style={styles.alignCenterView}>
          {this.state.userData.subscription_level != 0 ? (
            <Text>{this.state.userData.username}</Text>
          ) : (
            <Text>Create a Profile</Text>
          )}
        </View>
        <View style={styles.alignCenterView}>
          <Text style={styles.levelText}>
            {this.renderLevel(this.state.userData)}
          </Text>
        </View>

        <View style={styles.space}></View>

        <TouchableOpacity
          style={styles.settingsTab}
          onPress={() => this.props.navigation.navigate('MyAccount')}>
          <Image
            style={styles.icon}
            source={
              this.state.userData.subscription_level < 2
                ? require('../images/lock.png')
                : require('../images/key.png')
            }
          />
          <Text style={styles.settingsLink}> My Account</Text>
          <View style={styles.right}>
            <Image
              style={styles.rightArrow}
              source={require('../images/arrow.png')}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.space}></View>
        <View style={styles.space}></View>

        <TouchableOpacity
          style={styles.settingsTab}
          onPress={() => this.props.navigation.navigate('About')}>
          <Image style={styles.icon} source={require('../images/app.png')} />
          <Text style={styles.settingsLink}> About</Text>
          <View style={styles.right}>
            <Image
              style={styles.rightArrow}
              source={require('../images/arrow.png')}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsTab}
          onPress={() => this.props.navigation.navigate('Subscription')}>
          <Image
            style={styles.icon}
            source={require('../images/subscription.png')}
          />
          <Text style={styles.settingsLink}> Subscription Information</Text>
          <View style={styles.right}>
            <Image
              style={styles.rightArrow}
              source={require('../images/arrow.png')}
            />
          </View>
        </TouchableOpacity>

        <View style={styles.space}></View>
        <View style={styles.space}></View>

        <TouchableOpacity
          style={styles.settingsTab}
          onPress={() => this.props.navigation.navigate('Contact')}>
          <Image
            style={styles.sendIcon}
            source={require('../images/contact.png')}
          />
          <Text style={styles.settingsLink}> Contact Us</Text>
          <View style={styles.right}>
            <Image
              style={styles.rightArrow}
              source={require('../images/arrow.png')}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsTab}
          onPress={() => this.props.navigation.navigate('Policy')}>
          <Image
            style={styles.icon}
            source={require('../images/document.png')}
          />
          <Text style={styles.settingsLink}> Privacy Policy</Text>
          <View style={styles.right}>
            <Image
              style={styles.rightArrow}
              source={require('../images/arrow.png')}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.settingsTab}
          onPress={() => this.props.navigation.navigate('Terms')}>
          <Image
            style={styles.icon}
            source={require('../images/document.png')}
          />
          <Text style={styles.settingsLink}> Terms of Use</Text>
          <View style={styles.right}>
            <Image
              style={styles.rightArrow}
              source={require('../images/arrow.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

class AboutScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <AboutInfo />
      </View>
    );
  }
}

class SubscriptionScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SubscriptionInfo />
      </View>
    );
  }
}

class ContactScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <ContactUs />
      </View>
    );
  }
}

const AppNavigator = createStackNavigator(
  //CHANGE SettingsScreen TO HomeScreen FOR EXTROPULATING SETTINGS SCREEN TO FUNCTIONAL COMPONENT
  {
    Home: SettingsScreen,
    About: AboutScreen,
    //AppSettings: AppSettings,
    Subscription: SubscriptionScreen,
    MyAccount: MyAccount,
    //MyAlerts: MyAlerts,
    Contact: ContactScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

//CHANGE SettingsScreen TO HomeScreen FOR EXTROPULATING SETTINGS SCREEN TO FUNCTIONAL COMPONENT
SettingsScreen.navigationOptions = () => {
  return {
    headerTitle: 'App Account Settings',
    headerStyle: {
      backgroundColor: theme.backGround,
    },
    headerTitleStyle: {
      alignSelf: 'center',
    },
  };
};

AboutScreen.navigationOptions = () => {
  return {
    headerTitle: 'App Information',
    headerStyle: {
      backgroundColor: theme.backGround,
    },
  };
};

SubscriptionScreen.navigationOptions = () => {
  return {
    headerTitle: 'Subscription Levels',
    headerStyle: {
      backgroundColor: theme.backGround,
    },
  };
};

AppSettings.navigationOptions = () => {
  return {
    headerTitle: 'App Settings',
    headerStyle: {
      backgroundColor: theme.backGround,
    },
  };
};

MyAccount.navigationOptions = () => {
  return {
    headerTitle: 'My Account',
    headerStyle: {
      backgroundColor: theme.backGround,
    },
  };
};

MyAlerts.navigationOptions = () => {
  return {
    headerTitle: 'My Alerts',
    headerStyle: {
      backgroundColor: theme.backGround,
    },
  };
};

ContactScreen.navigationOptions = () => {
  return {
    headerTitle: 'Contact Us',
    headerStyle: {
      backgroundColor: theme.backGround,
    },
  };
};

/*<TouchableOpacity
          style={styles.settingsTab}
          onPress={() => this.props.navigation.navigate('MyAlerts')}>
          <Image
            style={styles.icon}
            source={
              this.state.userData.subscription_level < 2
                ? require('../images/lock.png')
                : require('../images/alerts.png')
            }
          />
          <Text style={styles.settingsLink}> My Alerts</Text>
          <View style={styles.right}>
            <Image
              style={styles.rightArrow}
              source={require('../images/arrow.png')}
            />
          </View>
      </TouchableOpacity>*/
