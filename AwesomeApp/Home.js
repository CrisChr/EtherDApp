import React from 'react';
import {StyleSheet, Text, View, Alert, Button} from 'react-native';
import {Card} from 'react-native-elements';
import {createStackNavigator, withNavigation, createAppContainer } from 'react-navigation';
import { ethers } from 'ethers';

export default class WalletContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      mnemonic: '',
      walletAddress: ''
    }
  }

  async componentWillMount() {
    let newMnemonic = ethers.utils.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));
    this.setState({
      mnemonic: newMnemonic
    })
  }

  createWallet() {
    const basePath = "m/44’/60’/0’/0/0";
    const account = 0;
    this.setState({
      walletAddress: ethers.Wallet.fromMnemonic(this.state.mnemonic, basePath + account)
    })
  }

  render(){
    return(
      <View style={{ padding: 20}}>
        <Card title="Mnemonic Words">
          <Text style={{ fontWeight: 'bold', color: 'red', textAlign: 'center'}}>
            {this.state.mnemonic}
          </Text>
          <Text style={{ padding: 20}}></Text>
        </Card>
        <Button onPress={() => this.createWallet()} title="Create Account"/>
        <Text>{this.state.walletAddress}</Text>
      </View>
    )
  }
}

//const HomeView = withNavigation(HomeScreen);

//export default HomeView;