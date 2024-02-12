import React from 'react';
import {View, StyleSheet, Text, FlatList, Platform} from 'react-native';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {COLOR} from '../styles/Color';
import {FONTS} from '../styles/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import {CartIcon} from '../components/CartIcon';
import WishListItem from '../components/WishListItem';
import {useNavigation} from '@react-navigation/native';

WishListPage = () => {
  const cartData = useSelector(state => state.cart.wishlistData);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  return (
    <View style={styles.mainView}>
      <View style={styles.containerView}>
        <View style={styles.navigationBar}>
          <View style={styles.backButtonView}>
            <Text style={styles.headingText}>Favourites</Text>
          </View>
          <CartIcon tintColor={'black'} />
        </View>
        <FlatList
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          data={cartData}
          removeClippedSubviews={true}
          bounces={false}
          ListEmptyComponent={() => (
            <View style={styles.emptyView}>
              <Text style={styles.emptyText}>
                Add products to your wishlist!
              </Text>
            </View>
          )}
          renderItem={item => (
            <WishListItem
              productData={item}
              dispatch={dispatch}
              navigation={navigation}
            />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    paddingBottom: 50,
  },
  addCartMainView: {
    backgroundColor: COLOR.Blue,
    borderRadius: 10,
    height: 30,
    paddingVertical: 5,
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
  containerView: {
    flex: 1,
    width: responsiveScreenWidth(90),
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: 'white',
    marginTop: Platform.OS === 'ios' ? 65 : 30,
  },
  navigationBar: {
    width: responsiveScreenWidth(90),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  backButtonView: {
    borderRadius: 20,
  },
  headingText: {
    fontSize: 22,
    fontFamily: FONTS.ManropeSemiBold,
    color:COLOR.Black
  },
  backImage: {height: 10, width: 5},
  emptyView: {
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: FONTS.ManropeBold,
    color:COLOR.Black
  }
});

export default React.memo(WishListPage);
