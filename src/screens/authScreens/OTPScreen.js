import React, { useRef, useState, useEffect } from 'react';
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
import Back from '../../assets/images/back.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';


const OTPScreen = ({ navigation, route }) => {
  const { mobile } = route.params;

  const OTP_LENGTH = 6;
  const RESEND_TIME = 60;

  const [otp, setOtp] = useState(new Array(OTP_LENGTH).fill(''));
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(RESEND_TIME);
  const [canResend, setCanResend] = useState(false);

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

      // save token---
      await AsyncStorage.setItem('token' , res.data.token);

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
    if (!canResend) return;

    try {
      await api.post('/user/login', {
        mobile: mobile,
      });

      Alert.alert('OTP Sent', 'New OTP sent successfully');

      setSeconds(RESEND_TIME);
      setCanResend(false);
    } catch (error) {
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to resend OTP'
      );
    }
  };

  useEffect(() => {
    let timer;

    if (seconds > 0) {
      timer = setTimeout(() => {
        setSeconds(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => clearTimeout(timer);
  }, [seconds]);

  return (
    <View style={styles.container}>

      <Back onPress={() => navigation.replace("LoginScreen")}
        width={51} height={51} top={79} />

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
        {!canResend ? (
          <Text style={styles.resendText}>
            Didn’t receive the code? Resending in{' '}
            <Text style={styles.timerText}>{seconds} secs</Text>
          </Text>
        ) : (
          <>
            <Text style={styles.resendText}>Didn’t receive the code? </Text>
            <TouchableOpacity onPress={resendOtp}>
              <Text style={styles.timerText}> Resend OTP</Text>
            </TouchableOpacity>
          </>
        )}
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
    fontSize: 29,
    marginTop: 110,
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
    borderColor: '#fcf7f7',
    borderRadius: 15,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: '#eae6e6',
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
