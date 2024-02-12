import React from 'react';
import {Image, TextInput, View, StyleSheet} from 'react-native';
import {COLOR} from '../styles/Color';
import {searchIcon} from '../assets';
import {FONTS} from '../styles/Fonts';

SearchBar = ({searchText,setSearchText}) => {
  return (
    <View>
      <TextInput
        value={searchText}
        onChangeText={setSearchText}
        style={styles.textInput}
        placeholderTextColor={'#8891A5'}
        placeholder="Search Products or store"
      />
      <Image source={searchIcon} style={styles.searchIcon} />
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 56,
    fontSize: 14,
    fontWeight: '500',
    color: COLOR.White,
    backgroundColor: COLOR.DarkBlue,
    borderRadius: 28,
    paddingLeft: 50,
    paddingRight: 20,
    fontFamily: FONTS.ManropeBold,
  },
  searchIcon: {position: 'absolute', left: 25, top: 20, height: 15, width: 15},
});

export default React.memo(SearchBar);