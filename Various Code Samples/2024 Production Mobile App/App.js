// App.js
import React, { useCallback, useEffect, useState } from 'react';
import { Text, View, Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SplashScreen from 'expo-splash-screen';
import AppLogo from './src/components/AppLogo';
import Stact from './src/Stact';

const createLocalStorage = async () => {
  try {
    // create default values
    const defaultData = {
      user_id: 1,
      subscription_level: 0,
      language: 'english',
      theme: 'default',
    };

    // Save default data to @testStorage
    await AsyncStorage.setItem('@testStorage', JSON.stringify(defaultData));
  } catch (error) {
    Alert.alert('Error creating local storage', error.message);
  }
};

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);
  //const [subscription_level, setSubscription_level] = useState(0);

  useEffect(() => {
    async function prepare() {
      try {
        setTimeout(async () => {
          const storage = await AsyncStorage.getItem('@testStorage');
          // alert(JSON.stringify(storage));  //***** FOR TESTING ONLY */
          if (!storage) {
            // Parse and set the user data only if storage is not null/undefined
            await createLocalStorage(); // Call createLocalStorage directly
          }
        }, 1000);
      } catch (e) {
        alert(e);
      } finally {
        // Tell the application to render
        setTimeout(() => {
          setAppIsReady(true);
        }, 3000);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // 'setAppIsReady', then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightsteelblue',
          alignItems: 'center',
          paddingTop: '5%',
        }}
        onLayout={onLayoutRootView}>
        <Image
          style={{
            width: '75%',
            top: 50,
            resizeMode: 'contain',
          }}
          source={require('./src/images/genieLogo.png')}
        />
        <View style={{ marginTop: '15%' }}>
          <AppLogo size={25} />
        </View>
        <View
          style={{
            flexDirection: 'column',
            position: 'absolute',
            bottom: '20%',
          }}>
          <Text
            style={{
              fontFamily: 'ChalkboardSE-Regular',
              fontSize: 20,
              color: 'royalblue',
              textAlign: 'center',
            }}>
            YOUR ONE STOP
          </Text>
          <Text
            style={{
              fontFamily: 'ChalkboardSE-Regular',
              fontSize: 20,
              color: 'royalblue',
              textAlign: 'center',
            }}>
            FOR ALL YOUR
          </Text>
          <Text
            style={{
              fontFamily: 'ChalkboardSE-Regular',
              fontSize: 20,
              color: 'royalblue',
              textAlign: 'center',
            }}>
            TRADING INSIGHT!
          </Text>
        </View>
      </View>
    );
  }

  if (appIsReady) {
    return <Stact />;
  }
}
