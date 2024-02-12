import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
} from 'react-native';
import {COLOR} from '../styles/Color';
import {bag} from '../assets';
import {FONTS} from '../styles/Fonts';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {useCallback} from 'react';
import { PageName } from '../helper/PageName';

export const CartIcon = ({tintColor}) => {
  const navigation = useNavigation();
  const cartData = useSelector(state => state.cart.cartData);

  const navigateToCheckout = useCallback(
    () => {
      if(cartData.length > 0){
      navigation.navigate(PageName.CHECKOUT)
    } else {
      Alert.alert('Please add some products to your cart!')
    }
    },
    [cartData],
  );

  return (
    <TouchableOpacity onPress={navigateToCheckout}>
      <Image
        resizeMode={'contain'}
        source={bag}
        style={[styles.bagIcon, {tintColor}]}
      />
      <View style={styles.countMainView}>
        <Text style={styles.countText}>{cartData.length}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bagIcon: {height: 24, width: 24},
  countMainView: {
    position: 'absolute',
    right: -10,
    top: -10,
    height: 24,
    width: 24,
    backgroundColor: COLOR.Yellow,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    fontFamily: FONTS.ManropeBold,
    color: COLOR.White,
    fontWeight: '600',
    fontSize: 14,
    marginTop: Platform.OS === 'ios' ? 0 : -3
  },
});
