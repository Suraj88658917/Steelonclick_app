import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ActivityIndicator  , Platform , Alert} from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { useNavigation } from '@react-navigation/native';

import Google from '../../assets/images/GoogleLogo.svg';
import Guest from '../../assets/images/GuestLogo.svg';
import api from '../../api/api'


const LoginScreen = () => {

  const navigation = useNavigation();

  const [countryCode, setCountryCode] = useState('IN');
  const [callingCode, setCallingCode] = useState('91');
  const [phone, setPhone] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // login api ---
  const loginUser = async () => {

    if (phone.trim().length !== 10) {
      Alert.alert('Invalid Number', 'Enter 10 digit mobile number');
      return;
    }

    const mobileNumber = `+${callingCode}${phone}`;

    console.log("mobile Number : ", mobileNumber);
    console.log('Platform:', Platform.OS);

    try {

      setLoading(true);

      // api call (send otp)--
      const res = await api.post('/user/login', {
        mobile: mobileNumber,
      },
      );

      console.log("Login API success : ", res.data);

      // navigate to otp screen---
      navigation.navigate("OTPScreen", {
        mobile: mobileNumber,
      });

    }
    catch (error) {
      // error handling--
      let message = 'Something went wrong';

      if (error.response) {
        message = error.response.data?.message || 'Server error';
      } else if (error.request) {
        message = 'Network error';
      } else {
        message = error.message;
      }

      Alert.alert('Login Failed', message);
    } finally {
      // Stop Loader ---
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
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
      <TouchableOpacity
        style={[styles.buttonContainer, loading && { backgroundColor: "#BEBEBE" },
        ]}
        onPress={loginUser}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Login</Text>
        )}
      </TouchableOpacity>

      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Text style={styles.accountText}> Don't have an account ? </Text>

        <TouchableOpacity onPress={() => navigation.navigate("WelcomeScreen")}>
          <Text style={styles.accountText1}> Register here</Text>
        </TouchableOpacity>

      </View>
      <Text style={{ fontSize: 13, fontFamily: "Poppins-Regular", lineHeight: 19, top: 35, alignSelf: "center" }}>or</Text>

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

      {loading && <ActivityIndicator size="large" color="#fff" />}


    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    justifyContent: "center",
    alignContent: "center",
    bottom: 97

  },

  // Back: {
  //   width: 41,
  //   height: 41,
  //   marginTop: 79,
  // },

  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 30,
    marginTop: 29,

  },

  subText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#525252',

  },

  labelRow: {
    flexDirection: 'row',
    marginTop: 46,
  },

  MobileEmail: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
  },

  star: {
    color: 'red',
    marginLeft: 4,
  },

  phoneRow: {
    flexDirection: 'row',
    marginTop: 10,
  },

  countryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E6E6E6',
    borderRadius: 12,
    paddingHorizontal: 6,
    height: 55,
    marginRight: 10,
    backgroundColor: "#f6f6f6",
    borderWidth: 0.5

  },

  codeText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    paddingRight: 10
  },

  phoneInput: {
    width: 275,
    height: 50,
    borderColor: '#E6E6E6',
    borderRadius: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    height: 55,
    backgroundColor: "#f6f6f6",
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
    alignSelf: "center",
    fontFamily: 'Poppins-Regular',
  },
  accountText1: {
    color: "#03A4E6",
    fontSize: 15,
    top: 20,
    alignSelf: "center",
    fontFamily: 'Poppins-Regular',
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
    fontSize: 12,
    marginLeft: 8,
    fontFamily: 'Poppins-Medium',
    color: '#000',

  },

});
