/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useMemo, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import DropDown from '../components/DropDown';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import useApi from '../CustomHook/useApi';
import {ProductListItem} from '../components/ProductListItem';
import {useNavigation} from '@react-navigation/native';
import {COLOR} from '../styles/Color';

function Categories() {
  const navigation = useNavigation();
  const [filterType, setFilterType] = useState(null);
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

  const categoriesData = useMemo(() => {
    let category = productData.map(item => {
      return item.category;
    });

    let uniqueCategory = [...new Set(category)];
    
    uniqueCategory = uniqueCategory.map((item)=> {
      return {label: item,value:item}
    })

    uniqueCategory = [{label:'All',value:''},...uniqueCategory]
    return uniqueCategory
  }, [productData]);

  const getProductData = useMemo(() => {
    if (filterType && filterType.value) {
      return productData.filter(item => item.category === filterType.value);
    } else {
      return productData;
    }
  }, [productData, filterType]);

  return (
    <View
      style={styles.mainView}>
      <View style={styles.widthNinety}>
        <DropDown
          value={filterType}
          setValue={setFilterType}
          data={categoriesData}
          width={'100%'}
          title={'Categories'}
        />
        <FlatList
          removeClippedSubviews={true}
          keyExtractor={item => item.id.toString()}
          style={styles.productFlatlistView}
          contentContainerStyle={{paddingBottom:70}}
          numColumns={2}
          showsVerticalScrollIndicator={false}
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
    </View>
  );
}

const styles = StyleSheet.create({
  mainView:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLOR.DarkBlue,
    paddingTop: 30,
  },
  widthNinety:{width: responsiveScreenWidth(90)},
  productFlatlistView: {
    width: responsiveScreenWidth(95),
    marginTop: 20,
    paddingBottom:40
  },
});

export default React.memo(Categories);
