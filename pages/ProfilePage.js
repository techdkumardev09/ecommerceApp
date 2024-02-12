import React, {useCallback} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {FONTS} from '../styles/Fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {PageName} from '../helper/PageName';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {COLOR} from '../styles/Color';

ProfilePage = () => {
  const navigation = useNavigation();

  const logoutAction = useCallback(() => {
    AsyncStorage.clear();
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: PageName.LOGIN}],
      }),
    );
  }, []);

  const navigateToOrderHistory = useCallback(
    () => navigation.navigate(PageName.HISTORY),
    [],
  );

  return (
    <View style={styles.mainView}>
      <TouchableOpacity
        style={styles.buttonView}
        onPress={navigateToOrderHistory}>
        <Text style={styles.logOutText}>Order History</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonView} onPress={logoutAction}>
        <Text style={styles.logOutText}>Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {flex: 1, alignItems: 'center', justifyContent: 'center'},
  logOutText: {
    fontSize: 24,
    fontFamily: FONTS.ManropeExtaBold,
    color: COLOR.White,
  },
  buttonView: {
    width: responsiveScreenWidth(80),
    backgroundColor: COLOR.DarkBlue,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    padding:20
  },
});

export default React.memo(ProfilePage);
