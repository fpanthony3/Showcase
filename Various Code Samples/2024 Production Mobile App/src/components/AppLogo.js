import Rect from 'react';
import { View, Text } from 'react-native';

export default function AppLogo(props) {
  const { size } = props;
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontFamily: 'ChalkboardSE-Regular',
            fontSize: size,
            fontWeight: 'bold',
            color: 'darkblue',
          }}>
          S
        </Text>

        <Text
          style={{
            fontFamily: 'ChalkboardSE-Regular',
            fontSize: size,
            color: 'dimgrey',
          }}>
          TOCK
        </Text>

        <Text
          style={{
            fontFamily: 'ChalkboardSE-Regular',
            fontSize: size,
            fontWeight: 'bold',
            color: 'darkblue',
          }}>
          {' '}
          T
        </Text>

        <Text
          style={{
            fontFamily: 'ChalkboardSE-Regular',
            fontSize: size,
            color: 'dimgrey',
          }}>
          REND
        </Text>

        <Text
          style={{
            fontFamily: 'ChalkboardSE-Regular',
            fontSize: size,
            fontWeight: 'bold',
            color: 'darkblue',
          }}>
          {' '}
          A
        </Text>

        <Text
          style={{
            fontFamily: 'ChalkboardSE-Regular',
            fontSize: size,
            color: 'dimgrey',
          }}>
          ND
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
        }}>
        <Text
          style={{
            fontFamily: 'ChalkboardSE-Regular',
            fontSize: size,
            fontWeight: 'bold',
            color: 'darkblue',
          }}>
          C
        </Text>

        <Text
          style={{
            fontFamily: 'ChalkboardSE-Regular',
            fontSize: size,
            color: 'dimgrey',
          }}>
          RYPTO
        </Text>

        <Text
          style={{
            fontFamily: 'ChalkboardSE-Regular',
            fontSize: size,
            fontWeight: 'bold',
            color: 'darkblue',
          }}>
          {' '}
          T
        </Text>

        <Text
          style={{
            fontFamily: 'ChalkboardSE-Regular',
            fontSize: size,
            color: 'dimgrey',
          }}>
          RADE
        </Text>

        <Text
          style={{
            fontFamily: 'ChalkboardSE-Regular',
            fontSize: size,
            fontWeight: 'bold',
            color: 'darkblue',
          }}>
          {' '}
          GENIE
        </Text>
      </View>
    </View>
  );
}
