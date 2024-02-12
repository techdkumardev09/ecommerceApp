import React from 'react';
import {
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  category,
  categorySelected,
  heart,
  home,
  homeSelected,
  user,
} from '../assets';
import {FONTS} from '../styles/Fonts';
import { PageName } from '../helper/PageName';

const renderBottomTabIcons = (iconIndex, isFocused) => {
  switch (iconIndex) {
    case 0:
      return (
        <>
          {isFocused ? (
            <View style={styles.selectedIconMainView}>
              <View style={styles.selectedImageWrapper}>
                <Image
                  resizeMode={'contain'}
                  source={homeSelected}
                  style={[
                    styles.homeIcons,
                    {tintColor: '#E0B420', height: 18, width: 18},
                  ]}
                />
              </View>
            </View>
          ) : (
            <>
              <Image
                resizeMode={'contain'}
                source={home}
                style={styles.homeIcons}
              />
              <Text style={[styles.icontext]}>{PageName.HOME}</Text>
            </>
          )}
        </>
      );
    case 1:
      return (
        <>
          {isFocused ? (
            <View style={styles.selectedIconMainView}>
              <View style={styles.selectedImageWrapper}>
                <Image
                  resizeMode={'contain'}
                  source={categorySelected}
                  style={[styles.homeIcons, {tintColor: '#E0B420'}]}
                />
              </View>
            </View>
          ) : (
            <>
              <Image
                resizeMode={'contain'}
                source={category}
                style={styles.homeIcons}
              />
              <Text style={[styles.icontext]}>{PageName.CATEGORY}</Text>
            </>
          )}
        </>
      );
    case 2:
      return (
        <>
          {isFocused ? (
            <View style={styles.selectedIconMainView}>
              <View style={styles.selectedImageWrapper}>
                <Image
                  resizeMode={'contain'}
                  source={heart}
                  style={[styles.homeIcons, {tintColor: '#E0B420'}]}
                />
              </View>
            </View>
          ) : (
            <>
              <Image
                resizeMode={'contain'}
                source={heart}
                style={styles.homeIcons}
              />
              <Text style={[styles.icontext]}>{PageName.FAVOURITE}</Text>
            </>
          )}
        </>
      );
    case 3:
      return (
        <>
          {isFocused ? (
            <View style={styles.selectedIconMainView}>
              <View style={styles.selectedImageWrapper}>
                <Image
                  resizeMode={'contain'}
                  source={user}
                  style={[styles.homeIcons, {tintColor: '#E0B420'}]}
                />
              </View>
            </View>
          ) : (
            <>
              <Image
                resizeMode={'contain'}
                source={user}
                style={[styles.homeIcons]}
              />
              <Text style={[styles.icontext]}>{PageName.PROFILE}</Text>
            </>
          )}
        </>
      );
    default:
      break;
  }
};

MyTabBar = ({state, descriptors, navigation}) => {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      {state.routes.map((route, index) => {
        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          navigation.navigate(route.name);
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };
        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityStates={isFocused ? ['selected'] : []}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.outerContainer}>
            <View style={styles.tabContainer}>
              {renderBottomTabIcons(index, isFocused, navigation, route)}
            </View>
          </TouchableOpacity>
        );
      })}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: Platform.OS === 'ios' ? 90 : 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
  },
  tabContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    borderRadius: 16,
  },
  outerContainer: {
    height: 60,
    paddingTop: Platform.OS === 'ios' ? 5 : 0,
    flex: 1,
  },
  homeIcons: {
    width: 24,
    height: 24,
    tintColor: 'black',
  },
  icontext: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: FONTS.ManropeRegular,
    color: '#8891A5',
  },
  selectedIconMainView: {
    backgroundColor: 'white',
    marginTop: -50,
    height: 60,
    width: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedImageWrapper: {
    backgroundColor: '#1E222B',
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default React.memo(MyTabBar);
