// privateAPIFunctions.js
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bcrypt from 'react-native-bcrypt';
//import { updateLocalStorage, deleteLocalStorage } from './localStorageFunctions';

const url = 'http://104.197.226.213:3000/';

const isUsernameUnique = async (username) => {
  // Check if the provided username is unique on the server
  const response = await fetch(`${url}/check-username`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username }),
  });

  if (!response.ok) {
    // Handle server error
    throw new Error('Error checking username uniqueness on the server');
  }

  const responseData = await response.json();
  return responseData.isUnique;
};

const getUserData = async () => {
  try {
    // Get user_id from local storage
    const storedData = await AsyncStorage.getItem('@testStorage');
    const { user_id } = JSON.parse(storedData);

    // Send request to server-side function
    const response = await fetch(`${url}/get-user-data/${user_id}`);

    if (!response.ok) {
      console.error('Error fetching user data from the server');
      return null;
    }

    // Parse the server response
    const userData = await response.json();

    // Return user data for further use in the app
    return userData;
  } catch (error) {
    console.error('Error getting user data:', error);
    return null;
  }
};

const createProfile = async (accountData) => {
  try {
    // Check if the username is unique
    const isUnique = await isUsernameUnique(accountData.username);

    if (!isUnique) {
      Alert.alert('Username is already in use, please try another one');
      return null;
    }

    // Hash the password before sending it to the server
    const hashedPassword = await bcrypt.hash(accountData.password, 5);

    // Create userData JSON
    const userData = {
      subscription_level: 1,
      username: accountData.username,
      first_name: accountData.first_name,
      last_name: accountData.last_name,
      email: accountData.email,
      member_since: new Date().toISOString(),
      password: hashedPassword,
      // Other default values
      mobile_no: null,
      address_line_1: null,
      address_line_2: null,
      locality: null,
      state: null,
      postal_code: null,
      country: null,
      language: 'english',
      theme: 'default',
      email_notifications: false,
      sms_notifications: false,
      buy_notifications: false,
      sell_notifications: false,
      dump_notifications: false,
      default_exchange: null,
      email_verified: false,
      phone_verified: false,
      two_fa: false,
      question_1: null,
      answer_1: null,
      question_2: null,
      answer_2: null,
      question_3: null,
      answer_3: null,
      exchange_key: null,
      exchange_secret_key: null,
    };

    // Send userData to the server
    const response = await fetch(`${url}/create-profile`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userData }),
    });

    if (!response.ok) {
      Alert.alert('Error creating profile, Please try again');
      return null;
    }

    // Parse the server response
    const responseData = await response.json();

    // Save user_id and other relevant data to local storage
    await AsyncStorage.setItem(
      '@testStorage',
      JSON.stringify({
        user_id: responseData.user_id,
        subscription_level: 1,
        language: 'english',
        theme: 'default',
      })
    );

    // Return user_id for further use in the app
    return responseData.user_id;
  } catch (error) {
    Alert.alert('Error creating profile:', error);
    return null;
  }
};

const addAccount = async (updateData) => {
  try {
    // Get user_id from local storage
    const storedData = await AsyncStorage.getItem('@testStorage');
    const { user_id } = JSON.parse(storedData);

    // Hash the password if provided and not changed
    const existingPassword = updateData.password
      ? await AsyncStorage.getItem('@createdPassword')
      : null;
    const hashedPassword =
      existingPassword === updateData.password
        ? existingPassword
        : await bcrypt.hash(updateData.password, 10);

    // Create userData JSON for update
    const userData = {
      user_id,
      subscription_level: 2,
      username: updateData.username,
      first_name: updateData.first_name,
      last_name: updateData.last_name,
      email: updateData.email,
      member_since: new Date().toISOString(),
      password: hashedPassword,
      // Other default values
      mobile_no: updateData.mobile_no,
      address_line_1: updateData.address_line_1,
      address_line_2: updateData.address_line_2,
      locality: updateData.locality,
      state: updateData.state,
      postal_code: updateData.postal_code,
      country: updateData.country,
      language: 'english',
      theme: 'default',
      email_notifications: false,
      sms_notifications: false,
      buy_notifications: false,
      sell_notifications: false,
      dump_notifications: false,
      default_exchange: null,
      email_verified: false,
      phone_verified: false,
      two_fa: false,
      question_1: null,
      answer_1: null,
      question_2: null,
      answer_2: null,
      question_3: null,
      answer_3: null,
      exchange_key: null,
      exchange_secret_key: null,
    };

    // Send userData to the server for update
    const response = await fetch(`${url}/add-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userData }),
    });

    if (!response.ok) {
      Alert.alert('Error saving account on the server');
      return null;
    }

    // Parse the server response
    const responseData = await response.json();

    // Update local storage with new subscription_level
    await AsyncStorage.setItem(
      '@testStorage',
      JSON.stringify({
        user_id: responseData.user_id,
        subscription_level: 2,
        language: 'english',
        theme: 'default',
      })
    );

    // Return user_id for further use in the app
    return responseData.user_id;
  } catch (error) {
    Alert.alert('Error updating account information:', error);
    return null;
  }
};

const updateAccount = async (updateData) => {
  try {
    // Get user_id from local storage
    const storedData = await AsyncStorage.getItem('@testStorage');
    const { user_id } = JSON.parse(storedData);

    // Hash the password if provided and not changed
    const existingPassword = updateData.password
      ? await AsyncStorage.getItem('@createdPassword')
      : null;
    const hashedPassword =
      existingPassword === updateData.password
        ? existingPassword
        : await bcrypt.hash(updateData.password, 10);

    // Hash exchange_key and exchange_secret_key if not null
    const hashedExchangeKey = updateData.exchange_key
      ? await bcrypt.hash(updateData.exchange_key, 20)
      : null;
    const hashedExchangeSecretKey = updateData.exchange_secret_key
      ? await bcrypt.hash(updateData.exchange_secret_key, 20)
      : null;

    // Create userData JSON for update
    const userData = {
      user_id,
      subscription_level: updateData.subscription_level,
      username: updateData.username,
      first_name: updateData.first_name,
      last_name: updateData.last_name,
      email: updateData.email,
      member_since: new Date().toISOString(),
      password: hashedPassword,
      // Other default values
      mobile_no: updateData.mobile_no,
      address_line_1: updateData.address_line_1,
      address_line_2: updateData.address_line_2,
      locality: updateData.locality,
      state: updateData.state,
      postal_code: updateData.postal_code,
      country: updateData.country,
      language: updateData.language,
      theme: updateData.theme,
      email_notifications: updateData.email_notifications,
      sms_notifications: updateData.sms_notifications,
      buy_notifications: updateData.buy_notifications,
      sell_notifications: updateData.sell_notifications,
      dump_notifications: updateData.dump_notifications,
      default_exchange: updateData.default_exchange,
      email_verified: updateData.email_verified,
      phone_verified: updateData.phone_verified,
      two_fa: updateData.two_fa,
      question_1: updateData.question_1,
      answer_1: updateData.answer_1,
      question_2: updateData.question_2,
      answer_2: updateData.answer_2,
      question_3: updateData.question_3,
      answer_3: updateData.answer_3,
      exchange_key: hashedExchangeKey,
      exchange_secret_key: hashedExchangeSecretKey,
    };

    // Send userData to the server for update
    const response = await fetch(`${url}/update-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userData }),
    });

    if (!response.ok) {
      Alert.alert('Error saving account on the server');
      return null;
    }

    // Parse the server response
    const responseData = await response.json();

    // Update local storage with new subscription_level
    await AsyncStorage.setItem(
      '@testStorage',
      JSON.stringify({
        user_id: responseData.user_id,
        subscription_level: updateData.subscription_level,
        language: updateData.language,
        theme: updateData.theme,
      })
    );

    // Return user_id for further use in the app
    return responseData.user_id;
  } catch (error) {
    Alert.alert('Error updating account information:', error);
    return null;
  }
};

const deactivateAccount = async () => {
  try {
    // Get user_id from local storage
    const storedData = await AsyncStorage.getItem('@testStorage');
    const { user_id } = JSON.parse(storedData);

    // Send a request to the server to move the user to 'inactive_users' and delete data from active tables
    const response = await fetch(`${url}/deactivate-account`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ user_id }),
    });

    if (!response.ok) {
      Alert.alert('Error deactivating account on the server');
      return false;
    }

    // Remove local storage data after successful deactivation
    await AsyncStorage.removeItem('@testStorage');

    // Return success
    return true;
  } catch (error) {
    Alert.alert('Error deactivating account:', error);
    return false;
  }
};

//-----USE CODE BELOW IN THE SIGNAL PAGES
// Fetch all crypto signals
//const cryptoSignals = await fetchCryptoSignals();

// Fetch a specific number of crypto signals (e.g., 10)
//const cryptoSignals = await fetchCryptoSignals(noSignals);

const fetchCryptoSignals = async (limit) => {
  try {
    // Build the API endpoint with an optional limit parameter
    const api = limit ? `get-crypto-signals/${limit}` : 'get-crypto-signals';
    const apiUrl = `${url}/${api}`;

    // Send a request to the server to fetch crypto signals
    const response = await fetch(apiUrl, {
      method: 'GET', // Assuming the endpoint uses GET method
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response as JSON
    const data = await response.json();

    return data;
  } catch (error) {
    // Display an alert with the error details
    Alert.alert(
      'Error',
      `There was an error fetching data from the database. Please try again later.\n${JSON.stringify(
        error
      )}`,
      [{ text: 'OK' }]
    );
  }
};

//-----USE CODE BELOW IN THE SIGNAL PAGES
// Fetch all stock signals
//const stockSignals = await fetchCryptoSignals();

// Fetch a specific number of stock signals (e.g., 10)
//const stockSignals = await fetchCryptoSignals(noSignals);

const fetchStockSignals = async (limit) => {
  try {
    // Build the API endpoint with an optional limit parameter
    const api = limit ? `get-stock-signals/${limit}` : 'get-stock-signals';
    const apiUrl = `${url}/${api}`;

    // Send a request to the server to fetch crypto signals
    const response = await fetch(apiUrl, {
      method: 'GET', // Assuming the endpoint uses GET method
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the response as JSON
    const data = await response.json();

    return data;
  } catch (error) {
    // Display an alert with the error details
    Alert.alert(
      'Error',
      `There was an error fetching data from the database. Please try again later.\n${JSON.stringify(
        error
      )}`,
      [{ text: 'OK' }]
    );
  }
};

const fetchOrigin = async () => {
  try {
    const api = 'get-origin';
    const apiUrl = `${url}/${api}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();

    return data;
  } catch (error) {
    console.error('Error fetching origin information:', error);
    throw error;
  }
};

const fetchAboutSignals = async () => {
  try {
    const api = 'get-about-signals';
    const apiUrl = `${url}/${api}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();

    return data;
  } catch (error) {
    console.error('Error fetching about signals information:', error);
    throw error;
  }
};

const fetchHowTo = async () => {
  try {
    const api = 'get-how-to';
    const apiUrl = `${url}/${api}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();

    return data;
  } catch (error) {
    console.error('Error fetching how-to information:', error);
    throw error;
  }
};

const fetchSubscriptions = async () => {
  try {
    // Fetch subscriptions from the server
    const response = await fetch(`${url}/get-subscriptions`);

    if (!response.ok) {
      throw new Error('Error fetching subscriptions from the server');
    }

    // Parse the server response
    const subscriptionsData = await response.json();

    // Process the subscriptionsData as needed
    // For example, you can set it in your component state or use it directly

    return subscriptionsData;
  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    return null;
  }
};

const fetchPrivacyPolicy = async () => {
  try {
    const api = 'get-privacy-policy';
    const apiUrl = `${url}/${api}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.text();

    return data;
  } catch (error) {
    console.error('Error fetching privacy policy information:', error);
    throw error;
  }
};

export {
  getUserData,
  createProfile,
  addAccount,
  updateAccount,
  deactivateAccount,
  fetchCryptoSignals,
  fetchStockSignals,
  fetchOrigin,
  fetchAboutSignals,
  fetchHowTo,
  fetchSubscriptions,
  fetchPrivacyPolicy,
};
