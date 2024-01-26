import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

import StockNews from '../newsScreens/StockNews';
import CryptoNews from '../newsScreens/CryptoNews';
import Header from '../components/Header';

import { styles } from '../utils/styling';

const NewsScreen = () => {
  const [stockTab, setStockTab] = useState(false);
  const [cryptoTab, setCryptoTab] = useState(true);

  if (cryptoTab === true) {
    cryptoTabStyle = styles.topTabOnView;
    cryptoText = styles.topTabOnText;
  }

  if (cryptoTab === false) {
    cryptoTabStyle = styles.topTabOffView;
    cryptoText = styles.topTabOffText;
  }

  if (stockTab === true) {
    stockTabStyle = styles.topTabOnView;
    stockText = styles.topTabOnText;
  }

  if (stockTab === false) {
    stockTabStyle = styles.topTabOffView;
    stockText = styles.topTabOffText;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'HOT OFF \n THE PRESS...'} />

      <View style={styles.textBlockView}>
        <Text style={styles.textBlockText}>
          {'     '}
          All the latest stock and crypto news in one easy to navigate place.
        </Text>
      </View>

      <View style={styles.topTabGroupView}>
        <View style={cryptoTabStyle}>
          <TouchableOpacity
            style={styles.topTabTouch}
            onPress={() => {
              setCryptoTab(true);
              setStockTab(false);
            }}>
            <Text style={cryptoText}>Crypto</Text>
          </TouchableOpacity>
        </View>

        <View style={stockTabStyle}>
          <TouchableOpacity
            style={styles.topTabTouch}
            onPress={() => {
              setCryptoTab(false);
              setStockTab(true);
            }}>
            <Text style={stockText}>Stocks</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.dataContainerView}>
        <>{stockTab === true ? <StockNews /> : <CryptoNews />}</>
      </View>
    </SafeAreaView>
  );
};

export default NewsScreen;
