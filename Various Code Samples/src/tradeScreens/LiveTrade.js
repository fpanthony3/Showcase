import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, FlatList, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Header from '../components/Header';
import Button from '../components/Button';

import { styles } from '../utils/styling';

const LiveTrade = () => {
  const [paperTradeData, setPaperTradeData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [tradeId, setTradeId] = useState();

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
    <SafeAreaView style={styles.container}>
      <View
        style={[
          styles.paperContainer,
          { backgroundColor: 'whitesmoke', marginVertical: 10 },
        ]}>
        <View
          style={[styles.notebookHeaderView, { backgroundColor: 'darkblue' }]}>
          <Text style={[styles.paperHeaderText, { color: 'white' }]}>
            My Live Trades
          </Text>
        </View>

        <ScrollView>
          <View
            style={[
              styles.paperTradesHeaderGroupView,
              { backgroundColor: 'whitesmoke' },
            ]}>
            <View
              style={[
                styles.paperMarginView,
                { borderColor: 'lightsteelblue' },
              ]}></View>

            <View
              style={[
                styles.paperLineView,
                { borderColor: 'lightsteelblue' },
              ]}></View>

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
              <View
                style={[
                  styles.paperTradesGroupView,
                  { backgroundColor: 'whitesmoke' },
                ]}>
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
    </SafeAreaView>
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

export default LiveTrade;
