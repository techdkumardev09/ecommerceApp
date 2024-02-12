/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useMemo, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Platform,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import {COLOR} from '../styles/Color';
import {FONTS} from '../styles/Fonts';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from 'react-native-responsive-dimensions';
import {sale} from '../assets';
import {CartIcon} from '../components/CartIcon';
import useApi from '../CustomHook/useApi';
import DropDown from '../components/DropDown';
import {ProductListItem} from '../components/ProductListItem';
import {useNavigation} from '@react-navigation/native';
import {DUMMYDATA, FILTERDATA} from '../helper/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Home() {
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState(null);
  const [userData, setUserData] = useState(null);
  const navigation = useNavigation();
  const {data, loading} = useApi('https://dummyjson.com/products');

  const productData = useMemo(() => {
    if (data && data.products) {
      let addedCountData = data.products.map(item => {
        return {...item, count: 1};
      });
      return addedCountData;
    }
    return [];
  }, [data]);

  useEffect(async () => {
    let currentUserData = await AsyncStorage.getItem('currentUser');
    if (currentUserData) {
      currentUserData = JSON.parse(currentUserData);
    } else {
      currentUserData.fullname = 'User';
    }
    setUserData(currentUserData);
  }, []);

  const getProductData = useMemo(() => {
    let products = JSON.parse(JSON.stringify(productData));

    if (filterType && filterType.value) {
      products = products.sort((a, b) =>
        filterType.value === '1' ? b.price - a.price : a.price - b.price,
      );
    }

    return products.filter(item =>
      item.title.toLowerCase().includes(searchText.toLowerCase()),
    );
  }, [searchText, productData, filterType]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      bounces={false}
      style={styles.conatiner}>
      <View style={styles.headerView}>
        <View style={styles.widthNinety}>
          <View style={[styles.rowCenter, styles.topView]}>
            <Text style={styles.greetingText}>
              Hello, {userData ? userData.fullname : 'User'}
            </Text>
            <CartIcon tintColor={'white'} />
          </View>
          <SearchBar searchText={searchText} setSearchText={setSearchText} />
          <View style={[styles.rowCenter, {justifyContent: 'flex-end'}]}>
            <DropDown
              value={filterType}
              setValue={setFilterType}
              data={FILTERDATA}
              width={'25%'}
              title={'Filter'}
            />
          </View>
        </View>
      </View>
      <View style={styles.offerMainView}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          removeClippedSubviews={true}
          data={DUMMYDATA}
          renderItem={() => (
            <TouchableOpacity style={styles.offerButtonView}>
              <Image source={sale} style={styles.saleApp} />
              <View>
                <Text style={styles.offerMainTitle}>Get</Text>
                <Text style={styles.offerOffTitle}>50% OFF</Text>
                <Text style={styles.offerNumber}>On first 03 order</Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <Text style={styles.recommendedTitle}>Recommended</Text>
        <FlatList
          removeClippedSubviews={true}
          keyExtractor={item => item.id.toString()}
          scrollEnabled={false}
          style={styles.productFlatlistView}
          numColumns={2}
          showsHorizontalScrollIndicator={false}
          data={getProductData}
          ListEmptyComponent={() => (
            <View style={styles.emptyView}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Text style={{color: COLOR.Black}}>No products found!</Text>
              )}
            </View>
          )}
          renderItem={item => (
            <ProductListItem productData={item} navigation={navigation} />
          )}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  greetingText: {
    fontFamily: FONTS.ManropeBold,
    fontSize: 22,
    fontWeight: '600',
    color: COLOR.White,
  },
  conatiner: {flex: 1, backgroundColor: COLOR.White},
  headerView: {
    alignItems: 'center',
    backgroundColor: COLOR.Blue,
    paddingBottom: 20,
  },
  topView: {
    marginTop: Platform.OS === 'ios' ? 60 : 30,
    marginBottom: 35,
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  offerMainView: {
    flex: 1,
    backgroundColor: COLOR.White,
    paddingVertical: 20,
    paddingLeft: 15,
    alignItems: 'center',
  },
  offerButtonView: {
    width: 250,
    flexDirection: 'row',
    height: 125,
    borderRadius: 16,
    backgroundColor: COLOR.DarkYellow,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  offerMainTitle: {
    color: COLOR.White,
    fontWeight: '300',
    fontSize: 20,
    fontFamily: FONTS.ManropeLight,
  },
  offerOffTitle: {
    color: COLOR.White,
    fontWeight: '800',
    fontSize: 26,
    fontFamily: FONTS.ManropeBold,
  },
  offerNumber: {
    color: COLOR.White,
    fontWeight: '300',
    fontSize: 13,
    fontFamily: FONTS.ManropeLight,
  },
  recommendedTitle: {
    fontWeight: '400',
    fontFamily: FONTS.ManropeRegular,
    fontSize: 30,
    marginTop: 20,
    width: responsiveScreenWidth(90),
    color: COLOR.Black,
  },
  widthNinety: {
    width: responsiveScreenWidth(90),
  },
  productFlatlistView: {
    width: responsiveScreenWidth(95),
    marginTop: 20,
    flex: 1,
  },
  saleApp: {height: 68, width: 68},
  emptyView: {
    height: responsiveScreenHeight(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(Home);
