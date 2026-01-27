import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { useNavigation } from '@react-navigation/native';

import Google from '../../assets/images/GoogleLogo.svg';
import Guest from '../../assets/images/GuestLogo.svg';
import Back from '../../assets/images/back.svg';





const LoginScreen = () => {

  const navigation = useNavigation();

  const [countryCode, setCountryCode] = useState('IN');
  const [callingCode, setCallingCode] = useState('91');
  const [phone, setPhone] = useState('');
  const [visible, setVisible] = useState(false);

  return (
    <View style={styles.container}>
      <Back style={styles.Back} />

      <Text style={styles.text}>Login</Text>
      <Text style={styles.subText}>
        Enter the following details to login
      </Text>

      {/* Label */}
      <View style={styles.labelRow}>
        <Text style={styles.MobileEmail}>Mobile/Email</Text>
        <Text style={styles.star}>*</Text>
      </View>

      {/* Phone Row */}
      <View style={styles.phoneRow}>
        {/* Country picker */}
        <TouchableOpacity
          style={styles.countryBox}
          onPress={() => setVisible(true)}
        >
          <CountryPicker
            visible={visible}
            withFlag
            withCallingCode
            withFilter
            countryCode={countryCode}
            onClose={() => setVisible(false)}
            onSelect={(country) => {
              setCountryCode(country.cca2);
              setCallingCode(country.callingCode[0]);
            }}
          />
          <Text style={styles.codeText}>+{callingCode}</Text>
        </TouchableOpacity>

        {/* Phone number input */}
        <TextInput
          style={styles.phoneInput}
          placeholder="Enter phone number"
          keyboardType="number-pad"
          value={phone}
          onChangeText={setPhone}
          maxLength={10}
        />
      </View>
      <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Text style={styles.accountText}> Don't have an account ? </Text>

        <TouchableOpacity onPress={() => navigation.navigate("WelcomeScreen")}>
          <Text style={styles.accountText1}> Register here</Text>
        </TouchableOpacity>

      </View>
      <Text style={{ fontSize: 15, fontWeight: "400", fontFamily: "Poppins-Bold", lineHeight: 19, top: 35, alignSelf: "center" }}>or</Text>

      <View style={styles.socialRow}>
        {/* Google Login */}
        <TouchableOpacity
          style={styles.socialBtn}
          onPress={() => console.log('Google Login')}
        >
          <Google width={16} height={16} />
          <Text style={styles.socialText}>Login via Google</Text>
        </TouchableOpacity>

        {/* Guest Login */}
        <TouchableOpacity
          style={styles.socialBtn}
          onPress={() => navigation.replace('HomeScreen')}
        >
          <Guest width={16} height={16} />
          <Text style={styles.socialText}>Continue as Guest</Text>
        </TouchableOpacity>
      </View>


    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },

  Back: {
    width: 41,
    height: 41,
    marginTop: 79,
  },

  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 29,

  },

  subText: {
    fontFamily: 'Poppins-regular',
    fontSize: 14,
    color: '#525252',
    marginTop: 6,
  },

  labelRow: {
    flexDirection: 'row',
    marginTop: 46,
  },

  MobileEmail: {
    fontSize: 14,
    fontFamily: 'Poppins-regular',
    fontWeight: '700',
  },

  star: {
    color: 'red',
    marginLeft: 4,
  },

  phoneRow: {
    flexDirection: 'row',
    marginTop: 16,
  },

  countryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 12,
    paddingHorizontal: 6,
    height: 55,
    marginRight: 10,
    backgroundColor: "#ededed",
    borderWidth: 0.5

  },

  codeText: {
    fontSize: 16,
    fontFamily: 'Poppins-regular',
    paddingRight: 10
  },

  phoneInput: {
    width: 275,
    height: 50,
    borderColor: '#ccc',
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Poppins-regular',
    height: 55,
    backgroundColor: "#ededed",
    paddingHorizontal: 16,
    borderWidth: 0.5
  },
  buttonContainer: {
    backgroundColor: '#03A4E6',
    width: 378,
    height: 59.53,
    borderRadius: 15,
    marginTop: 30,

    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 15,
    fontFamily: 'Poppins-Regular',
    lineHeight: 19,
    color: '#fff',
  },
  accountText: {
    color: "#000000",
    fontSize: 15,
    top: 20,
    alignSelf: "center"
  },
  accountText1: {
    color: "#03A4E6",
    fontSize: 15,
    top: 20,
    alignSelf: "center"
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: 50,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f4f1f1',
    paddingVertical: 20,
    paddingHorizontal: 19,
    borderRadius: 17,
    backgroundColor: '#f7f4f4',
    flex: 1,
    justifyContent: 'center',
  },
  socialText: {
    fontSize: 14,
    marginLeft: 8,
    fontFamily: 'Poppins-Medium',
    color: '#000',
    fontWeight: "bold"
  },

});
