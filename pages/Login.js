import React, {useCallback, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {FONTS} from '../styles/Fonts';
import {COLOR} from '../styles/Color';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import CustomTextInput from '../components/CustomTextInput';
import {useNavigation} from '@react-navigation/native';
import {PageName} from '../helper/PageName';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginButtonPressed = useCallback(async () => {
    if (email && password) {
      const response = await axios({
        method: 'GET',
        url: 'https://api.example.com/login',
        data: {email, password},
      });

      if (response.data.token) {
        await AsyncStorage.setItem(
          'currentUser',
          JSON.stringify(response.data),
        );
        await AsyncStorage.setItem('token', response.data.token);
        navigation.navigate(PageName.BOTTOMTAB);
      } else {
        Alert.alert('Something went wrong!');
      }
    } else {
      Alert.alert('Please enter valid email and password!');
    }
  }, [email, password]);

  const signupButtonPressed = useCallback(
    () => navigation.replace(PageName.SIGNUP),
    [],
  );

  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={styles.scrollView}>
      <View style={styles.mainView}>
        <View style={styles.containerView}>
          <Text style={styles.appName}>EcommerceApp</Text>
          <Text style={styles.loginTitle}>Please login to proceed</Text>
        </View>
        <KeyboardAvoidingView style={styles.inputContainer}>
          <CustomTextInput
            value={email}
            setValue={setEmail}
            placeholder={'Email address'}
            keyboardType={'email-address'}
          />
          <CustomTextInput
            value={password}
            setValue={setPassword}
            isPasswordField
            placeholder={'Password'}
            keyboardType={'visible-password'}
          />
          <TouchableOpacity
            onPress={loginButtonPressed}
            style={styles.loginButton}>
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>
          <View style={styles.signupView}>
            <Text>Don't have an account? </Text>
            <TouchableOpacity onPress={signupButtonPressed}>
              <Text style={{color: COLOR.DarkBlue}}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {flex: 1, backgroundColor: COLOR.White},
  mainView: {flex: 1, alignItems: 'center', backgroundColor: COLOR.White},
  textInput: {
    height: 56,
    fontSize: 14,
    fontWeight: '500',
    color: COLOR.White,
    backgroundColor: COLOR.DarkBlue,
    borderRadius: 28,
    paddingLeft: 25,
    paddingRight: 20,
    fontFamily: FONTS.ManropeBold,
    marginVertical: 10,
  },
  searchIcon: {position: 'absolute', right: 25, top: 30, height: 15, width: 15},
  loginButton: {
    backgroundColor: COLOR.DarkBlue,
    borderRadius: 10,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveScreenWidth(90),
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    fontFamily: FONTS.ManropeRegular,
    fontWeight: '600',
    color: COLOR.White,
  },
  containerView: {
    backgroundColor: 'transparent',
    backgroundColor: COLOR.DarkBlue,
    padding: 20,
    height: responsiveScreenHeight(40),
    justifyContent: 'flex-end',
    width: responsiveScreenWidth(100),
  },
  appName: {
    fontSize: 42,
    color: COLOR.White,
    fontFamily: FONTS.ManropeExtaBold,
  },
  loginTitle: {
    fontSize: 20,
    color: COLOR.White,
    fontFamily: FONTS.ManropeExtaBold,
    marginTop: 10,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: COLOR.White,
    width: responsiveScreenWidth(90),
    paddingVertical: 20,
  },
  signupView: {flexDirection: 'row', alignItems: 'center', marginTop: 20},
});

export default React.memo(Login);
