import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import Button from '../components/Button';
import PaperTradePopup from '../components/PaperTradePopUp';

//import { defaultPaperTradeData } from '../utils/dataFiles/DefaultPaperTradeData';

import { styles } from '../utils/styling';

const PaperTrade = () => {
  const [paperTradeData, setPaperTradeData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [tradeId, setTradeId] = useState();

  function setPnlColor(item) {
    if (item.sellPrice > item.buyPrice) {
      return 'green';
    }
    if (item.sellPrice < item.buyPrice) {
      return 'red';
    }
    return 'black';
  }

  const addSell = () => {
    Alert.alert(
      'You sold one!',
      'Hope you made some money',
      [
        { text: 'Yes', onPress: () => console.log('Yes button clicked') },
        {
          text: 'No',
          onPress: () => console.log('No button clicked'),
          style: 'cancel',
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  const openPopup = () => {
    setTradeId(paperTradeData.length);
    setShowPopup(!showPopup);
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
    try {
      setTimeout(async () => {
        const storage = await AsyncStorage.getItem('@STACTPaperTradeStorage');
        //alert('STORAGE');
        //alert(storage);
        if (storage !== null) {
          setPaperTradeData(JSON.parse(storage));
        }
      });
    } catch (e) {
      alert('ERROR', JSON.stringify(e));
    }
  }, []);

  return (
    <View style={styles.container}>
      <View style={[styles.paperContainer, { marginVertical: 10 }]}>
        <View style={styles.notebookHeaderView}>
          <Text style={styles.paperHeaderText}>My Paper Trades</Text>
        </View>
        <ScrollView>
          <View style={styles.paperTradesHeaderGroupView}>
            <View style={styles.paperMarginView}></View>

            <View style={styles.paperLineView}></View>

            <View style={styles.paperTickerHeaderView}>
              <Text style={styles.paperTickerHeaderText}>TICKER:</Text>
            </View>
            <View style={styles.paperDataHeaderView}>
              <Text style={styles.paperDataHeaderText}>BUY</Text>
            </View>
            <View style={styles.paperDataHeaderView}>
              <Text style={styles.paperDataHeaderText}>SELL</Text>
            </View>
            <View style={styles.paperDataHeaderView}>
              <Text style={styles.paperDataHeaderText}>PNL</Text>
            </View>
          </View>

          <FlatList
            data={paperTradeData}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              <View style={styles.paperTradesGroupView}>
                <View style={styles.paperMarginView}></View>
                <View style={styles.paperLineView}></View>
                <View style={styles.paperTickerView}>
                  <Text style={styles.paperTickerText}>{item.ticker}</Text>
                </View>
                <View style={styles.paperDataView}>
                  <Text style={styles.paperDataText}>{item.buyPrice}</Text>
                </View>
                <View style={styles.paperDataView}>
                  {item.buyPrice && item.sellPrice ? (
                    <Text style={styles.paperDataText}>{item.sellPrice}</Text>
                  ) : item.buyPrice && !item.sellPrice ? (
                    <View style={styles.sellButtonView}>
                      <Button onPress={addSell} title="SELL" />
                    </View>
                  ) : null}
                </View>
                <View style={styles.paperDataView}>
                  <Text
                    style={{
                      color: setPnlColor(item),
                      textAlign: 'center',
                      fontFamily: 'Bradley Hand',
                      fontSize: 16,
                    }}>
                    {item.sellPrice
                      ? `${(
                          ((item.sellPrice - item.buyPrice) / item.buyPrice) *
                          100
                        ).toFixed(0)}%`
                      : null}
                  </Text>
                </View>
              </View>
            )}
          />
        </ScrollView>
      </View>

      {showPopup === false ? (
        <View style={styles.addNewButtonView}>
          <Button title="ADD NEW BUY" onPress={openPopup} />
        </View>
      ) : (
        <KeyboardAvoidingView
          style={{
            backgroundColor: 'lightgrey',
            marginHorizontal: 5,
            borderRadius: 20,
            borderColor: 'lightsteelblue',
            borderWidth: 1,
            alignItems: 'center',
            alignContent: 'center',
            zIndex: 0,
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <PaperTradePopup onPress={openPopup} tradeId={tradeId} />
        </KeyboardAvoidingView>
      )}
    </View>
  );
};

/*
{item.sellPrice ? (
                  <Text style={styles.paperDataText}>{item.sellPrice}</Text>
                ) : (
                  <View style={styles.sellButtonView}>
                    <Button onPress={addSell} title="SELL" />
                  </View>
                )}
                */

export default PaperTrade;
