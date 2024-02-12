import React, {useCallback, useState} from 'react';
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {hidden, visible} from '../assets';
import {COLOR} from '../styles/Color';
import {FONTS} from '../styles/Fonts';

CustomTextInput = ({
  placeholder,
  isPasswordField,
  value,
  setValue,
  keyboardType,
}) => {
  const [hidePassword, setHidePassword] = useState(true);

  const togglePassword = useCallback(() => setHidePassword(prev => !prev), []);

  return (
    <View>
      <TextInput
        value={value}
        onChangeText={setValue}
        style={[styles.textInput, {paddingRight: isPasswordField ? 55 : 20}]}
        placeholderTextColor={COLOR.Blue}
        placeholder={placeholder}
        keyboardType={keyboardType ?? 'default'}
        secureTextEntry={isPasswordField ? hidePassword : false}
      />
      {isPasswordField && (
        <TouchableOpacity onPress={togglePassword} style={styles.eyeButton}>
          <Image
            source={hidePassword ? hidden : visible}
            style={styles.eyeIcon}
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {flex: 1, alignItems: 'center', backgroundColor: COLOR.White},
  textInput: {
    height: 56,
    fontSize: 14,
    fontWeight: '500',
    color: COLOR.DarkBlue,
    backgroundColor: COLOR.White,
    borderWidth: 2,
    borderColor: COLOR.DarkBlue,
    borderRadius: 28,
    paddingLeft: 25,
    fontFamily: FONTS.ManropeBold,
    marginVertical: 10,
  },
  eyeButton: {position: 'absolute', right: 30, top: 29, height: 20, width: 20},
  eyeIcon: {height: 20, width: 20, tintColor: COLOR.DarkBlue},
});

export default React.memo(CustomTextInput);
