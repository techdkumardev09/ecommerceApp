import React from 'react';
import {LogBox, StyleSheet} from 'react-native';
import Home from './pages/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from './components/MyTabBar';
import ProductDetail from './pages/ProductDetail';
import CheckoutPage from './pages/CheckoutPage';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-redux';
import {store} from './redux/store';
import WishlistPage from './pages/WishlistPage';
import { PageName } from './helper/PageName';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Categories from './pages/Categories';
import AddAddress from './pages/AddAddress';
import ProfilePage from './pages/ProfilePage';
import SplashScreen from './pages/SplashScreen';
import OrderHistory from './pages/OrderHistory';

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

const BottomTabScreen = () => {
  return (
    <Tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      initialRouteName={PageName.HOME}>
      <Tab.Screen options={{headerShown: false}} name={PageName.HOME} component={Home} />
      <Tab.Screen
        options={{headerShown: false}}
        name={PageName.CATEGORY}
        component={Categories}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name={PageName.FAVOURITE}
        component={WishlistPage}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name={PageName.PROFILE}
        component={ProfilePage}
      />
    </Tab.Navigator>
  );
};

const StackNavigation = () => {
  return (
    <Stack.Navigator initialRouteName={PageName.SPLASH}>
      <Stack.Screen
        name={PageName.BOTTOMTAB}
        component={BottomTabScreen}
        options={{headerShown: false, title: PageName.BOTTOMTAB}}
      />
      <Stack.Screen
        name={PageName.SINGLEPRODUCT}
        component={ProductDetail}
        options={{headerShown: false, title: PageName.SINGLEPRODUCT}}
      />
      <Stack.Screen
        name={PageName.CHECKOUT}
        component={CheckoutPage}
        options={{headerShown: false, title: PageName.CHECKOUT}}
      />
      <Stack.Screen
        name={PageName.WISHLIST}
        component={WishlistPage}
        options={{headerShown: false, title: PageName.WISHLIST}}
      />
      <Stack.Screen
        name={PageName.LOGIN}
        component={Login}
        options={{headerShown: false, title: PageName.LOGIN}}
      />
      <Stack.Screen
        name={PageName.SIGNUP}
        component={Signup}
        options={{headerShown: false, title: PageName.SIGNUP}}
      />
       <Stack.Screen
        name={PageName.ADDRESS}
        component={AddAddress}
        options={{headerShown: false, title: PageName.ADDRESS}}
      />
      <Stack.Screen
        name={PageName.SPLASH}
        component={SplashScreen}
        options={{headerShown: false, title: PageName.SPLASH}}
      />
       <Stack.Screen
        name={PageName.HISTORY}
        component={OrderHistory}
        options={{headerShown: false, title: PageName.HISTORY}}
      />
    </Stack.Navigator>
  );
};




function App(): React.JSX.Element {
  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({});

export default App;
