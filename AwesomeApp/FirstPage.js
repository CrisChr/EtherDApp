import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {createStackNavigator, createAppContainer } from 'react-navigation';

import HomeView from './Home';
import DetailsView from './Details';

class HomeViewScreen extends React.Component {
  render(){
    return(
      <HomeView/>
    )
  }
}

class DetailsViewScreen extends React.Component {
  render(){
    return(
      <DetailsView/>
    )
  }
}

const HomeNav = createStackNavigator(
  {
    HomeView: HomeViewScreen,
    DetailsView: DetailsViewScreen
  }
)

const WalletContainer = createAppContainer(HomeNav);

export default WalletContainer;