import React, { useState, useEffect, useContext } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from '../components/Button';

import { styles } from '../utils/styling';
import { stockSignals } from '../testFiles/stockSignals';
import { defaultUserData } from '../utils/dataFiles/DefaultUserData';

const StockSignals = () => {
  const [userData, setUserData] = useState(defaultUserData);
  const [market, setMarket] = useState('BULL');
  const [noSignals, setNoSignals] = useState(2);
  const [favorite, setFavorite] = useState();

  const addFavorite = (ticker) => {
    alert('FAVORITE!!!!!!!!!');
  };

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

  const setSht = (item) => {
    if (item.shtSignal === 'BUY') {
      return (
        <View style={[styles.sellButtonView, { backgroundColor: 'green' }]}>
          <Button onPress={buyAsset} title={item.shtSignal} />
        </View>
      );
    }
    if (item.shtSignal === 'SELL' || item.shtSignal === 'DUMP') {
      return (
        <View style={[styles.sellButtonView, { backgroundColor: 'red' }]}>
          <Button onPress={sellAsset} title={item.shtSignal} />
        </View>
      );
    }
    return <Text>{item.shtSignal}</Text>;
  };

  const setMdm = (item) => {
    if (item.mdmSignal === 'BUY') {
      return (
        <View style={[styles.sellButtonView, { backgroundColor: 'green' }]}>
          <Button onPress={buyAsset} title={item.mdmSignal} />
        </View>
      );
    }
    if (item.mdmSignal === 'SELL' || item.mdmSignal === 'DUMP') {
      return (
        <View style={[styles.sellButtonView, { backgroundColor: 'red' }]}>
          <Button onPress={sellAsset} title={item.mdmSignal} />
        </View>
      );
    }
    return <Text>{item.mdmSignal}</Text>;
  };

  const setLng = (item) => {
    if (item.lngSignal === 'BUY') {
      return (
        <View style={[styles.sellButtonView, { backgroundColor: 'green' }]}>
          <Button onPress={buyAsset} title={item.lngSignal} />
        </View>
      );
    }
    if (item.lngSignal === 'SELL' || item.lngSignal === 'DUMP') {
      return (
        <View style={[styles.sellButtonView, { backgroundColor: 'red' }]}>
          <Button onPress={sellAsset} title={item.lngSignal} />
        </View>
      );
    }
    return <Text>{item.lngSignal}</Text>;
  };

  /*
  useEffect(() => {
    async function prepare() {
      try {
        setTimeout(async () => {
          const storage = await AsyncStorage.getItem('@stactUserDataStorage');
          alert('STORAGE');
          alert(storage);
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
        AsyncStorage.getItem('@stactUserDataStorage').then((value) => {
          if (value != null) {
            setUserData(JSON.parse(value));
          }
        });
      }, 2000);
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
          <Text style={styles.tickerHeaderText}>STOCK:</Text>
        </View>
        <View style={styles.dataHeaderView}>
          <Text style={styles.dataHeaderText}>SHT</Text>
        </View>
        <View style={styles.dataHeaderView}>
          <Text style={styles.dataHeaderText}>MDM</Text>
        </View>
        <View style={styles.dataHeaderView}>
          <Text style={styles.dataHeaderText}>LNG</Text>
        </View>
      </View>

      <FlatList
        data={stockSignals.signals}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <View style={styles.dataGroupView}>
            <View
              style={[
                styles.tickerView,
                { flexDirection: 'row', alignItems: 'flex-end' },
              ]}>
              <TouchableOpacity onPress={() => addFavorite(item.ticker)}>
                <Ionicons
                  name={item.favorite ? 'color-wand' : 'add'}
                  size={20}
                  color={item.favorite ? 'red' : 'dimgray'}
                  style={{ marginHorizontal: 8 }}
                />
              </TouchableOpacity>
              <Text style={styles.tickerText}>{item.ticker}</Text>
            </View>

            <View style={styles.dataView}>
              <Text style={{ textAlign: 'center' }}>{setSht(item)}</Text>
            </View>
            <View style={styles.dataView}>
              <Text style={{ textAlign: 'center' }}>{setMdm(item)}</Text>
            </View>
            <View style={styles.dataView}>
              <Text style={{ textAlign: 'center' }}>{setLng(item)}</Text>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default StockSignals;
