// localStorageFunctions.js
import { AsyncStorage, Alert } from 'react-native';

const createLocalStorage = async () => {
  try {
    // create default values
    const defaultData = {
      user_id: '',
      subscription_level: 0,
      language: 'english',
      theme: 'default',
    };

    // Save default data to @testStorage
    await AsyncStorage.setItem('@testStorage', JSON.stringify(defaultData));
  } catch (error) {
    Alert.alert('Error creating local storage', error.message);
  }
};

const updateLocalStorage = async (updatedData) => {
  try {
    // Get current data from local storage
    const storedData = await AsyncStorage.getItem('@testStorage');
    let currentData = JSON.parse(storedData) || {}; // Parse existing data or start with an empty object if null

    // Update the current data with the provided changes
    currentData = { ...currentData, ...updatedData };

    // Save the updated data back to @testStorage
    await AsyncStorage.setItem('@testStorage', JSON.stringify(currentData));
  } catch (error) {
    Alert.alert('Error updating local storage', error.message);
  }
};

const deleteLocalStorage = async () => {
  try {
    // Remove the @testStorage item from local storage
    await AsyncStorage.removeItem('@testStorage');
  } catch (error) {
    Alert.alert('Error deleting local storage', error.message);
  }
};

export { createLocalStorage, updateLocalStorage, deleteLocalStorage };
