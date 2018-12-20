import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {createStackNavigator, createAppContainer,  withNavigation} from 'react-navigation';

import MnemonicView from './MnemonicHome';
import KeyStoreView from './KeyStoreHome';

class FirstPage extends React.Component {
  render(){
    return(
      <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
        <View>
          <Button title='Create address by mnemonic word' onPress={() => this.props.navigation.navigate('MnemonicView')}/>
        </View>
        <View style={{marginTop:20}}>
          <Button title='Create address by importing key store file' onPress={() => this.props.navigation.navigate('KeyStoreView')} color='green'/>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttons: {
    marginTop: 20
  }
})

const HomeNav = createStackNavigator(
  {
    FirstPageView: FirstPage,
    MnemonicView: MnemonicView,
    KeyStoreView: KeyStoreView
  }
)

const WalletContainer = createAppContainer(HomeNav);

export default WalletContainer;