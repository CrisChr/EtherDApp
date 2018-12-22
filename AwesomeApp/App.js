import React from 'react';
import { createAppContainer, createBottomTabNavigator} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import WalletContainer from './src/Main';
import Transfer from './src/componets/Transfer/View/TransferView';
import Account from './src/componets/Account/View/AccountView';

class WalletContainerScreen extends React.Component{
  render(){
    return(
      <WalletContainer/>
    )
  }
}

class TransferScreen extends React.Component {
  render(){
    return(
      <Transfer/>
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
    Wallet: {
      screen: WalletContainerScreen,
      navigationOptions: () => ({
        tabBarIcon: ({focused, tintColor}) => (
          <Ionicons name={focused ? 'ios-card' : 'ios-card-outline'} size={35} color={tintColor}/>
        )
      })
    },
    Transfer: {
      screen: TransferScreen,
      navigationOptions: () => ({
        tabBarIcon: ({focused, tintColor}) => (
          <Ionicons name={focused ? 'ios-cash' : 'ios-cash-outline'} size={35} color={tintColor}/>
        )
      })
    },
    Account: {
      screen: AccountScreen,
      navigationOptions: () => ({
        tabBarIcon: ({focused, tintColor}) => (
          <Ionicons name={focused ? 'ios-contact' : 'ios-contact-outline'} size={35} color={tintColor}/>
        )
      })
    }
  },
  {
    initialRouteName: 'Wallet', //Initial screen
    tabBarOptions: {
      showIcon: true
    }
  }
);

const Nav = createAppContainer(stackNav);

export default Nav;