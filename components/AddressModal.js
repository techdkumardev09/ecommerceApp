import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {COLOR} from '../styles/Color';
import {FONTS} from '../styles/Fonts';
import {useSelector} from 'react-redux';

AddressModal = ({isVisible, setHidden, goToAddAddress, onContinue}) => {
  const [selectedAddress, setSelectedAddress] = useState(null);
  const addressData = useSelector(state => state.address.addressData);

  const continueButtonPressed = () => {
    if (selectedAddress === null) {
      Alert.alert('Please select a address');
      return;
    }
    onContinue();
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType={'slide'}>
      <TouchableOpacity
        onPress={setHidden}
        activeOpacity={1}
        style={styles.dismissView}>
        <View style={styles.mainView}>
          <View style={styles.centerView}>
            <Text style={styles.titleView}>Select Address</Text>
            <FlatList
              bounces={false}
              showsVerticalScrollIndicator={false}
              data={addressData}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => setSelectedAddress(index)}
                    style={[
                      styles.cardView,
                      {
                        backgroundColor:
                          index === selectedAddress
                            ? `${COLOR.DarkYellow}90`
                            : COLOR.White,
                      },
                    ]}>
                    <Text>HouseNumber: {item.houseNo}</Text>
                    <Text>streetname: {item.street}</Text>
                    <Text>city: {item.city}</Text>
                    <Text>State: {item.state}</Text>
                    <Text>Pincode: {item.pinCode}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={styles.parallelView}>
            <TouchableOpacity
              onPress={goToAddAddress}
              style={styles.buttonView}>
              <Text style={styles.buttonText}>Add new address</Text>
            </TouchableOpacity>
            {selectedAddress != null && (
              <TouchableOpacity
                onPress={continueButtonPressed}
                style={styles.buttonView}>
                <Text style={styles.buttonText}>Continue</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  buttonView: {
    backgroundColor: COLOR.DarkBlue,
    borderRadius: 10,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    flex: 1,
    marginTop: 20,
  },
  titleView: {fontSize: 24, marginBottom: 10},
  buttonText: {
    fontSize: 14,
    fontFamily: FONTS.ManropeRegular,
    fontWeight: '600',
    color: COLOR.White,
  },
  cardView: {
    width: responsiveScreenWidth(90),
    borderWidth: 1,
    borderColor: 'black',
    padding: 15,
    marginVertical: 5,
    borderRadius: 12,
  },
  centerView: {flex: 1, alignItems: 'center'},
  mainView: {
    height: responsiveScreenHeight(70),
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
  },
  parallelView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  dismissView: {
    flex: 1,
    height: responsiveScreenHeight(100),
    justifyContent: 'flex-end',
    backgroundColor: '#00000090',
  },
});

export default React.memo(AddressModal);
