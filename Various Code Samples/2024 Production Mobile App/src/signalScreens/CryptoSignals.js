import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  Alert,
  View,
  Text,
  Image,
  FlatList,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../components/Button';

import fetchCryptoSignals from '../dataManager/privateAPIFunctions';
import { styles } from '../utils/styling';

const CryptoSignals = () => {
  const [userData, setUserData] = useState();
  const [market, setMarket] = useState('BULL');
  const [noSignals, setNoSignals] = useState(2);
  const [favorite, setFavorite] = useState();
  const [cryptoSignals, setCryptoSignals] = useState([]); // Uncomment
  const [refreshing, setRefreshing] = useState(false);

  const addFavorite = () => {};

  const buyAsset = () => {
    if (userData.subscriptionLevel !== 7) {
      alert(
        'You must upgrade your subscription to "GENIE" to use this feature.'
      );
    } else {
      alert('BUY It');
      //API Buy Here
      //Log On Live Trade Record
    }
  };

  const sellAsset = () => {
    alert('Sell It');
    //Checked owned Assets
    //If Owned API Sell Here
    //Log On Live Trade Record
  };

  //change to setSnr1
  const setSnr1 = (item) => {
    if (item.snr1 === 'BUY') {
      return (
        <View style={[styles.sellButtonView, { backgroundColor: 'green' }]}>
          <Button onPress={buyAsset} title={item.snr1} />
        </View>
      );
    }
    if (item.snr1 === 'SELL' || item.snr1 === 'DUMP') {
      return (
        <View style={[styles.sellButtonView, { backgroundColor: 'red' }]}>
          <Button onPress={sellAsset} title={item.snr1} />
        </View>
      );
    }
    return <Text>{item.snr1}</Text>;
  };

  //change to setSnr7
  const setSnr7 = (item) => {
    if (item.snr7 === 'BUY') {
      return (
        <View style={[styles.sellButtonView, { backgroundColor: 'green' }]}>
          <Button onPress={buyAsset} title={item.snr7} />
        </View>
      );
    }
    if (item.snr7 === 'SELL' || item.snr7 === 'DUMP') {
      return (
        <View style={[styles.sellButtonView, { backgroundColor: 'red' }]}>
          <Button onPress={sellAsset} title={item.snr7} />
        </View>
      );
    }
    return <Text>{item.snr7}</Text>;
  };

  //change to setBoll
  const setBoll = (item) => {
    if (item.boll === 'BUY') {
      return (
        <View style={[styles.sellButtonView, { backgroundColor: 'green' }]}>
          <Button onPress={buyAsset} title={item.boll} />
        </View>
      );
    }
    if (item.boll === 'SELL' || item.boll === 'DUMP') {
      return (
        <View style={[styles.sellButtonView, { backgroundColor: 'red' }]}>
          <Button onPress={sellAsset} title={item.boll} />
        </View>
      );
    }
    return <Text>{item.boll}</Text>;
  };

  const apiUrl = 'http://104.197.226.213:3000/get-crypto-signals';

  const fetchCryptoSignals = async () => {
    try {
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setCryptoSignals(data);
      setRefreshing(false);
    } catch (error) {
      console.error('Error fetching crypto signals:', error);

      //\n${JSON.stringify(error)}
      // Display an alert with the JSON returned from the server
      Alert.alert(
        'Error',
        `There was an error fetching data from the database. Please try again later.
        `,
        [{ text: 'OK' }]
      );
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchCryptoSignals();
  };

  /*
  useEffect(() => {
    async function prepare() {
      try {
        setTimeout(async () => {
          const storage = await AsyncStorage.getItem('@stactUserDataStorage');
          //setUserData(JSON.parse(storage));
        }, 1000);
      } catch (e) {
        alert('ERROR', JSON.stringify(e));
      }
    }
    prepare();
  }, [save]);
  */

  useEffect(() => {
    fetchCryptoSignals();
    if (userData.subscriptionLevel === 1 || userData.subscriptionLevel === 2) {
      setNoSignals(5);
    }
    if (userData.subscriptionLevel === 3) {
      setNoSignals(10);
    }
    if (userData.subscriptionLevel === 4) {
      setNoSignals(20);
    }
    if (userData.subscriptionLevel === 5) {
      setNoSignals(30);
    }
    if (userData.subscriptionLevel === 6) {
      setNoSignals(40);
    }
    if (userData.subscriptionLevel === 7) {
      setNoSignals(50);
    }
    try {
      setTimeout(async () => {
        AsyncStorage.getItem('userDataStorage').then((value) => {
          if (value != null) {
            setUserData(JSON.parse(value));
          }
        });

        AsyncStorage.getItem('@stactUserFavorites').then((value) => {
          if (value != null) {
            setUserData(JSON.parse(value));
          }
        });
      });
    } catch (error) {
      alert('Error:     ', error);
    }
  }, [noSignals, userData.subscriptionLevel]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', marginVertical: 10 }}>
        <Text
          style={{
            marginLeft: 15,
            alignSelf: 'center',
            fontWeight: 'bold',
          }}>
          MARKET:
        </Text>
        <Image
          style={{
            flex: 0.2,
            height: 20,
            alignSelf: 'center',
            justifyContent: 'center',
            resizeMode: 'contain',
          }}
          source={
            market === 'BULL'
              ? require('../images/bull.png')
              : require('../images/bear.png')
          }
        />
      </View>

      <View style={styles.dataHeaderGroupView}>
        <View style={styles.tickerHeaderView}>
          <Text style={styles.tickerHeaderText}>CRYPTO:</Text>
        </View>
        <View style={styles.dataHeaderView}>
          <Text style={styles.dataHeaderText}>SNR1</Text>
        </View>
        <View style={styles.dataHeaderView}>
          <Text style={styles.dataHeaderText}>SNR7</Text>
        </View>
        <View style={styles.dataHeaderView}>
          <Text style={styles.dataHeaderText}>BOLL</Text>
        </View>
      </View>

      <FlatList
        data={cryptoSignals}
        keyExtractor={({ id }, index) => String(id)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderItem={({ item, index }) => (
          <View style={styles.dataGroupView}>
            <View
              style={[
                styles.tickerView,
                { flexDirection: 'row', alignItems: 'flex-end' },
              ]}>
              <TouchableOpacity
                onPress={() => addFavorite(item.product_ticker)}>
                <Ionicons
                  name={item.favorite ? 'color-wand' : 'add'}
                  size={20}
                  color={item.favorite ? 'red' : 'dimgray'}
                  style={{ marginHorizontal: 8 }}
                />
              </TouchableOpacity>
              <Text style={styles.tickerText}>{item.product_ticker}</Text>
            </View>

            <View style={styles.dataView}>
              <Text style={{ textAlign: 'center' }}>{setSnr1(item)}</Text>
            </View>
            <View style={styles.dataView}>
              <Text style={{ textAlign: 'center' }}>{setSnr7(item)}</Text>
            </View>
            <View style={styles.dataView}>
              <Text style={{ textAlign: 'center' }}>{setBoll(item)}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default CryptoSignals;
