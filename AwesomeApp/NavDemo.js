import React from 'react';
import {StyleSheet, Text, View, Button, Image} from 'react-native';
import { createAppContainer, createBottomTabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

import HomeContainer from './FirstPage';
import Friends from './Friends';
import Account from './Account';

class HomeContainerScreen extends React.Component{
  render(){
    return(
      <HomeContainer/>
    )
  }
}

class FriendsScreen extends React.Component {
  render(){
    return(
      <Friends/>
    )
  }
}

class AccountScreen extends React.Component {
  render(){
    return(
      <Account/>
    )
  }
}

const stackNav = createBottomTabNavigator(
  {
    Home: {
      screen: HomeContainerScreen,
      tabBarIcon: ({focused, horizontal, tintColor}) => (
          focused ? <Image source={require('./img/home_active.png')} style={{ height: 30, width: 30, tintColor: 'white'}}/>
            : <Image source={require('./img/home_inactive.png')} style={{ height: 30, width: 30, tintColor: 'white'}}/>
      )
    },
    Friends: FriendsScreen,
    Account: AccountScreen,
  },
  {
    initialRouteName: 'Home', //Initial screen
    tabBarOptions: {
      showIcon: true
    }
  }
);

const Nav = createAppContainer(stackNav);

/*const styles = StyleSheet.create({
  icon: {
    height: 26,
    width: 26
  }
});*/

export default Nav;