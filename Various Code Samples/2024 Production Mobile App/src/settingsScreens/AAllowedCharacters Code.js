import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropDownPicker from 'react-native-dropdown-picker';
//import styles from './YourStyles'; // Import your styles

const YourComponent = () => {
  const [seePassword, setSeePassword] = useState(false);
  const [edit, setEdit] = useState(true);
  const [userData, setUserData] = useState({
    // Initialize your userData state
  });

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

  const viewPassword = () => {
    setSeePassword(!seePassword);
  };

  // ... (your other functions)

  return (
    <KeyboardAvoidingView
      style={{ marginVertical: 10, height: '65%' }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      {/* Your existing code */}
      {/* ... */}

      <ScrollView style={{ margin: 10 }}>
        <View style={{ marginHorizontal: 10 }}>
          {/* Your existing code */}
          {/* ... */}

          {/* Example for Username TextInput */}
          <View style={styles.profileDataLineView}>
            <View style={styles.profileDataLabelView}>
              <Text style={styles.profileDataDisplayText}> Username:</Text>
            </View>
            <View style={styles.profileDataEditView}>
              <TextInput
                placeholder="Enter username"
                placeholderTextColor="grey"
                onChangeText={(value) => onChangeText('username', value)}
                defaultValue={userData.username}
                editable={true}
                autoCorrect={false}
                autoCapitalize="none"
              />
            </View>
          </View>

          {/* Example for Password TextInput */}
          <View style={styles.profileDataLineView}>
            <View style={styles.profileDataLabelView}>
              <Text style={styles.profileDataDisplayText}> Password:</Text>
            </View>
            <View
              style={[styles.profileDataEditView, { flexDirection: 'row' }]}>
              <TextInput
                placeholder="Enter Password"
                placeholderTextColor="grey"
                onChangeText={(value) => onChangeText('password', value)}
                defaultValue={userData.password}
                editable={true}
                secureTextEntry={seePassword === true ? false : true}
                autoCorrect={false}
                autoCapitalize="none"
              />
              <View style={{ alignItems: 'flex-end' }}>
                <TouchableOpacity onPress={viewPassword}>
                  <Ionicons
                    name={seePassword === true ? 'ios-eye' : 'ios-eye-off'}
                    size={18}
                    color={'dimgray'}
                    style={{ marginHorizontal: 8 }}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Repeat similar modifications for other TextInputs */}
          {/* ... */}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default YourComponent;
