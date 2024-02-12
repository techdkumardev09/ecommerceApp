import {Dropdown} from 'react-native-element-dropdown';
import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {FONTS} from '../styles/Fonts';
import {COLOR} from '../styles/Color';

DropDown = ({title, width, data, value, setValue}) => {
  return (
    <View style={{marginTop: 20, width: width}}>
      <Text style={styles.title}>{title}</Text>
      <Dropdown
        placeholderStyle={styles.selectedTextStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={data}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={'Select'}
        value={value}
        onChange={setValue}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  placeholderStyle: {
    fontSize: 16,
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: COLOR.White,
    fontWeight: '500',
    fontFamily: FONTS.ManropeRegular,
  },
  title: {
    color: COLOR.LightGray,
    fontSize: 11,
    fontWeight: '800',
    fontFamily: FONTS.ManropeBold,
  },
});

export default React.memo(DropDown);
