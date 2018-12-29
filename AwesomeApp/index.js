/** @format */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import storage from './src/StorageConfig';
import globalVal from './src/GlobalValStorage';

if(!__DEV__){
  global.console = {
    info:() => {},
    log:() => {},
    warn:() => {},
    error:() => {}
  }
}

AppRegistry.registerComponent(appName, () => App);
