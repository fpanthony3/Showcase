import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Button from '../components/Button';

import { styles } from '../utils/styling';
import { cryptoSignals } from '../testFiles/cryptoSignals';
import { stockSignals } from '../testFiles/stockSignals';

const Favorites = () => {
  //const subscriptionLevel = 7; //FOR TESTING REMOVE DURING FULL PRODUCTION
  const [userData, setUserData] = useState(defaultUserData);

  const [comboList, setComboList] = useState([
    ...stockSignals.signals,
    ...cryptoSignals.signals,
  ]);
  const [favoritesList, setFavoritesList] = useState([]);

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
    for (let i = 0; i < comboList.length; i++) {
      const currentItem = comboList[i];
      if (currentItem.favorite) {
        setFavoritesList((prevState) => [...prevState, currentItem]);
      }
    }
  }, []);

  return (
    <SafeAreaView style={styles.favoritesContainer}>
      {userData.subscriptionLevel < 3 ? (
        <View style={{ flexDirection: 'column', alignItems: 'center' }}>
          <Text>ADD A PROFILE, ACCOUNT</Text>
          <Text>OR SUBSCRIPTION</Text>
          <Text>TO GAIN FULL ACCESS</Text>
        </View>
      ) : (
        <>
          <View style={styles.dataHeaderGroupView}>
            <View style={styles.tickerHeaderView}>
              <Text style={styles.tickerHeaderText}>TICKER:</Text>
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
            data={favoritesList}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.dataGroupView}>
                <View style={[styles.tickerView, { flexDirection: 'row' }]}>
                  <TouchableOpacity onPress={() => addFavorite(item.ticker)}>
                    <Ionicons
                      name={item.favorite ? 'heart' : 'add'}
                      size={18}
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
        </>
      )}
    </SafeAreaView>
  );
};

export default Favorites;
