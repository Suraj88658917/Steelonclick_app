import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import api from '../../api/api';


const OTPScreen = ({ navigation, route }) => {
  const { mobile } = route.params;

  const OTP_LENGTH = 6;
  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);

  const inputs = useRef([]);

  const isOtpComplete = otp.every(d => d !== '');

  /* ===== OTP INPUT ===== */
  const handleChange = (text, index) => {
    if (isNaN(text)) return;

    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  /* ===== VERIFY OTP ===== */
  const handleVerifyOtp = async () => {
    if (!isOtpComplete) return;

    try {
      setLoading(true);

      await api.post('/user/login', {
        mobile: mobile, 
      }); 

      const payload = {
        mobile: mobile,
        otp: String(otp.join('')),

      };

      console.log('OTP VERIFY PAYLOAD:', payload);

      const res = await api.post('/user/verifyLoginOtp', payload);

      console.log('OTP VERIFY SUCCESS:', res.data);

      navigation.replace('Main');

    } catch (error) {
      console.log(
        'OTP VERIFY ERROR:',
        error.response?.data || error.message
      );

      Alert.alert(
        'OTP Failed',
        error.response?.data?.message || 'Invalid OTP'
      );

      setOtp(new Array(OTP_LENGTH).fill(''));
      inputs.current[0]?.focus();

    } finally {
      setLoading(false);
    }
  };

  /* ===== RESEND OTP ===== */
  const resendOtp = async () => {
    try {
      await api.post('/user/login', {
        mobile: mobile,
      });

      Alert.alert('OTP Sent', 'New OTP sent successfully');
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to resend OTP'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Two Factor{'\n'}Authentication
      </Text>

      <Text style={styles.subtitle}>
        Enter the code sent on your number
      </Text>

      <Text style={styles.label}>OTP</Text>

      <View style={styles.otpContainer}>
        {otp.map((value, index) => (
          <TextInput
            key={index}
            ref={ref => (inputs.current[index] = ref)}
            style={styles.otpInput}
            keyboardType="number-pad"
            maxLength={1}
            value={value}
            editable={!loading}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) => {
              if (
                nativeEvent.key === 'Backspace' &&
                !otp[index] &&
                index > 0
              ) {
                inputs.current[index - 1]?.focus();
              }
            }}
          />
        ))}
      </View>

      <TouchableOpacity
        disabled={!isOtpComplete || loading}
        onPress={handleVerifyOtp}
        style={[
          styles.submitButton,
          (!isOtpComplete || loading) && styles.disabledButton,
        ]}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.submitText}>Submit</Text>
        )}
      </TouchableOpacity>

      <View style={styles.resendContainer}>
        <Text style={styles.resendText}>Didn’t receive the code?</Text>
        <TouchableOpacity onPress={resendOtp}>
          <Text style={styles.timerText}> Resend OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OTPScreen;


/* ===== STYLES (UNCHANGED) ===== */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    marginTop: 150,
    color: '#000',
  },
  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    lineHeight: 30,
    color: '#525252',
  },
  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
    marginTop: 18,
    color: '#000',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  otpInput: {
    width: 51,
    height: 51,
    borderWidth: 0.5,
    borderColor: '#e6e6e6',
    borderRadius: 15,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#f6f6f6',
    fontFamily: 'Poppins-Medium',
  },
  submitButton: {
    backgroundColor: '#03A4E6',
    height: 55,
    borderRadius: 15,
    marginTop: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
  },
  resendContainer: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 30,
  },
  resendText: {
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    color: '#BEBEBE',
  },
  timerText: {
    fontSize: 12,
    fontFamily: 'Poppins-Bold',
    color: '#03A4E6',
  },
});
