import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import Header from '../components/Header';
import AppLogo from '../components/AppLogo';

import Favorites from '../signalScreens/Favorites';
import CryptoSignals from '../signalScreens/CryptoSignals';
import StockSignals from '../signalScreens/StockSignals';

import { styles } from '../utils/styling';

class SignalScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      favoritesTab: false,
      cryptoTab: true,
      stockTab: false,
    };
  }

  render() {
    if (this.state.favoritesTab === true) {
      favoritesTabStyle = styles.threeTabOnView;
      favoritesText = styles.topTabOnText;
    }

    if (this.state.favoritesTab === false) {
      favoritesTabStyle = styles.threeTabOffView;
      favoritesText = styles.topTabOffText;
    }
    if (this.state.cryptoTab === true) {
      cryptoTabStyle = styles.threeTabOnView;
      cryptoText = styles.topTabOnText;
    }

    if (this.state.cryptoTab === false) {
      cryptoTabStyle = styles.threeTabOffView;
      cryptoText = styles.topTabOffText;
    }

    if (this.state.stockTab === true) {
      stockTabStyle = styles.threeTabOnView;
      stockText = styles.topTabOnText;
    }

    if (this.state.stockTab === false) {
      stockTabStyle = styles.threeTabOffView;
      stockText = styles.topTabOffText;
    }

    return (
      <SafeAreaView style={styles.container}>
        <Header title={<AppLogo size={17} />} />

        <View style={styles.textBlockView}>
          <Text style={styles.textBlockText}>
            {'     '}
            The Stock, Trend, And Crypto Trading Signals. All your signals in
            one place. Let this guide your trade. Happy Trading!
          </Text>
        </View>

        <View style={styles.topTabGroupView}>
          <View style={favoritesTabStyle}>
            <TouchableOpacity
              style={styles.topTabTouch}
              onPress={() => {
                this.setState({ favoritesTab: true });
                this.setState({ cryptoTab: false });
                this.setState({ stockTab: false });
              }}>
              <Text style={favoritesText}>FAVES</Text>
            </TouchableOpacity>
          </View>

          <View style={cryptoTabStyle}>
            <TouchableOpacity
              style={styles.topTabTouch}
              onPress={() => {
                this.setState({ favoritesTab: false });
                this.setState({ cryptoTab: true });
                this.setState({ stockTab: false });
              }}>
              <Text style={cryptoText}>CRYPTO</Text>
            </TouchableOpacity>
          </View>

          <View style={stockTabStyle}>
            <TouchableOpacity
              style={styles.topTabTouch}
              onPress={() => {
                this.setState({ favoritesTab: false });
                this.setState({ cryptoTab: false });
                this.setState({ stockTab: true });
              }}>
              <Text style={stockText}>STOCKS</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.dataContainerView}>
          <>
            {this.state.favoritesTab === true ? (
              <Favorites />
            ) : this.state.cryptoTab === true ? (
              <CryptoSignals />
            ) : (
              <StockSignals />
            )}
          </>
        </View>
      </SafeAreaView>
    );
  }
}

export default SignalScreen;
