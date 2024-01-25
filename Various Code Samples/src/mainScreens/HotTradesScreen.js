import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Alert,
  StyleSheet,
} from 'react-native';

import Header from '../components/Header';
import Button from '../components/Button';

import {
  HeatIndex,
  MemberDisplay,
  Shield,
} from '../components/HotTradeComponents';
import HotTradePopup from '../components/HotTradePopUp';

import { styles } from '../utils/styling';
import { hotTradeData } from '../testFiles/hotTradeData';

const HotTradesScreen = () => {
  const [showPopup, setShowPopup] = useState(false);

  function addTrade() {
    Alert.alert(
      'Hot Diggity Trade!',
      ' Congratulations... Spread the word.',
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
  }

  const openPopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title={'TRADING GAINS \n SHOW DOWN'} />

      <View style={styles.textBlockView}>
        <Text style={styles.textBlockText}>
          {' '}
          Show off your best trades here. Let the STACT community know how good
          your doing and earn some well deserved pats on the back. Accolades for
          everyone!
        </Text>
      </View>

      <ScrollView style={styles.hotTradesScroll}>
        <FlatList
          data={hotTradeData.hotTrade}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item, index }) => (
            <View style={styled.hotTradesContainer}>
              <View style={[styled.leftBox, { zIndex: 1 }]}>
                {index % 2 === 0 ? (
                  <HeatIndex index={index} heat={item.heat} />
                ) : (
                  <Shield p_n_l={item.p_n_l} />
                )}
              </View>
              <View
                style={[
                  styled.outerMemberDisplay,
                  { zIndex: 0, marginLeft: '-22%' },
                ]}>
                <View style={[styled.midMemberDisplay, { zIndex: 0 }]}>
                  <View style={[styled.innerMemberDisplay, { zIndex: 0 }]}>
                    <MemberDisplay
                      username={item.member}
                      ticker={item.ticker}
                    />
                  </View>
                </View>
              </View>
              <View
                style={[styled.rightBox, { zIndex: 1, marginLeft: '-22%' }]}>
                {index % 2 === 0 ? (
                  <Shield p_n_l={item.p_n_l} />
                ) : (
                  <HeatIndex index={index} heat={item.heat} />
                )}
              </View>
            </View>
          )}
        />
      </ScrollView>

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
            borderColor: 'darkgray',
            borderWidth: 2,
            alignItems: 'center',
            alignContent: 'center',
            zIndex: 0,
          }}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <HotTradePopup onPress={openPopup} />
        </KeyboardAvoidingView>
      )}
    </SafeAreaView>
  );
};

const styled = StyleSheet.create({
  hotTradesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    margin: 10,
    height: 110,
    width: '95%',
  },
  outerMemberDisplay: {
    height: '70%',
    width: '90%',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'darkblue',
  },
  midMemberDisplay: {
    height: '100%',
    width: '100%',
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'royalblue',
  },
  innerMemberDisplay: {
    height: '100%',
    width: '100%',
    alignContent: 'center',

    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'darkblue',
  },
  leftBox: {
    height: '100%',
    width: '25%',
  },
  rightBox: {
    height: '100%',
    width: '25%',
    alignSelf: 'flex-end',
  },
});

export default HotTradesScreen;
