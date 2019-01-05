import React from 'react';
import {View} from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';

import { Button } from '@ant-design/react-native';

import MnemonicView from './Wallet/View/MnemonicView';
import KeyStoreView from './Wallet/View/KeyStoreView';

class FirstPage extends React.Component {
  render(){
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
        <View>
          <Button type='ghost' onPress={() => this.props.navigation.navigate('MnemonicView')}>
            Create address by mnemonic word
          </Button>
        </View>
        <View style={{marginTop:20}}>
          <Button type='ghost' onPress={() => this.props.navigation.navigate('KeyStoreView')}>
            Create address by importing key store file
          </Button>
        </View>
      </View>
    )
  }
}

const HomeNav = createStackNavigator(
  {
    FirstPageView: FirstPage,
    MnemonicView: MnemonicView,
    KeyStoreView: KeyStoreView
  }
)

const WalletContainer = createAppContainer(HomeNav);

export default WalletContainer;