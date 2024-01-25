import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity } from 'react-native';

import Header from '../components/Header';
import PaperTrade from '../tradeScreens/PaperTrade';
import LiveTrade from '../tradeScreens/LiveTrade';

import { styles } from '../utils/styling';

const TradeScreen = () => {
  const [paperTab, setPaperTab] = useState(true);
  const [liveTab, setLiveTab] = useState(false);

  if (paperTab === true) {
    cryptoTabStyle = styles.topTabOnView;
    cryptoText = styles.topTabOnText;
  }

  if (paperTab === false) {
    cryptoTabStyle = styles.topTabOffView;
    cryptoText = styles.topTabOffText;
  }

  if (liveTab === true) {
    stockTabStyle = styles.topTabOnView;
    stockText = styles.topTabOnText;
  }

  if (liveTab === false) {
    stockTabStyle = styles.topTabOffView;
    stockText = styles.topTabOffText;
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'YOUR TRADING RECORDS...'} />

      <View style={styles.textBlockView}>
        <Text style={[styles.textBlockText, { textAlign: 'center' }]}>
          ALL YOUR TRADING RECORDS IN ONE PLACE.
        </Text>

        <Text style={styles.textBlockText}>
          {paperTab === true
            ? 'Hone your trading skills with Paper Trading. Once you perfect your approach, start LIVE trading. Good Luck!'
            : 'The last 50 Live Trades records show here. Login online at stactgenie.com/online to see more records.'}
        </Text>
      </View>

      <View style={styles.topTabGroupView}>
        <View style={cryptoTabStyle}>
          <TouchableOpacity
            style={styles.topTabTouch}
            onPress={() => {
              setPaperTab(true);
              setLiveTab(false);
            }}>
            <Text style={cryptoText}>Paper</Text>
          </TouchableOpacity>
        </View>

        <View style={stockTabStyle}>
          <TouchableOpacity
            style={styles.topTabTouch}
            onPress={() => {
              setPaperTab(false);
              setLiveTab(true);
            }}>
            <Text style={stockText}>Live</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.dataContainerView}>
        <>{paperTab === true ? <PaperTrade /> : <LiveTrade />}</>
      </View>
    </SafeAreaView>
  );
};

export default TradeScreen;
