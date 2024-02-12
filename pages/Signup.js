import React, {useCallback, useState} from 'react';
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
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomTextInput from '../components/CustomTextInput';
import {useNavigation} from '@react-navigation/native';
import {PageName} from '../helper/PageName';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

Signup = () => {
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    fullname: '',
    email: '',
    phone: '',
    password: '',
  });

  const handleOnChange = useCallback(
    (value, text) => setUserData({...userData, [value]: text}),
    [userData],
  );

  const signupButtonPressed = useCallback(async () => {
    let entries = Object.entries(userData);
    let isEmpty = entries.some(([key, value]) => value === '');
    if (isEmpty) {
      let keyIndex = entries.findIndex(([key, value]) => value === '');
      Alert.alert(`Please enter valid ${entries[keyIndex][0]}`);
    } else {
      const response = await axios({
        method: 'POST',
        url: 'https://api.example.com/register',
        data: userData,
      });
      if (response.data) {
        await AsyncStorage.setItem(
          'currentUser',
          JSON.stringify(response.data),
        );
        await AsyncStorage.setItem('token', response.data.token);
        navigation.navigate(PageName.BOTTOMTAB);
      } else {
        Alert.alert('Something went wrong!');
      }
    }
  }, [userData]);

  const loginButtonPressed = useCallback(
    () => navigation.replace(PageName.LOGIN),
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
          <Text style={styles.loginTitle}>Please Signup to proceed</Text>
        </View>
        <KeyboardAvoidingView style={styles.inputContainer}>
          <CustomTextInput
            value={userData.fullname}
            setValue={text => handleOnChange('fullname', text)}
            placeholder={'Full Name'}
          />
          <CustomTextInput
            value={userData.email}
            setValue={text => handleOnChange('email', text)}
            placeholder={'Email address'}
            keyboardType={'email-address'}
          />
          <CustomTextInput
            value={userData.phone}
            setValue={text => handleOnChange('phone', text)}
            placeholder={'Phone Number'}
            keyboardType={'number-pad'}
          />
          <CustomTextInput
            value={userData.password}
            setValue={text => handleOnChange('password', text)}
            isPasswordField
            placeholder={'Password'}
            keyboardType={'visible-password'}
          />
          <TouchableOpacity
            onPress={signupButtonPressed}
            style={styles.loginButton}>
            <Text style={styles.loginText}>Signup</Text>
          </TouchableOpacity>
          <View style={styles.signupView}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={loginButtonPressed}>
              <Text style={{color: COLOR.DarkBlue}}>Login</Text>
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
    height: responsiveScreenHeight(30),
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

export default React.memo(Signup);
