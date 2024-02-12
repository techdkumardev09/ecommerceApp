import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FONTS} from '../styles/Fonts';
import {COLOR} from '../styles/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {PageName} from '../helper/PageName';

SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkAndNavigate = async () => {
      let token = await AsyncStorage.getItem('token');
      if (token) {
        navigation.navigate(PageName.BOTTOMTAB);
      } else {
        navigation.navigate(PageName.LOGIN);
      }
    };
    setTimeout(() => checkAndNavigate(), 1000);
  }, []);

  return (
    <View style={styles.mainView}>
      <Text style={styles.appName}>EcommerceApp</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLOR.DarkBlue,
  },
  appName: {
    fontSize: 24,
    fontFamily: FONTS.ManropeExtaBold,
    color: COLOR.White,
  },
});

export default React.memo(SplashScreen);
