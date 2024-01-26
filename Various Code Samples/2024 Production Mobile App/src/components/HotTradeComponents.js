import React, { useState } from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';

export function HeatIndex(props) {
  const { index, heat } = props;
  const [heatCount, setHeatCount] = useState(heat);

  const [left, setLeft] = useState(false);
  const [x, setX] = useState('0deg');

  const images = [
    require('../images/flame.png'),
    require('../images/flame.png'),
    require('../images/flame.png'),
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(1);
  const [animation, setAnimation] = useState(new Animated.Value(0));

  const throwHeat = () => {
    if (left === false) {
      setX('-10deg');
      setLeft(!left);
    } else {
      setX('10deg');
      setLeft(!left);
    }

    setCurrentIndex(nextIndex);
    setNextIndex(nextIndex + 1 >= images.length ? 0 : nextIndex + 1);

    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      setAnimation(new Animated.Value(0));
    });
  };

  const opacity = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const translateY = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -150],
  });

  const rotate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [x, '0deg'],
  });

  addOne = () => {
    setHeatCount(heatCount + 1);
    throwHeat();
  };

  return (
    <View style={styles.heatBox}>
      <View style={styles.heatContainer}>
        <View
          style={[
            styles.heatIndex,
            index % 2 === 0 ? { alignSelf: 'flex-end' } : null,
          ]}>
          <Text style={{ color: 'white', textAlign: 'center' }}>
            {heatCount}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.flame, { zIndex: 3 }]}
          onPress={addOne}>
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View
              style={{
                width: 60,
                height: 60,
                borderWidth: 4,
                borderColor: 'firebrick',
                borderRadius: 40,
              }}>
              <Animated.View
                style={{
                  position: 'absolute',
                  opacity,
                  transform: [{ translateY }, { rotate }],
                }}>
                <Image
                  source={images[nextIndex]}
                  style={{ width: 55, height: 55 }}
                />
              </Animated.View>
              <TouchableOpacity onPress={addOne}>
                <Image
                  source={images[currentIndex]}
                  style={{ width: 55, height: 55 }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export function MemberDisplay(props) {
  const { username, ticker } = props;
  return (
    <View>
      <View
        style={{
          width: '60%',
          borderColor: 'darkblue',
          borderBottomWidth: 3,
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            color: 'darkblue',
            fontFamily: 'ChalkboardSE-Regular',
            fontSize: 20,
            textAlign: 'center',
          }}>
          {username}
        </Text>
      </View>

      <View>
        <Text
          style={{
            color: 'darkblue',
            fontFamily: 'ChalkboardSE-Regular',
            fontSize: 20,
            textAlign: 'center',
          }}>
          {ticker}
        </Text>
      </View>
    </View>
  );
}

export function Shield(props) {
  const { p_n_l } = props;
  return (
    <View
      style={{
        marginTop: '5%',
        height: '90%',
        width: '100%',
        borderWidth: 3,
        borderColor: 'firebrick',
        borderRadius: 20,
      }}>
      <View
        style={{
          height: '100%',
          width: '100%',
          borderWidth: 3,
          borderColor: 'orange',
          borderRadius: 20,
          overflow: 'hidden',
        }}>
        <ImageBackground
          source={require('../images/fire.png')}
          resizeMode="cover"
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 20,
            borderWidth: 3,
            borderColor: 'firebrick',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
          }}>
          <Text
            style={{
              color: 'white',
              fontWeight: 'bold',
              fontFamily: 'ChalkboardSE-Regular',
              fontSize: 28,
            }}>
            {p_n_l}
            <Text style={{ fontSize: 12 }}>%</Text>
          </Text>
        </ImageBackground>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heatBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heatContainer: {
    flexDirection: 'column',
  },
  heatIndex: {
    marginTop: '40%',
    borderRadius: 15,
    borderColor: 'firebrick',
    borderWidth: 4,
    backgroundColor: 'red',
    width: 50,
  },
  flame: {
    marginTop: '-100%',
    marginRight: '-5%',
  },
});
