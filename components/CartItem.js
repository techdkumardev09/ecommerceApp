import React, {useCallback} from 'react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {FONTS} from '../styles/Fonts';
import {addToCart, removeFromCart} from '../redux/CartSlice';
import {COLOR} from '../styles/Color';
import FastImage from 'react-native-fast-image';
import { PageName } from '../helper/PageName';

CartItem = ({productData, dispatch, navigation}) => {
  const {item, index} = productData;

  const onProductClicked = useCallback(
    () => navigation.navigate(PageName.SINGLEPRODUCT, {data: item}),
    [],
  );

  const removeItemPressed = useCallback(
    () => dispatch(removeFromCart(item)),
    [],
  );

  const addItemPressed = useCallback(() => dispatch(addToCart(item)), []);

  return (
    <View key={index}>
      <View style={styles.containerView}>
        <TouchableOpacity
          onPress={onProductClicked}
          style={[styles.rowView, {flex: 1, marginRight: 5}]}>
          <FastImage
            style={styles.thumbnailView}
            source={{
              uri: item.thumbnail,
              priority: FastImage.priority.normal,
            }}
          />
          <View style={styles.productView}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.rowView}>
          <TouchableOpacity
            onPress={removeItemPressed}
            style={styles.buttonView}>
            <Text style={[styles.quantityButtonView,{fontSize:20}]}>-</Text>
          </TouchableOpacity>
          <Text style={styles.countText}>{item.count}</Text>
          <TouchableOpacity onPress={addItemPressed} style={styles.buttonView}>
            <Text style={styles.quantityButtonView}>+</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.dividerView} />
    </View>
  );
};

const styles = StyleSheet.create({
  containerView: {
    height: 42,
    width: responsiveScreenWidth(90),
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  rowView: {flexDirection: 'row', alignItems: 'center'},
  thumbnailView: {height: 30, width: 30, borderRadius: 5},
  title: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FONTS.ManropeRegular,
    color: '#1E222B',
  },
  price: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FONTS.ManropeRegular,
    color: '#1E222B',
    marginTop: 3,
  },
  buttonView: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    marginHorizontal: 10,
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FONTS.ManropeRegular,
    color:COLOR.Black
  },
  productView:{marginLeft: 20, flex: 1},
  dividerView: {height: 1, flex: 1, backgroundColor: COLOR.LightGray},
  quantityButtonView:{fontSize: 16,color:COLOR.Black}
});

export default React.memo(CartItem);
