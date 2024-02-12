import {Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {FONTS} from '../styles/Fonts';
import {COLOR} from '../styles/Color';
import {like, unlike} from '../assets';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, addToWishlist} from '../redux/CartSlice';
import FastImage from 'react-native-fast-image';
import React, { useCallback } from 'react';
import { PageName } from '../helper/PageName';

export const ProductListItem = React.memo(({productData, navigation}) => {
    const {item, index} = productData;
    const dispatch = useDispatch();
    const wishlistData = useSelector(state => state.cart.wishlistData);
    const wishListIndex = wishlistData.findIndex(data => data.id === item.id);

    const onProductPressed = useCallback(() => navigation.navigate(PageName.SINGLEPRODUCT, {data: item}),[]);

    const plusButtonPressed = useCallback(() => dispatch(addToCart(item)),[]);

    const likeButtonPressed = useCallback(() => dispatch(addToWishlist(item)),[]);

    return (
      <TouchableOpacity
        onPress={onProductPressed}
        key={index}
        style={styles.buttonView}>
        <FastImage
          source={{uri: item.thumbnail, priority: FastImage.priority.normal}}
          style={styles.mainImage}
        />
        <View style={styles.lowerView}>
          <View style={styles.priceView}>
            <Text style={styles.priceText}>${item.price}</Text>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <TouchableOpacity style={styles.plusIcon} onPress={plusButtonPressed}>
            <Text style={styles.plusText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={likeButtonPressed} style={styles.likeButton}>
          <Image
            resizeMode={'contain'}
            source={wishListIndex === -1 ? unlike : like}
            style={styles.likeImage}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) => {
    return prevProps.productData.item.id === nextProps.productData.item.id;
  },
);

const styles = StyleSheet.create({
  buttonView: {
    width: '45%',
    height: 190,
    borderRadius: 12,
    backgroundColor: COLOR.Background,
    marginHorizontal: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  mainImage: {
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    height: '65%',
    width: '100%',
  },
  lowerView: {
    width: '90%',
    marginVertical: 10,
    flexDirection: 'row',
    flex: 1,
  },
  priceView: {width: '70%'},
  priceText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONTS.ManropeSemiBold,
    marginBottom: 5,
    color:COLOR.Black
  },
  title: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: FONTS.ManropeRegular,
    paddingBottom: 10,
    color: '#616A7D',
  },
  plusIcon: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: COLOR.DarkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: {
    fontSize: 16,
    color: COLOR.White,
    marginTop: -3,
  },
  likeButton: {position: 'absolute', left: 10, top: 10,backgroundColor:COLOR.White,alignItems:'center',justifyContent:'center',borderRadius:5,padding:5,borderWidth:1,borderColor:COLOR.DarkBlue},
  likeImage: {height: 15, width: 15},
});
