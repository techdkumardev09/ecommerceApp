import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Image,
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
import {addAddress} from '../redux/AddressSlice';
import {useDispatch} from 'react-redux';
import {back} from '../assets';

AddAddress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [addressData, setAddressData] = useState({
    houseNo: '',
    street: '',
    city: '',
    state: '',
    pinCode: '',
  });

  const backButtonPressed = useCallback(() => navigation.goBack(), []);

  const handleOnChange = useCallback(
    (value, text) => setAddressData({...addressData, [value]: text}),
    [addressData],
  );

  const addButtonPressed = useCallback(async () => {
    let entries = Object.entries(addressData);
    let isEmpty = entries.some(([key, value]) => value === '');
    if (isEmpty) {
      let keyIndex = entries.findIndex(([key, value]) => value === '');
      Alert.alert(`Please enter valid ${entries[keyIndex][0]}`);
    } else {
      dispatch(addAddress(addressData));
      navigation.goBack();
    }
  }, [addressData]);

  return (
    <KeyboardAwareScrollView
      bounces={false}
      showsVerticalScrollIndicator={false}
      keyboardDismissMode="interactive"
      style={styles.scrollView}>
      <View style={styles.mainView}>
        <View style={styles.containerView}>
          <TouchableOpacity
            onPress={backButtonPressed}
            style={styles.backButtonView}>
            <Image
              source={back}
              resizeMode={'contain'}
              style={styles.backImage}
            />
          </TouchableOpacity>
          <Text style={styles.addressTitle}>Add Address</Text>
        </View>
        <KeyboardAvoidingView style={styles.inputContainer}>
          <CustomTextInput
            value={addressData.fullname}
            setValue={text => handleOnChange('houseNo', text)}
            placeholder={'House Number'}
          />
          <CustomTextInput
            value={addressData.email}
            setValue={text => handleOnChange('street', text)}
            placeholder={'Street Name'}
          />
          <CustomTextInput
            value={addressData.phone}
            setValue={text => handleOnChange('city', text)}
            placeholder={'City'}
          />
          <CustomTextInput
            value={addressData.password}
            setValue={text => handleOnChange('state', text)}
            placeholder={'State'}
          />
          <CustomTextInput
            value={addressData.password}
            setValue={text => handleOnChange('pinCode', text)}
            placeholder={'PinCode'}
            keyboardType={'number-pad'}
          />
          <TouchableOpacity
            onPress={addButtonPressed}
            style={styles.addButton}>
            <Text style={styles.addText}>Add</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  scrollView: {flex: 1, backgroundColor: COLOR.White},
  mainView: {flex: 1, alignItems: 'center', backgroundColor: COLOR.White},
  addButton: {
    backgroundColor: COLOR.DarkBlue,
    borderRadius: 10,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveScreenWidth(90),
    marginTop: 20,
  },
  backButtonView: {
    backgroundColor: COLOR.LightGray,
    borderRadius: 20,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backImage: {height: 10, width: 5},
  addText: {
    fontSize: 14,
    fontFamily: FONTS.ManropeRegular,
    fontWeight: '600',
    color: COLOR.White,
  },
  containerView: {
    backgroundColor: 'transparent',
    backgroundColor: COLOR.DarkBlue,
    padding: 20,
    height: responsiveScreenHeight(25),
    justifyContent: 'space-between',
    paddingTop: 60,
    width: responsiveScreenWidth(100),
  },
  addressTitle: {
    fontSize: 42,
    color: COLOR.White,
    fontFamily: FONTS.ManropeExtaBold,
  },
  inputContainer: {
    flex: 1,
    backgroundColor: COLOR.White,
    width: responsiveScreenWidth(90),
    paddingVertical: 20,
  },
});

export default React.memo(AddAddress);
