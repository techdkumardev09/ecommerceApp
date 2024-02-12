/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './helper/mock';

AppRegistry.registerComponent(appName, () => App);
