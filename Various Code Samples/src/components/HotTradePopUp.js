import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Button from './Button';
import { styles } from '../utils/styling';

const HotTradePopup = ({ onPress, tradeId }) => {
  const [paperTradeData, setPaperTradeData] = useState([]);
  const [ticker, setTicker] = useState('');
  const [buyPrice, setBuyPrice] = useState('');
  const [myPaperTrade, setMyPaperTrade] = useState([]);

  const handleSetTicker = (text) => {
    setMyPaperTrade({ ...myPaperTrade, tradeId: tradeId, ticker: text });
    setTicker(text);
  };

  const handleSetBuyPrice = (text) => {
    setMyPaperTrade({ ...myPaperTrade, buyPrice: text });
    setBuyPrice(text);
  };

  const addNew = () => {
    onPress();
    handleSaveObject();
  };

  const cancel = () => {
    onPress();
  };

  const handleSaveObject = () => {
    alert('Saved Object:');
    alert(JSON.stringify(myPaperTrade));
    setPaperTradeData([...paperTradeData, myPaperTrade]);
    if (paperTradeData.length > 50) {
      setPaperTradeData(paperTradeData.slice(paperTradeData.length - 50));
    }
  };

  /*
  useEffect(() => {
      try {
        setTimeout(async () => {
          const storage = await AsyncStorage.getItem('@stactPaperTradeStorage');
          alert('STORAGE');
          alert(storage);
          setPaperTradeData(JSON.parse(storage));
        }, 1000);
      } catch (e) {
        alert('ERROR', JSON.stringify(e));
      }
    }
  }, []);
  */

  return (
    <View
      style={{
        flexDirection: 'column',
        width: '90%',
        margin: 5,
        alignItems: 'center',
        backgroundColor: 'lightsteelblue',
        borderRadius: 5,
        borderColor: 'royalblue',
        borderWidth: 2,
        zIndex: 1,
      }}>
      <Text>TICKER:</Text>
      <TextInput
        style={{
          height: 30,
          width: 120,
          backgroundColor: 'lightgrey',
          borderRadius: 5,
          borderColor: 'royalblue',
          borderWidth: 1,
        }}
        value={ticker}
        onChangeText={handleSetTicker}
        autoCapitalize="characters"
      />

      <View
        style={{
          flexDirection: 'row',
          marginHorizontal: 10,
          justifyContent: 'center',
        }}>
        <View
          style={{
            flex: 0.4,
            flexDirection: 'column',
            marginVertical: 10,
            alignItems: 'center',
          }}>
          <Text style={{ textAlign: 'center' }}>BUY PRICE:</Text>
          <TextInput
            style={{
              height: 30,
              width: '90%',
              backgroundColor: 'lightgrey',
              borderRadius: 5,
              borderColor: 'royalblue',
              borderWidth: 1,
            }}
            keyboardType="numeric"
            value={buyPrice}
            onChangeText={handleSetBuyPrice}
          />
          <Text style={{ textAlign: 'center' }}>SELL PRICE:</Text>
          <TextInput
            style={{
              height: 30,
              width: '90%',
              backgroundColor: 'lightgrey',
              borderRadius: 5,
              borderColor: 'royalblue',
              borderWidth: 1,
            }}
            keyboardType="numeric"
            value={buyPrice}
            onChangeText={handleSetBuyPrice}
          />
        </View>
        <View
          style={{ flex: 0.2, marginVertical: 10, justifyContent: 'center' }}>
          <Text style={{ textAlign: 'center' }}>OR</Text>
        </View>
        <View
          style={{
            flex: 0.4,
            flexDirection: 'column',
            marginVertical: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ textAlign: 'center' }}>GAIN:</Text>
          <TextInput
            style={{
              height: 30,
              width: '90%',
              backgroundColor: 'lightgrey',
              borderRadius: 5,
              borderColor: 'royalblue',
              borderWidth: 1,
            }}
            keyboardType="numeric"
            value={buyPrice}
            onChangeText={handleSetBuyPrice}
          />
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 0.5 }}>
          <View
            style={{
              height: 40,
              backgroundColor: 'royalblue',
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 25,
              border: 1,
              borderRadius: 20,
              overflow: 'hidden',
            }}>
            <Button title="Save" onPress={addNew} />
          </View>
        </View>
        <View style={{ flex: 0.5 }}>
          <View
            style={{
              height: 40,
              backgroundColor: 'red',
              marginBottom: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 25,
              border: 1,
              borderRadius: 20,
              overflow: 'hidden',
            }}>
            <Button title="Cancel" onPress={cancel} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default HotTradePopup;
