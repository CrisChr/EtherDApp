import React from 'react';
import {StyleSheet, Text, View, Alert, Button, ScrollView} from 'react-native';
import {Card} from 'react-native-elements';
import {createStackNavigator, withNavigation, createAppContainer } from 'react-navigation';
import 'ethers/dist/shims.js';
import { ethers } from 'ethers';

export default class WalletContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mnemonic: '',
      address: '',
      initialAccount: 0
    }
  }

  addressList = []
  key = 0

  async componentWillMount() {
    let newMnemonic = ethers.utils.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));
    this.setState({
      mnemonic: newMnemonic
    })
  }

  createAccount() {
    let wallet = ethers.Wallet.fromMnemonic(this.state.mnemonic, 'm/44\'/60\'/0\'/0'+this.state.initialAccount);
    this.key = this.state.initialAccount
    this.addressList.push(wallet.address)
    this.setState({
      address: this.addressList,
      initialAccount: this.key + 1
    })
  }

  refreshMnemonic() {
    let newMnemonic = ethers.utils.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));
    this.setState({
      mnemonic: newMnemonic
    })
  }

  render(){
    return(
      <View style={{ margin: 20, flex: 1}}>
        <Card title="Mnemonic Words">
          <Text style={styles.mnemonic}>
            {this.state.mnemonic}
          </Text>
        </Card>
        <View style={{marginTop:20}}></View>
        <Button onPress={() => this.refreshMnemonic()} title="Refresh Mnemonic Word"/>
        <View style={{marginTop:20}}></View>
        <Button onPress={() => this.createAccount()} title="Create Account" style={styles.button}/>
        <ScrollView>
          <Items items={this.state.address} />
        </ScrollView>
      </View>
    )
  }
}

class Items extends React.Component {
  render(){
    let addressList = []
    for(var i=0; i<this.props.items.length; i++){
      addressList.push(
       <Text key={i} style={styles.accountStyle}>Address {i+1}: {this.props.items[i]}</Text>
      )
    }
    return (
      <View>{addressList}</View>
    )
  }
}

const styles = StyleSheet.create({
 mnemonic: {
   fontWeight: 'bold',
   color: 'red',
   textAlign: 'center'
 },
 accountStyle: {
   margin: 10,
   fontWeight: 'bold'
 }
})