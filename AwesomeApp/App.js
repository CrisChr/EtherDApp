import React from 'react';
import { createAppContainer, createBottomTabNavigator, Alert} from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';

import WalletContainer from './src/Main';
import Transfer from './src/Transfer/View/TransferView';
import Account from './src/Account/View/AccountView';

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
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) => (
          <Ionicons name={focused ? 'ios-cash' : 'ios-cash-outline'} size={35} color={tintColor}/>
        ),
        tabBarOnPress: () => {
          storage.load({
            key: 'newaddress',
            autoSync: true,
            syncInBackground: true,
          }).then(ret => {
            let newAddressList = []
            newAddressList = ret.addresslist
            let newAddress = ret.nowaddress
            if(!newAddressList.includes(newAddress)) {
              newAddressList.push(newAddress)
            }
            
            console.log("add new addresses: ", newAddressList)
            navigation.navigate('Transfer', {content: newAddressList})
          }).catch(err => {
            console.log(err.message);
            switch (err.name) {
              case 'NotFoundError':
                // 更新
                console.log('nononoononono')
                break;
              case 'ExpiredError':
                // TODO
                break;
            }
          }) 
        }
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