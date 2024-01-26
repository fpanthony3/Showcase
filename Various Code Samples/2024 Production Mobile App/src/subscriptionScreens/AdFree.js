import React, { useContext } from 'react';
import { SafeAreaView, View, Text, ScrollView, FlatList } from 'react-native';

import { styles } from '../utils/styling';
import { subscriptions } from '../contents/Subscriptions';

export default function AdFree() {
  const sub = subscriptions.adFree;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>
          Cost:{'   '}
          {sub.cost}
          {'   '}
          {sub.frequency}
        </Text>
      </View>
      <View style={{ marginLeft: 20, marginVertical: 3 }}>
        <Text>What you get:</Text>
      </View>

      <View style={{ flexDirection: 'row', marginVertical: 2 }}>
        <View style={{ flex: 0.6, marginLeft: 40 }}>
          <Text>Ad Free:</Text>
        </View>
        <View style={{ flex: 0.4, marginLeft: 10 }}>
          <Text>{sub.details.adFree}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginVertical: 2 }}>
        <View style={{ flex: 0.6, marginLeft: 40 }}>
          <Text>Crypto Signals:</Text>
        </View>
        <View style={{ flex: 0.4, marginLeft: 10 }}>
          <Text>{sub.details.cryptoSignals}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginVertical: 2 }}>
        <View style={{ flex: 0.6, marginLeft: 40 }}>
          <Text>Stock Signals:</Text>
        </View>
        <View style={{ flex: 0.4, marginLeft: 10 }}>
          <Text>{sub.details.stockSignals}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginVertical: 2 }}>
        <View style={{ flex: 0.6, marginLeft: 40 }}>
          <Text>In App Alerts:</Text>
        </View>
        <View style={{ flex: 0.4, marginLeft: 10 }}>
          <Text>{sub.details.inAppAlerts}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginVertical: 2 }}>
        <View style={{ flex: 0.6, marginLeft: 40 }}>
          <Text>Favorites:</Text>
        </View>
        <View style={{ flex: 0.4, marginLeft: 10 }}>
          <Text>{sub.details.favorites}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginVertical: 2 }}>
        <View style={{ flex: 0.6, marginLeft: 40 }}>
          <Text>Paper Trade:</Text>
        </View>
        <View style={{ flex: 0.4, marginLeft: 10 }}>
          <Text>{sub.details.paperTrade}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginVertical: 2 }}>
        <View style={{ flex: 0.6, marginLeft: 40 }}>
          <Text>Push Notifications:</Text>
        </View>
        <View style={{ flex: 0.4, marginLeft: 10 }}>
          <Text>{sub.details.pushNotifications}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginVertical: 2 }}>
        <View style={{ flex: 0.6, marginLeft: 40 }}>
          <Text>Email Alerts:</Text>
        </View>
        <View style={{ flex: 0.4, marginLeft: 10 }}>
          <Text>{sub.details.emailAlerts}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginVertical: 2 }}>
        <View style={{ flex: 0.6, marginLeft: 40 }}>
          <Text>SMS Alerts:</Text>
        </View>
        <View style={{ flex: 0.4, marginLeft: 10 }}>
          <Text>{sub.details.smsAlerts}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', marginVertical: 2 }}>
        <View style={{ flex: 0.6, marginLeft: 40 }}>
          <Text>Live Trade:</Text>
        </View>
        <View style={{ flex: 0.4, marginLeft: 10 }}>
          <Text>{sub.details.liveTrade}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

