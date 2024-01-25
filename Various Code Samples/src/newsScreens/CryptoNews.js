import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ScrollView,
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { theme } from '../utils/themes';
import { styles } from '../utils/styling';
import { cryptoNewsData } from '../testFiles/cryptoNewsAPI';

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

class CryptoNews extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: 0,
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={cryptoNewsData.data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.newsTab}
              onPress={() =>
                this.props.navigation.navigate('Article', { index: index })
              }>
              <View style={styles.newsLink}>
                <Text style={styles.newsTabText}>{item.title}</Text>
                <Text>Sentiment: {item.sentiment}</Text>
              </View>
              <View style={styles.right}>
                <Image
                  style={styles.rightArrow}
                  source={require('../images/arrow.png')}
                />
              </View>
            </TouchableOpacity>
          )}
        />
      </SafeAreaView>
    );
  }
}

class Article extends React.Component {
  render() {
    const { navigation } = this.props;
    const index = navigation.getParam('index', 'NO-INDEX');
    return (
      <ScrollView style={styles.articleView}>
        <Text style={styles.textBlockView}>
          {cryptoNewsData.data[index].sentiment}
        </Text>
        <Text style={styles.articleText}>
          {'     '}
          {cryptoNewsData.data[index].text}
        </Text>
      </ScrollView>
    );
  }
}

const AppNavigator = createStackNavigator(
  {
    News: CryptoNews,
    Article: Article,
  },
  {
    initialRouteName: 'News',
  }
);

const AppContainer = createAppContainer(AppNavigator);
export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

CryptoNews.navigationOptions = () => {
  return {
    headerTitle: 'The Latest Crypto News',
    headerStyle: {
      backgroundColor: theme.backGround,
    },
    headerTitleStyle: {
      alignSelf: 'center',
    },
  };
};

Article.navigationOptions = () => {
  return {
    headerTitle: 'Article',
    headerStyle: {
      backgroundColor: theme.backGround,
    },
  };
};
