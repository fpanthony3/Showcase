import React, { useState, useContext, useCallback } from 'react';
import { View, Text, Alert, Button, Linking } from 'react-native';

import DropDownPicker from 'react-native-dropdown-picker';

import Settings from '../utils/FunctionContext';

import { styles } from '../utils/styling';
//import { theme } from '../utils/themes';

const ContactUs = () => {
  const context = useContext(Settings);

  const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);

    return <Button color="white" title={children} onPress={handlePress} />;
  };

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('');
  const [items, setItems] = useState([
    { label: 'Suggestion', value: 'Suggestion' },
    { label: 'App Trouble', value: 'App Trouble' },
    { label: 'Account Help', value: 'Account Help' },
    { label: 'Other', value: 'Other' },
  ]);

  const emailURL = 'mailto:fpanthony3@gmail.com?subject=' + value;

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.welcomeLabelView}>
          <Text style={styles.welcomeLabelText}>WELCOME TO 'CONTACT US'</Text>
        </View>

        <View style={styles.welcomeLabelView}>
          <Text style={styles.textBlockText}>
            {'     '}
            We love to hear from the STACT community. Your ideas, thoughts, and
            feedback are highly valued.
          </Text>
        </View>

        <View style={styles.paragraphBlockView}>
          <Text style={styles.textBlockText}>
            {'     '}
            We strive to make your STACT Genie experience flawless but we are
            human after all and we know you may run into problems from time to
            time. Please don't hesitate to reach out to us so that we can help
            resolve any issues that you may be experiencing.
          </Text>
        </View>

        <View style={styles.paragraphBlockView}>
          <Text style={styles.textBlockText}>
            {'     '}
            But before you do please check our{' '}
            <Text
              style={styles.linkText}
              onPress={() => {
                Linking.openURL('http://www.python.org/');
              }}>
              FAQ PAGE
            </Text>{' '}
            to see if a solution already exists.
          </Text>
        </View>

        <View style={styles.paragraphBlockView}>
          <Text style={styles.textBlockText}>
            {'     '}
            Didn't find what you were looking for? That's OK, use the drop down
            menu and button below to email us.
          </Text>
        </View>
      </View>

      <View style={styles.dropDownView}>
        <Text style={styles.dropDownText}>
          Let us know why your contacting us...
        </Text>
        <DropDownPicker
          style={styles.dropDownBackColor}
          placeholder="Select a Reason"
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
        />
      </View>

      {open === false ? (
        <View style={styles.sendEmailButtonView}>
          <OpenURLButton url={emailURL}>Send Email</OpenURLButton>
        </View>
      ) : null}
    </View>
  );
};

export default ContactUs;
