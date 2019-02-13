import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import LoginView from './Access/View/LoginPage'
import AppView from '../App'


class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ret: false,
      isLoading: true
    } 
    _isMounted = false;
  }

  // Fetch the token from storage then navigate to our appropriate place
  async componentDidMount() {
    //let that = this
    this._isMounted = true
    await storage.load({
      key: 'userinfo'
    }).then((ret) => {
      //console.log('ret: ', ret)
      if(this._isMounted){
        this.setState({
          ret: true,
          isLoading: false
        })
      }
    }).catch(err => {
      // 如果没有找到数据且没有sync方法，
      // 或者有其他异常，则在catch中返回
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          // TODO;
          break;
        case 'ExpiredError':
          // TODO
          break;
      }
    })
    this.props.navigation.navigate(this.state.ret ? 'App' : 'Auth');
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  // Render any loading content that you like here
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const auth = createAppContainer(createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  App: AppView,
  Auth: LoginView
},{
  initialRouteName: 'AuthLoading'
}))

export default auth