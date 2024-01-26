import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
import { Picker } from '@react-native-picker/picker';

import Button from '../components/Button';

import { getUserData } from '../dataManager/privateAPIFunctions';
import { createProfile } from '../dataManager/privateAPIFunctions';
import { addAccount } from '../dataManager/privateAPIFunctions';
import { updateAccount } from '../dataManager/privateAPIFunctions';
import { deactivateAccount } from '../dataManager/privateAPIFunctions';

import { styles } from '../utils/styling';
import { countryData } from '../utils/dataFiles/CountryData';
import { territoryData } from '../utils/dataFiles/TerritoryData';
import { cryptoExchangeData } from '../utils/dataFiles/CryptoExchangeData';
import { stockExchangeData } from '../utils/dataFiles/StockExchangeData';

const MyAccount = () => {
  const [userData, setUserData] = useState();
  const [edit, setEdit] = useState(false);
  const [seePassword, setSeePassword] = useState(false);
  const [save, setSave] = useState(false);
  const [changeSubscription, setChangeSubscription] = useState(false);
  const [selectedValue, setSelectedValue] = useState();

  const [countryOpen, setCountryOpen] = useState(false);
  const [countryValue, setCountryValue] = useState(null);
  const [country, setCountry] = useState(countryData);

  const [territoryOpen, setTerritoryOpen] = useState(false);
  const [territoryValue, setTerritoryValue] = useState(null);
  const [territory, setTerritory] = useState(territoryData);

  const [cryptoExchangeOpen, setCryptoExchangeOpen] = useState(false);
  const [cryptoExchangeValue, setCryptoExchangeValue] = useState(null);
  const [cryptoExchange, setCryptoExchange] = useState(cryptoExchangeData);

  const [stockExchangeOpen, setStockExchangeOpen] = useState(false);
  const [stockExchangeValue, setStockExchangeValue] = useState(null);
  const [stockExchange, setStockExchange] = useState(stockExchangeData);

  const onTerritoryOpen = useCallback(() => {
    setCountryOpen(false);
  }, []);

  const onCountryOpen = useCallback(() => {
    setTerritoryOpen(false);
  }, []);

  const onCryptoExchangeOpen = useCallback(() => {
    setCountryOpen(false);
  }, []);

  const onStockExchangeOpen = useCallback(() => {
    setTerritoryOpen(false);
  }, []);

  const editButton = () => {
    setEdit(!edit);
  };

  const viewPassword = () => {
    setSeePassword(!seePassword);
  };

  const upgradeSubscription = () => {
    alert('About to Upgrade!');
    setChangeSubscription(true);
  };

  const cancelUpgrade = () => {
    alert('Cancelling Upgrade!');
    setChangeSubscription(false);
  };

  const renderLevel = (userData) => {
    if (userData.subscription_level === 7) return <Text>GENIE</Text>;
    if (userData.subscription_level === 6) return <Text>MAGICIAN</Text>;
    if (userData.subscription_level === 5) return <Text>APPRENTICE</Text>;
    if (userData.subscription_level === 4) return <Text>NOVICE</Text>;
    if (userData.subscription_level === 3) return <Text>AD FREE</Text>;
    return <Text>FREE ACCESS</Text>;
  };

  const allowedCharactersRegex = /^[a-zA-Z0-9\-_+.=]*$/; // Regex for allowed characters

  const validateTextInput = (value) => {
    return allowedCharactersRegex.test(value);
  };

  const onChangeText = (field, value) => {
    if (validateTextInput(value)) {
      setUserData({ ...userData, [field]: value });
    } else {
      // Display an error message or handle the error as needed
      alert('Error: Only letters, numbers, -, _, ., +, = are allowed.');
    }
  };

  useEffect(() => {
    async function prepare() {
      try {
        const userStorage = await AsyncStorage.getItem('@testStorage');

        // Display the storage variable in an alert
        //alert(JSON.parse(userStorage.user_id));  //***** FOR TESTING ONLY */

        if (userStorage) {
          // Parse the JSON data
          
          
          setUserData(JSON.parse(userStorage));
          alert(JSON.stringify(userData));
          const user_id = JSON.parse(userData.user_id);
          alert(`user_id = ${user_id}`);
          // Access subscription_level
          //const subscriptionLevel = userData.subscription_level;

          // Display the value in an alert
          
          // Parse and set the user data only if storage is not null/undefined
          //userInfo = getUserData(user_id);
          //alert(JSON.stringify(userInfo));  //***** FOR TESTING ONLY */
          //setUserData(JSON.parse(userInfo));
          //alert('USERDATA:' + JSON.stringify(storage));  //***** FOR TESTING ONLY */
        } else {
          // Handle the case where storage is empty or not available
          // You might want to set default values or handle this case accordingly
          Alert.alert('Storage is empty or not available.');
        }
      } catch (e) {
        // Handle any errors during the data retrieval
        Alert.alert('Error retrieving data from storage:', e);
      }
    }

    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <View style={{ width: '100%', flexDirection: 'column', zIndex: 0 }}>
          <View style={styles.avatarIconView}>
            <Image
              style={styles.avatarIconImage}
              source={require('../images/genieHead.png')}
            />
          </View>
          <View style={styles.alignCenterView}>
            {userData.subscription_level != 0 ? (
              <Text>{userData.username}</Text>
            ) : (
              <Text>Create a Profile</Text>
            )}
          </View>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'flex-end',
            marginLeft: '-25%',
            zIndex: 1,
          }}>
          {userData.subscription_level > 0 ? (
            <View
              style={{
                marginRight: 10,
                height: 25,
                backgroundColor: edit ? 'red' : 'blue',
                alignItems: 'center',
                alignSelf: 'center',
                borderRadius: 20,
              }}>
              <Button
                onPress={editButton}
                title={edit === true ? 'CANCEL' : 'EDIT'}
              />
            </View>
          ) : null}
        </View>
      </View>
      <View style={{ marginLeft: 10 }}>
        {userData.memberSince ? (
          <View style={{ flexDirection: 'row', marginTop: 10 }}>
            <Text>Community Member Since:</Text>
            <Text style={{ marginLeft: 5 }}>{userData.memberSince}</Text>
          </View>
        ) : null}
        <View
          style={{
            flexDirection: 'row',
            marginTop: 5,
            alignItems: 'center',
          }}>
          <Text>Subscription:</Text>
          {changeSubscription === false ? (
            <Text style={{ marginLeft: 5 }}>{renderLevel(userData)}</Text>
          ) : (
            <View style={{ width: '50%', marginLeft: 2 }}>
              <Picker
                itemStyle={{ fontSize: 15 }}
                //activeItemStyle={{ fontSize: 14, fontweight: 'bold' }}
                selectedValue={selectedValue}
                onValueChange={(itemValue) => setSelectedValue(itemValue)}>
                <Picker.Item label="Genie" value="genie" />
                <Picker.Item label="Magician" value="magician" />
                <Picker.Item label="Apprentice" value="apprentice" />
                <Picker.Item label="Novice" value="novice" />
                <Picker.Item label="Ad Free" value="adFree" />
              </Picker>
            </View>
          )}
          {changeSubscription === true ? (
            <TouchableOpacity
              style={{
                borderRadius: 50,
                borderColor: 'red',
                borderWidth: 1,
                alignItems: 'center',
              }}
              onPress={cancelUpgrade}>
              <Text style={{ color: 'red' }}>X</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                marginLeft: 10,
                borderRadius: 20,
                borderColor: 'royalblue',
                borderWidth: 1,
                alignItems: 'center',
              }}
              onPress={upgradeSubscription}>
              <Ionicons
                name={
                  userData.subscription_level === 7
                    ? 'md-arrow-down'
                    : 'md-arrow-up'
                }
                size={18}
                color={'royalblue'}
                style={{ marginHorizontal: 8 }}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <KeyboardAvoidingView
        style={{ marginVertical: 10, height: '65%' }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <Text>------------TESTING ONLY------------</Text>
        <Text>SUBSCRIPTIONLEVEL: {userData.subscription_level}</Text>
        <Text>-----REMOVE FOR PRODUCTION-----</Text>

        <ScrollView style={{ margin: 10 }}>
          <View style={{ marginHorizontal: 10 }}>
            {userData.subscription_level === 0 || edit === true ? (
              <View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Username:
                    </Text>
                  </View>
                  <View style={styles.profileDataEditView}>
                    <TextInput
                      placeholder="Enter username"
                      placeholderTextColor="grey"
                      onChangeText={(value) =>
                        setUserData({ ...userData, username: value })
                      }
                      defaultValue={userData.username}
                      editable={true}
                      autoCorrect="false"
                      autoCapitalize="none"
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Password:
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.profileDataEditView,
                      { flexDirection: 'row' },
                    ]}>
                    <TextInput
                      placeholder="Enter Password"
                      placeholderTextColor="grey"
                      onChangeText={(value) =>
                        setUserData({ ...userData, password: value })
                      }
                      defaultValue={userData.password}
                      editable={true}
                      secureTextEntry={seePassword === true ? false : true}
                      autoCorrect="false"
                      autoCapitalize="none"
                    />
                    <View style={{ alignItems: 'flex-end' }}>
                      <TouchableOpacity onPress={viewPassword}>
                        <Ionicons
                          name={
                            seePassword === true ? 'ios-eye' : 'ios-eye-off'
                          }
                          size={18}
                          color={'dimgray'}
                          style={{ marginHorizontal: 8 }}
                        />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      First Name:
                    </Text>
                  </View>
                  <View style={styles.profileDataEditView}>
                    <TextInput
                      placeholder="Enter First Name"
                      placeholderTextColor="grey"
                      onChangeText={(value) =>
                        setUserData({ ...userData, firstName: value })
                      }
                      defaultValue={userData.firstName}
                      editable={true}
                      autoCorrect="false"
                      autoCapitalize="words"
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Last Name:
                    </Text>
                  </View>
                  <View style={styles.profileDataEditView}>
                    <TextInput
                      placeholder="Enter Last Name"
                      placeholderTextColor="grey"
                      onChangeText={(value) =>
                        setUserData({ ...userData, lastName: value })
                      }
                      defaultValue={userData.lastName}
                      autoCorrect="false"
                      editable={true}
                      autoCapitalize="words"
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}> Email:</Text>
                  </View>
                  <View style={styles.profileDataEditView}>
                    <TextInput
                      placeholder="Enter email address"
                      placeholderTextColor="grey"
                      onChangeText={(value) =>
                        setUserData({ ...userData, email: value })
                      }
                      defaultValue={userData.email}
                      autoCorrect="false"
                      editable={true}
                      autoCapitalize="none"
                    />
                  </View>
                </View>
              </View>
            ) : (
              <View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Username:
                    </Text>
                  </View>
                  <View style={styles.profileDataDisplayView}>
                    <TextInput
                      defaultValue={userData.username}
                      editable={false}
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Password:
                    </Text>
                  </View>
                  <View style={styles.profileDataDisplayView}>
                    <TextInput
                      defaultValue={userData.password}
                      editable={false}
                      secureTextEntry={true}
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      First Name:
                    </Text>
                  </View>
                  <View style={styles.profileDataDisplayView}>
                    <TextInput
                      defaultValue={userData.firstName}
                      editable={false}
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Last Name:
                    </Text>
                  </View>
                  <View style={styles.profileDataDisplayView}>
                    <TextInput
                      defaultValue={userData.lastName}
                      editable={false}
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}> Email:</Text>
                  </View>
                  <View style={styles.profileDataDisplayView}>
                    <TextInput defaultValue={userData.email} editable={false} />
                  </View>
                </View>
              </View>
            )}

            {userData.subscription_level === 1 || edit === true ? (
              <View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Mobile Number:
                    </Text>
                  </View>
                  <View style={styles.profileDataEditView}>
                    <TextInput
                      placeholder="Enter Mobile Number"
                      placeholderTextColor="grey"
                      onChangeText={(value) =>
                        setUserData({ ...userData, mobile: value })
                      }
                      defaultValue={userData.mobile}
                      editable={true}
                      autoCorrect="false"
                      autoCapitalize="none"
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}> Country:</Text>
                  </View>
                  <View style={{ flex: 0.65 }}>
                    <DropDownPicker
                      open={countryOpen}
                      value={countryValue}
                      items={country}
                      setOpen={setCountryOpen}
                      setValue={setCountryValue}
                      setItems={setCountry}
                      placeholder={
                        !userData.country ? 'Select Country' : userData.country
                      }
                      placeholderStyle={styles.placeholderStyles}
                      searchable={true}
                      searchPlaceholder="Search your Country here..."
                      onOpen={onCountryOpen}
                      onChangeValue={(value) => {
                        setUserData({ ...userData, country: value });
                      }}
                      listMode="MODAL"
                      modalContentContainerStyle={{
                        backgroundColor: 'whitesmoke',
                      }}
                      modalProps={{
                        animationType: 'slide',
                        presentationStyle: 'pageSheet',
                      }}
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Territory:
                    </Text>
                  </View>
                  <View style={{ flex: 0.65 }}>
                    <DropDownPicker
                      open={territoryOpen}
                      value={territoryValue}
                      items={territory}
                      setOpen={setTerritoryOpen}
                      setValue={setTerritoryValue}
                      setItems={setTerritory}
                      placeholder={
                        !userData.territory
                          ? 'Select Territory'
                          : userData.territory
                      }
                      placeholderStyle={styles.placeholderStyles}
                      searchable={true}
                      searchPlaceholder="Search your Territory here..."
                      onOpen={onTerritoryOpen}
                      onChangeValue={(value) => {
                        setUserData({ ...userData, territory: value });
                      }}
                      listMode="MODAL"
                      modalContentContainerStyle={{
                        backgroundColor: 'whitesmoke',
                      }}
                      modalProps={{
                        animationType: 'slide',
                        presentationStyle: 'pageSheet',
                      }}
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      Street Address:
                    </Text>
                  </View>
                  <View style={styles.profileDataEditView}>
                    <TextInput
                      placeholder="Enter Street Address"
                      placeholderTextColor="grey"
                      onChangeText={(value) =>
                        setUserData({ ...userData, address: value })
                      }
                      defaultValue={userData.address}
                      editable={true}
                      autoCorrect="false"
                      autoCapitalize="none"
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}> City:</Text>
                  </View>
                  <View style={styles.profileDataEditView}>
                    <TextInput
                      placeholder="Enter City"
                      placeholderTextColor="grey"
                      onChangeText={(value) =>
                        setUserData({ ...userData, city: value })
                      }
                      defaultValue={userData.city}
                      editable={true}
                      autoCorrect="false"
                      autoCapitalize="none"
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Zip Code:
                    </Text>
                  </View>
                  <View style={styles.profileDataEditView}>
                    <TextInput
                      placeholder="Enter Zip Code"
                      placeholderTextColor="grey"
                      onChangeText={(value) =>
                        setUserData({ ...userData, zip: value })
                      }
                      defaultValue={userData.zip}
                      editable={true}
                      autoCorrect="false"
                      autoCapitalize="none"
                    />
                  </View>
                </View>

                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Language:
                    </Text>
                  </View>
                  <View style={styles.profileDataEditView}>
                    <TextInput
                      placeholder="Enter Preferred Language"
                      placeholderTextColor="grey"
                      onChangeText={(value) =>
                        setUserData({ ...userData, language: value })
                      }
                      defaultValue={userData.language}
                      editable={true}
                      autoCorrect="false"
                      autoCapitalize="none"
                    />
                  </View>
                </View>
              </View>
            ) : userData.subscription_level > 1 && edit === false ? (
              <View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Mobile Number:
                    </Text>
                  </View>
                  <View style={styles.profileDataDisplayView}>
                    <TextInput
                      defaultValue={userData.mobile}
                      editable={false}
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}> Country:</Text>
                  </View>
                  <View style={styles.profileDataDisplayView}>
                    <TextInput
                      defaultValue={userData.country}
                      editable={false}
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Territory:
                    </Text>
                  </View>
                  <View style={styles.profileDataDisplayView}>
                    <TextInput
                      defaultValue={userData.territory}
                      editable={false}
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      Street Address:
                    </Text>
                  </View>
                  <View style={styles.profileDataDisplayView}>
                    <TextInput
                      defaultValue={userData.address}
                      editable={false}
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}> City:</Text>
                  </View>
                  <View style={styles.profileDataDisplayView}>
                    <TextInput defaultValue={userData.city} editable={false} />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Zip Code:
                    </Text>
                  </View>
                  <View style={styles.profileDataDisplayView}>
                    <TextInput defaultValue={userData.zip} editable={false} />
                  </View>
                </View>

                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Language:
                    </Text>
                  </View>
                  <View style={styles.profileDataDisplayView}>
                    <TextInput
                      defaultValue={userData.language}
                      editable={false}
                    />
                  </View>
                </View>
              </View>
            ) : null}

            {userData.subscription_level === 7 && edit === true ? (
              <View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      Crypto Exchange:
                    </Text>
                  </View>
                  <View style={{ flex: 0.65 }}>
                    <DropDownPicker
                      open={cryptoExchangeOpen}
                      value={cryptoExchangeValue}
                      items={cryptoExchange}
                      setOpen={setCryptoExchangeOpen}
                      setValue={setCryptoExchangeValue}
                      setItems={setCryptoExchange}
                      placeholder={
                        !userData.cryptoExchange
                          ? 'Select Crypto Exchange'
                          : userData.cryptoExchange
                      }
                      placeholderStyle={styles.placeholderStyles}
                      searchable={true}
                      searchPlaceholder="Search your Crypto Exchange here..."
                      onOpen={onCryptoExchangeOpen}
                      onChangeValue={(value) => {
                        setUserData({ ...userData, cryptoExchange: value });
                      }}
                      listMode="MODAL"
                      modalContentContainerStyle={{
                        backgroundColor: 'whitesmoke',
                      }}
                      modalProps={{
                        animationType: 'slide',
                        presentationStyle: 'pageSheet',
                      }}
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      Crypto Key:
                    </Text>
                  </View>
                  <View style={styles.profileDataEditView}>
                    <TextInput
                      placeholder="Enter Crypto Exchange Key"
                      placeholderTextColor="grey"
                      onChangeText={(value) =>
                        setUserData({ ...userData, cryptoKey: value })
                      }
                      defaultValue={userData.cryptoKey}
                      editable={true}
                      secureTextEntry={true}
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      Crypto Secret Key:
                    </Text>
                  </View>
                  <View style={styles.profileDataEditView}>
                    <TextInput
                      placeholder="Enter Crypto Exchange Secret Key"
                      placeholderTextColor="grey"
                      onChangeText={(value) =>
                        setUserData({ ...userData, cryptoSecretKey: value })
                      }
                      defaultValue={userData.cryptoSecretKey}
                      editable={true}
                      secureTextEntry={true}
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Stock Exchange:
                    </Text>
                  </View>
                  <View style={{ flex: 0.65 }}>
                    <DropDownPicker
                      open={stockExchangeOpen}
                      value={stockExchangeValue}
                      items={stockExchange}
                      setOpen={setStockExchangeOpen}
                      setValue={setStockExchangeValue}
                      setItems={setStockExchange}
                      placeholder={
                        !userData.stockExchange
                          ? 'Select Stock Exchange'
                          : userData.stockExchange
                      }
                      placeholderStyle={styles.placeholderStyles}
                      searchable={true}
                      searchPlaceholder="Search your Stock Exchange here..."
                      onOpen={onStockExchangeOpen}
                      onChangeValue={(value) => {
                        setUserData({ ...userData, stockExchange: value });
                      }}
                      listMode="MODAL"
                      modalContentContainerStyle={{
                        backgroundColor: 'whitesmoke',
                      }}
                      modalProps={{
                        animationType: 'slide',
                        presentationStyle: 'pageSheet',
                      }}
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Stock Key:
                    </Text>
                  </View>
                  <View style={styles.profileDataEditView}>
                    <TextInput
                      placeholder="Enter Stock Exchange Key"
                      placeholderTextColor="grey"
                      onChangeText={(value) =>
                        setUserData({ ...userData, stockKey: value })
                      }
                      defaultValue={userData.stockKey}
                      editable={true}
                      secureTextEntry={true}
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Stock Secret Key:
                    </Text>
                  </View>
                  <View style={styles.profileDataEditView}>
                    <TextInput
                      placeholder="Enter Stock Exchange Secret Key"
                      placeholderTextColor="grey"
                      onChangeText={(value) =>
                        setUserData({ ...userData, stockSecretKey: value })
                      }
                      defaultValue={userData.stockSecretKey}
                      editable={true}
                      secureTextEntry={true}
                    />
                  </View>
                </View>
              </View>
            ) : userData.subscription_level === 7 && edit === false ? (
              <View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Crypto Exchange:
                    </Text>
                  </View>
                  <View style={styles.profileDataDisplayView}>
                    <TextInput
                      defaultValue={userData.cryptoExchange}
                      editable={false}
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Crypto Exchange Key:
                    </Text>
                  </View>
                  <View style={styles.profileDataDisplayView}>
                    <TextInput
                      defaultValue={userData.cryptoExchangeKey}
                      editable={false}
                      secureTextEntry={true}
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Crypto Exchange Secret Key:
                    </Text>
                  </View>
                  <View style={styles.profileDataDisplayView}>
                    <TextInput
                      defaultValue={userData.cryptoExchangeSecretKey}
                      editable={false}
                      secureTextEntry={true}
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Stock Exchange:
                    </Text>
                  </View>
                  <View style={styles.profileDataDisplayView}>
                    <TextInput
                      defaultValue={userData.stockExchange}
                      editable={false}
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Stock Exchange Key:
                    </Text>
                  </View>
                  <View style={styles.profileDataDisplayView}>
                    <TextInput
                      defaultValue={userData.stockExchangeKey}
                      editable={false}
                      secureTextEntry={true}
                    />
                  </View>
                </View>
                <View style={styles.profileDataLineView}>
                  <View style={styles.profileDataLabelView}>
                    <Text style={styles.profileDataDisplayText}>
                      {' '}
                      Stock Exchange Secret Key:
                    </Text>
                  </View>
                  <View style={styles.profileDataDisplayView}>
                    <TextInput
                      defaultValue={userData.stockExchangeSecretKey}
                      editable={false}
                      secureTextEntry={true}
                    />
                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      {userData.subscription_level === 0 && edit === false ? (
        <View
          style={{
            //marginTop: 5,
            width: '40%',
            height: '5%',
            backgroundColor: 'blue',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 20,
          }}>
          <Button
            onPress={() => {
              createProfile();
            }}
            title="SAVE PROFILE"
          />
        </View>
      ) : null}
      {userData.subscription_level === 1 && edit === false ? (
        <View
          style={{
            //marginTop: 5,
            width: '40%',
            height: '5%',
            backgroundColor: 'blue',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 20,
          }}>
          <Button
            onPress={() => {
              addAccount();
            }}
            title="SAVE ACCOUNT"
          />
        </View>
      ) : null}
      {edit === true || changeSubscription === true ? (
        <View style={(flexDirection = 'row')}>
          <View
            style={{
              marginTop: 5,
              marginRight: 5,
              width: '40%',
              height: '5%',
              backgroundColor: 'blue',
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: 20,
            }}>
            <Button onPress={updateAccount} title="SAVE CHANGES" />
          </View>
          <View
            style={{
              marginTop: 5,
              marginLeft: 5,
              width: '40%',
              height: '5%',
              backgroundColor: 'red',
              alignItems: 'center',
              alignSelf: 'center',
              borderRadius: 20,
            }}>
            <Button onPress={deactivateAccount} title="DELETE ACCOUNT" />
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default MyAccount;
