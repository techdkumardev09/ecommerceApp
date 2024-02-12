import React, { useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {FONTS} from '../styles/Fonts';
import {COLOR} from '../styles/Color';
import {addToCart, addToWishlist} from '../redux/CartSlice';
import FastImage from 'react-native-fast-image';
import { PageName } from '../helper/PageName';

WishlistItem = ({productData, dispatch, navigation,isHistory}) => {
  const {item,index} = productData;
  const removeButtonPressed = useCallback(() => dispatch(addToWishlist(item)),[]);
  const addToCartButtonPressed = useCallback(() => dispatch(addToCart(item)),[]);
  const navigateToDetailPage = useCallback(() => navigation.navigate(PageName.SINGLEPRODUCT,{data:item}),[])
  return (
    <View key={index}>
      <View style={styles.rowView}>
        <TouchableOpacity onPress={navigateToDetailPage} style={styles.productView}>
          <FastImage
            style={styles.thumbnail}
            source={{
              uri: item.thumbnail,
              priority: FastImage.priority.normal
            }}
          />
          <View style={styles.titleMainView}>
            <Text style={styles.titleText}>{item.title}</Text>
            <Text style={styles.priceText}>${item.price}</Text>
          </View>
        </TouchableOpacity>
       {isHistory ? <Text style={[styles.addText,styles.qtyText]}>Quantity: {item.count}</Text> : <><View>
          <TouchableOpacity
            onPress={removeButtonPressed}
            style={[styles.addCartMainView, {backgroundColor: 'red'}]}>
            <Text style={styles.addText}>Remove</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            onPress={addToCartButtonPressed}
            style={styles.addCartMainView}>
            <Text style={styles.addText}>Add To Cart</Text>
          </TouchableOpacity>
        </View></>}
      </View>
      <View style={styles.dividerView} />
    </View>
  );
};

const styles = StyleSheet.create({
  addCartMainView: {
    backgroundColor: COLOR.Blue,
    borderRadius: 10,
    height: 35,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  addText: {
    fontSize: 14,
    fontFamily: FONTS.ManropeRegular,
    fontWeight: '600',
    color: COLOR.White,
  },
  qtyText:{color:COLOR.Black,marginRight:25},
  thumbnail: {height: 30, width: 30, borderRadius: 5},
  rowView: {
    height: 42,
    width: responsiveScreenWidth(90),
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  productView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 5,
  },
  dividerView: {height: 1, flex: 1, backgroundColor: COLOR.LightGray},
  titleMainView: {marginLeft: 20, flex: 1},
  titleText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FONTS.ManropeRegular,
    color: '#1E222B',
    flex: 1,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FONTS.ManropeRegular,
    color: '#1E222B',
    marginTop: 3,
  },
});

export default React.memo(WishlistItem);