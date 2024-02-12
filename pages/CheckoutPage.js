import React, {useCallback, useMemo, useState} from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  FlatList,
  Platform,
  InteractionManager,
} from 'react-native';
import {back, checkout} from '../assets';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {COLOR} from '../styles/Color';
import {FONTS} from '../styles/Fonts';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import CartItem from '../components/CartItem';
import AddressModal from '../components/AddressModal';
import {PageName} from '../helper/PageName';
import LottieView from 'lottie-react-native';
import {emptyCart} from '../redux/CartSlice';
import PaymentModal from '../components/PaymentModal';
import axios from 'axios';

CheckoutPage = () => {
  const navigation = useNavigation();
  const cartData = useSelector(state => state.cart.cartData);
  const [addressModal, setAddressModal] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [confirmPayment, setConfirmPayment] = useState(false);
  const dispatch = useDispatch();
  const totalPrice = useMemo(() => {
    return cartData.reduce((accumulator, currentProduct) => {
      return accumulator + currentProduct.count * currentProduct.price;
    }, 0);
  }, [cartData]);

  const onAnimationFinish = useCallback(() => {
    InteractionManager.runAfterInteractions(()=> {
      setConfirmPayment(false);
      dispatch(emptyCart());
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: PageName.BOTTOMTAB}],
        }),
      );
    })
  }, []);

  const onAddressContinue = useCallback(() => {
    setAddressModal(false);
    setPaymentModal(true);
  },[])

  const onCardSelect = useCallback(async ()=> {
    setPaymentModal(false)
    const response = await axios({
      method: 'POST',
      url: 'https://api.example.com/payment',
      data: {totalPrice},
    });
    if(response.data){
      placeOrder();
    }
  },[])


  const placeOrder = async () => {
    const response = await axios({
      method: 'POST',
      url: 'https://api.example.com/placeOrder',
      data: null,
    });
    if(response.data){
      setConfirmPayment(true)
    }
  }

  const PriceView = ({title, price}) => {
    return (
      <View style={styles.subTotalMainView}>
        <Text style={styles.subTotalText}>{title}</Text>
        <Text style={styles.priceText}>${price}</Text>
      </View>
    );
  };

  const backButtonPressed = useCallback(() => navigation.goBack(), []);

  const goToAddAddressPage = useCallback(() => {
    setAddressModal(false);
    navigation.navigate(PageName.ADDRESS);
  }, []);

  const hideAddressModal = useCallback(() => setAddressModal(false), []);

  const hidePaymentModal = useCallback(() => setPaymentModal(false), []);

  const showAddressModal = useCallback(() => setAddressModal(true), []);

  return (
    <View style={styles.mainView}>
      <View style={styles.containerView}>
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
          <Text style={styles.headingText}>
            Shopping Cart ({cartData.length})
          </Text>
        </View>
        <FlatList
          removeClippedSubviews={true}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          data={cartData}
          bounces={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyMainView}>
              <Text style={styles.emptytext}>No products in cart</Text>
            </View>
          )}
          renderItem={item => (
            <CartItem
              productData={item}
              dispatch={dispatch}
              navigation={navigation}
            />
          )}
        />
        <View style={styles.amountMainView}>
          <PriceView title={'Subtotal'} price={totalPrice} />
          <PriceView title={'Delivery'} price={0} />
          <PriceView title={'Total'} price={totalPrice} />
          <TouchableOpacity
            onPress={showAddressModal}
            style={styles.buyButtonView}>
            <Text style={styles.checkoutText}>Proceed To Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
      <AddressModal
        goToAddAddress={goToAddAddressPage}
        isVisible={addressModal}
        onContinue={onAddressContinue}
        setHidden={hideAddressModal}
      />
      {confirmPayment && (
        <View
          style={{
            position: 'absolute',
            top: '35%',
            alignItems: 'center',
            height: responsiveScreenWidth(80),
            width: responsiveScreenWidth(80),
            borderRadius: responsiveScreenWidth(80) / 2,
            backgroundColor: COLOR.DarkBlue,
          }}>
          <LottieView
            source={checkout}
            autoPlay={true}
            loop={false}
            onAnimationFinish={onAnimationFinish}
            resizeMode={'contain'}
            style={styles.lottieView}
          />
          <Text
            style={{
              fontSize: 26,
              fontFamily: FONTS.ManropeExtaBold,
              color: COLOR.White,
            }}>
            Order Confirmed
          </Text>
        </View>
      )}
      <PaymentModal onCardSelect={onCardSelect} isVisible={paymentModal} setHidden={hidePaymentModal} />
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 0,
  },
  containerView: {
    flex: 1,
    width: responsiveScreenWidth(90),
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: Platform.OS === 'ios' ? 65 : 30,
  },
  lottieView:{alignSelf: 'center', height: 200, width: 200},
  navigationBar: {
    width: responsiveScreenWidth(90),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  headingText: {
    fontSize: 16,
    fontWeight: '400',
    fontFamily: FONTS.ManropeRegular,
    color: '#1E222B',
    marginLeft: 20,
  },
  buyButtonView: {
    backgroundColor: COLOR.Blue,
    borderRadius: 20,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    width: responsiveScreenWidth(80),
    marginTop: 20,
  },
  checkoutText: {
    fontSize: 14,
    fontFamily: FONTS.ManropeRegular,
    fontWeight: '600',
    color: COLOR.White,
  },
  emptyMainView: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptytext: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: FONTS.ManropeBold,
    color: COLOR.Black,
  },
  amountMainView: {
    backgroundColor: '#F8F9FB',
    width: responsiveScreenWidth(95),
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 25,
  },
  subTotalMainView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '80%',
    marginVertical: 10,
  },
  subTotalText: {
    fontSize: 14,
    fontWeight: '400',
    fontFamily: FONTS.ManropeRegular,
    color: COLOR.Black,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FONTS.ManropeMedium,
    color: COLOR.Black,
  },
});

export default React.memo(CheckoutPage);
