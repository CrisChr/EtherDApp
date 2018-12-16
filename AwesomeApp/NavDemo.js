import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import { createAppContainer, createBottomTabNavigator} from 'react-navigation';

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
    Home: HomeContainerScreen,
    Friends: FriendsScreen,
    Account: AccountScreen,
  },
  {
    initialRouteName: 'Home', //Initial screen
    tabBarOptions: {
      activeTintColor: '#000000',
      activeBackgroundColor: '#d6ecf0'
    }
  }
);

const Nav = createAppContainer(stackNav);

export default Nav;