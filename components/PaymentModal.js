import React, {useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {COLOR} from '../styles/Color';
import {FONTS} from '../styles/Fonts';
import {CARDDATA} from '../helper/Constants';

PaymentModal = ({isVisible, setHidden, onCardSelect}) => {
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <Modal visible={isVisible} transparent={true} animationType={'slide'}>
      <TouchableOpacity
        onPress={setHidden}
        activeOpacity={1}
        style={styles.mainButton}>
        <View style={styles.mainView}>
          <View style={styles.centerView}>
            <Text style={styles.title}>Select Card</Text>
            <FlatList
              bounces={false}
              showsVerticalScrollIndicator={false}
              data={CARDDATA}
              renderItem={({item, index}) => {
                return (
                  <TouchableOpacity
                    onPress={() => setSelectedCard(index)}
                    style={[
                      styles.cardView,
                      {
                        backgroundColor:
                          index === selectedCard
                            ? `${COLOR.DarkYellow}90`
                            : COLOR.White,
                      },
                    ]}>
                    <Text>{item.cardNumber}</Text>
                    <Text>{item.cardHolderName}</Text>
                    <Text>{item.expiry}</Text>
                    <Text>{item.cvv}</Text>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
          <View
            style={styles.continueMainView}>
            {selectedCard != null && (
              <TouchableOpacity
                onPress={onCardSelect}
                style={styles.continueButton}>
                <Text style={styles.continueText}>Continue</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  continueButton: {
    backgroundColor: COLOR.DarkBlue,
    borderRadius: 10,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    flex: 1,
    marginTop: 20,
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
  continueText: {
    fontSize: 14,
    fontFamily: FONTS.ManropeRegular,
    fontWeight: '600',
    color: COLOR.White,
  },
  title: {fontSize: 24, marginBottom: 10},
  mainView: {
    height: responsiveScreenHeight(70),
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'space-between',
  },
  mainButton: {
    flex: 1,
    height: responsiveScreenHeight(100),
    justifyContent: 'flex-end',
    backgroundColor: '#00000090',
  },
  continueMainView:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
});

export default React.memo(PaymentModal);
