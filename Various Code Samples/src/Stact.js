import React, { useContext } from 'react';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { theme } from './utils/themes';

import NewsScreen from './mainScreens/NewsScreen';
import SignalScreen from './mainScreens/SignalScreen';
import HotTradesScreen from './mainScreens/HotTradesScreen';
import TradeScreen from './mainScreens/TradeScreen';
import SettingsScreen from './mainScreens/SettingsScreen';

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: SignalScreen },
    News: { screen: NewsScreen },
    Trade: { screen: TradeScreen },
    HotTrades: { screen: HotTradesScreen },
    Settings: { screen: SettingsScreen },
    //   md-sync-circle-sharp, repeat ---options for trading page icon if seperate from home page or change home page when trading implementated
  },
  {
    initialRouteName: 'Settings',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Trade') {
          iconName = 'md-sync-circle-sharp';
        } else if (routeName === 'News') {
          iconName = 'newspaper';
        } else if (routeName === 'Home') {
          iconName = 'ios-home';
        } else if (routeName === 'HotTrades') {
          iconName = 'flame';
        } else if (routeName === 'Settings') {
          iconName = 'settings-sharp';
        }

        return (
          <IconComponent
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      },
    }),

    tabBarOptions: {
      activeTintColor: theme.activeIcon,
      inactiveTintColor: theme.inActiveIcon,
      showIcon: true,
      showLabel: false,
      style: {
        backgroundColor: theme.backGround,
      },
    },
  }
);

export default createAppContainer(TabNavigator);
