import React, {useCallback, useMemo} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import {COLOR} from '../styles/Color';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {CartIcon} from '../components/CartIcon';
import {useNavigation} from '@react-navigation/native';
import {FONTS} from '../styles/Fonts';
import {back, emptyStar, halfStar, like, star, unlike} from '../assets';
import Stars from 'react-native-stars';
import {SliderBox} from 'react-native-image-slider-box';
import {useDispatch, useSelector} from 'react-redux';
import {addToCart, addToWishlist} from '../redux/CartSlice';
import { PageName } from '../helper/PageName';

ProductDetail = props => {
  const {data} = props.route.params;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const wishlistData = useSelector(state => state.cart.wishlistData);
  const wishListIndex = wishlistData.findIndex(item => data.id === item.id);

  const discountedPrice = useMemo(() => {
    let discount = Math.max(0, Math.min(100, data.discountPercentage));
    const discountAmount = (data.price * discount) / 100;
    return `${discountAmount.toFixed(1)}`;
  }, [data]);

  const backButtonPressed = useCallback(() => navigation.goBack(), []);

  const addRemoveFromWishlist = useCallback(
    () => dispatch(addToWishlist(data)),
    [],
  );

  const addToCartButtonPressed = useCallback(
    () => dispatch(addToCart(data)),
    [],
  );

  const buyNowAction = useCallback(() => {
    addToCartButtonPressed();
    navigation.navigate(PageName.CHECKOUT);
  }, []);
  return (
    <ScrollView style={styles.scrollView} bounces={false}>
      <SafeAreaView style={styles.mainView}>
        <View style={styles.navigationBar}>
          <TouchableOpacity
            onPress={backButtonPressed}
            style={styles.backButtonView}>
            <Image
              source={back}
              resizeMode={'contain'}
              style={styles.backImage}
            />
          </TouchableOpacity>
          <CartIcon tintColor={'black'} />
        </View>
        <View style={styles.headingView}>
          <Text style={styles.mainTitle}>{data.title}</Text>
          <Text style={styles.brandName}>{data.brand}</Text>
          <View pointerEvents="none" style={styles.starMainView}>
            <Stars
              half={true}
              default={data.rating}
              spacing={4}
              starSize={13}
              count={5}
              fullStar={star}
              emptyStar={emptyStar}
              halfStar={halfStar}
            />
            <Text style={styles.reviewText}>{data.stock} reviews</Text>
          </View>
          <View style={styles.sliderMainView}>
            <SliderBox
              resizeMethod={'resize'}
              resizeMode={'contain'}
              images={data.images}
              parentWidth={responsiveScreenWidth(100)}
              sliderBoxHeight={207}
              dotColor={COLOR.DarkYellow}
              inactiveDotColor="#E4E4E4"
              paginationBoxStyle={styles.paginationBox}
              dotStyle={styles.dotStyle}
              imageLoadingColor="#F8F9FB"
              sharedTransitionTag="tag"
            />
            <View style={styles.likeMainView}>
              <TouchableOpacity
                onPress={addRemoveFromWishlist}
                style={styles.likeButtonView}>
                <Image
                  source={wishListIndex === -1 ? unlike : like}
                  style={styles.likeImage}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.priceMainView}>
            <Text style={styles.priceText}>$ {data.price}</Text>
            <View style={styles.discountMainView}>
              <Text style={styles.discountText}>${discountedPrice} OFF</Text>
            </View>
          </View>

          <View style={styles.buttonMainView}>
            <View style={styles.container}>
              <TouchableOpacity
                onPress={addToCartButtonPressed}
                style={styles.addCartMainView}>
                <Text style={styles.addText}>Add To Cart</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.container}>
              <TouchableOpacity
                onPress={buyNowAction}
                style={styles.buyButtonView}>
                <Text style={styles.buyText}>Buy Now</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.widthNinety}>
            <Text style={styles.detailsText}>Details</Text>
            <Text style={styles.descriptionsText}>{data.description}</Text>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  scrollView: {backgroundColor: 'white'},
  mainView: {alignItems: 'center', backgroundColor: 'white'},
  navigationBar: {
    width: responsiveScreenWidth(90),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 0 : 20,
  },
  backButtonView: {
    backgroundColor: COLOR.LightGray,
    borderRadius: 20,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  widthNinety: {width: responsiveScreenWidth(90)},
  backImage: {height: 10, width: 5},
  headingView: {marginTop: 20, alignItems: 'center'},
  mainTitle: {
    fontSize: 40,
    fontFamily: FONTS.ManropeExtaLight,
    width: responsiveScreenWidth(90),
    color:COLOR.Black
  },
  brandName: {
    fontSize: 40,
    fontFamily: FONTS.ManropeBold,
    width: responsiveScreenWidth(90),
    color:COLOR.Black
  },
  starMainView: {
    alignItems: 'center',
    width: responsiveScreenWidth(90),
    marginVertical: 10,
    flexDirection: 'row',
  },
  reviewText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FONTS.ManropeRegular,
    color: '#A1A1AB',
    marginLeft: 5,
  },
  sliderMainView: {height: 207},
  paginationBox: {
    position: 'absolute',
    bottom: 10,
    padding: 0,
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  dotStyle: {
    width: 17,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 0,
    padding: 0,
    margin: 0,
    backgroundColor: 'rgba(128, 128, 128, 0.92)',
  },
  likeMainView: {
    height: 58,
    width: 58,
    backgroundColor: COLOR.White,
    position: 'absolute',
    borderRadius: 20,
    right: 20,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth:1,
    borderColor:COLOR.DarkBlue
  },
  likeButtonView: {
    height: 58,
    width: 58,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  likeImage: {height: 20, width: 20},
  priceMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    width: responsiveScreenWidth(90),
    marginTop: 20,
  },
  priceText: {
    color: COLOR.Blue,
    fontSize: 16,
    fontFamily: FONTS.ManropeRegular,
    fontWeight: '400',
  },
  discountMainView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: COLOR.Blue,
    borderRadius: 20,
    marginLeft: 10,
  },
  discountText: {
    color: COLOR.White,
    fontSize: 12,
    fontFamily: FONTS.ManropeRegular,
    fontWeight: '400',
  },
  buttonMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: responsiveScreenWidth(90),
    marginTop: 20,
  },
  addCartMainView: {
    borderColor: COLOR.Blue,
    borderWidth: 1,
    borderRadius: 20,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  addText: {
    fontSize: 14,
    fontFamily: FONTS.ManropeRegular,
    fontWeight: '600',
    color: COLOR.Blue,
  },
  buyButtonView: {
    backgroundColor: COLOR.Blue,
    borderRadius: 20,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10,
  },
  buyText: {
    fontSize: 14,
    fontFamily: FONTS.ManropeRegular,
    fontWeight: '600',
    color: COLOR.White,
  },
  detailsText: {
    marginTop: 40,
    fontFamily: FONTS.ManropeRegular,
    fontSize: 16,
    fontWeight: '400',
    color:COLOR.Black
  },
  descriptionsText: {
    marginTop: 5,
    fontFamily: FONTS.ManropeRegular,
    fontSize: 16,
    fontWeight: '400',
    color: '#8891A5',
  },
});

export default React.memo(ProductDetail);
