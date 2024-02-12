import React, {useCallback} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  SectionList,
  TouchableOpacity,
  Image,
} from 'react-native';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import {COLOR} from '../styles/Color';
import {FONTS} from '../styles/Fonts';
import {useDispatch, useSelector} from 'react-redux';
import WishListItem from '../components/WishListItem';
import {useNavigation} from '@react-navigation/native';
import {back} from '../assets';

OrderHistory = () => {
  const orderHistory = useSelector(state => state.cart.orderHistory);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const backButtonPressed = useCallback(() => navigation.goBack(), []);

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
          <Text style={styles.headingText}>Order History</Text>
        </View>
        <SectionList
          style={styles.sectionStyle}
          contentContainerStyle={styles.sectionContent}
          keyExtractor={item => item.id.toString()}
          showsVerticalScrollIndicator={false}
          sections={orderHistory}
          removeClippedSubviews={true}
          bounces={false}
          renderSectionHeader={() => (
            <View
              style={styles.headerView}>
              <Text style={styles.newOrderTitle}>
                New Order
              </Text>
            </View>
          )}
          ListEmptyComponent={() => (
            <View style={styles.emptyView}>
              <Text style={styles.emptyText}>No Order History!</Text>
            </View>
          )}
          renderItem={item => (
            <WishListItem
              productData={item}
              dispatch={dispatch}
              navigation={navigation}
              isHistory={true}
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
  newOrderTitle:{fontSize: 16, fontFamily: FONTS.ManropeMedium},
  sectionContent:{
    flexGrow: 1,
    paddingBottom: 15,
  },
  sectionStyle:{
    flex: 1,
    flexGrow: 1,
    paddingHorizontal: 10,
  },
  headerView:{
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
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
  },
  backButtonView: {
    backgroundColor: COLOR.LightGray,
    borderRadius: 20,
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  headingText: {
    fontSize: 22,
    fontFamily: FONTS.ManropeSemiBold,
    color: COLOR.Black,
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
    color: COLOR.Black,
  },
});

export default React.memo(OrderHistory);
