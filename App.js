import React from 'react';
import { createAppContainer, createBottomTabNavigator} from 'react-navigation';
import { AsyncStorage } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';

import WalletContainer from './src/Wallet/View/MnemonicView';
import TransferContainer from './src/Transfer/View/TransferView';
import AccountContainer from './src/Account/View/AccountView';

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
      <TransferContainer/>
    )
  }
}

class AccountScreen extends React.Component {
  render(){
    return(
      <AccountContainer/>
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
        ),
      })
    },
    Transfer: {
      screen: TransferScreen,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) => (
          <Ionicons name={focused ? 'ios-cash' : 'ios-cash-outline'} size={35} color={tintColor}/>
        ),
        tabBarOnPress: () => {
          //load user name from storage
          storage.load({
            key: 'userinfo'
          }).then((ret) => {
            AsyncStorage.getItem(ret.user_name+'=wallet', (err, res) => {
              if(err){
                console.log('app wallet err: ', err)
              }else{
                let result = JSON.parse(res)
                if(result == null || result.addresses == [] || result.wallets == []){
                  alert('Please create your wallets')
                }else{
                  navigation.navigate('Transfer', {
                    address_list: result.addresses,
                    wallet_list: result.wallets
                  })
                }
              }
            })
          })
        }
      })
    },
    Account: {
      screen: AccountScreen,
      navigationOptions: ({navigation}) => ({
        tabBarIcon: ({focused, tintColor}) => (
          <Ionicons name={focused ? 'ios-contact' : 'ios-contact-outline'} size={35} color={tintColor}/>
        ),
      })
    }
  },
  {
    initialRouteName: 'Wallet', //Initial screen
    backBehavior: 'none',
    tabBarOptions: {
      showIcon: true
    }
  }
);

export default stackNav;