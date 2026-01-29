import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useState } from 'react';
import CountryPicker from 'react-native-country-picker-modal';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [countryCode, setCountryCode] = useState('IN');
  const [callingCode, setCallingCode] = useState('91');
  const [phone, setPhone] = useState('');
  const [visible, setVisible] = useState(false);
  const[CompanyName , setCompanyName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>
        Enter the following details to get started
      </Text>

      {/* Full Name */}
      <View style={styles.labelRow}>
        <Text style={styles.label}>Full Name</Text>
        <Text style={styles.star}>*</Text>
      </View>
      <TextInput
        placeholder="Enter Full Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />

      {/* Email */}
      <View style={styles.labelRow}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.star}>*</Text>
      </View>
      <TextInput
        placeholder="Enter Email"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />

      {/* Mobile */}
      <View style={styles.labelRow}>
        <Text style={styles.label}>Mobile</Text>
        <Text style={styles.star}>*</Text>
      </View>

      <View style={styles.phoneRow}>
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

        <TextInput
          style={styles.phoneInput}
          placeholder="Enter phone number"
          keyboardType="number-pad"
          value={phone}
          onChangeText={setPhone}
          maxLength={10}
        />
      </View>

      <View style={styles.labelRow}>
        <Text style={styles.label1}>Company Name</Text>
      </View>
      <TextInput
        placeholder="Enter Company Name"
        value={CompanyName}
        onChangeText={setCompanyName}
        style={styles.input}
        keyboardType="web-search"
      />


    </View>
  );
};

export default RegisterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    bottom:35
  },

  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    marginTop: 166,
    color: '#000',
  },

  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#525252',
  },

  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 25,
  },

  label: {
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },
   label1: {
    fontSize: 13,
    fontFamily: 'Poppins-Medium',
    color: '#000000',
  },

  star: {
    color: 'red',
    right: -2,
    bottom: 3
  },

  input: {
    height: 59,
    borderColor: '#e6e6e6',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginTop: 8,
    fontFamily: 'Poppins-Medium',
    backgroundColor: '#f6f6f6',
    fontWeight: "bold"
  },

  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  countryBox: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#e6e6e6',
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 59,
    backgroundColor: '#f6f6f6',
    marginRight: 10,
  },

  codeText: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    marginLeft: 6,
    right:10
  },

  phoneInput: {
    flex: 1,
    height: 52,
    borderColor: '#e6e6e6',
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f6f6f6',
    fontFamily: 'Poppins-Medium',
  },
});
