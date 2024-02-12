import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FONTS} from '../styles/Fonts';

ComingSoon = () => {
  return (
    <View style={styles.mainView}>
      <Text style={styles.comingSoonText}>
        Coming Soon!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView:{flex: 1, alignItems: 'center', justifyContent: 'center'},
  comingSoonText:{fontSize: 24, fontFamily: FONTS.ManropeExtaBold}
})

export default React.memo(ComingSoon);
