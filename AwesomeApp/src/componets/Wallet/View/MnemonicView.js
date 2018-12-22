import React from 'react';
import {StyleSheet, Text, View, Alert, Button, ScrollView} from 'react-native';
import {Card} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import 'ethers/dist/shims.js';
import { ethers } from 'ethers';
import { TextInput } from 'react-native-gesture-handler';

class MnemonicContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mnemonic: '',
      address: '',
      initialAccount: 0,
      createButton: false
    }
  }

  provider = null
  addressList = []
  key = 0
  activeWallet = null

  /*Initial the mnemonic word after the component mounted*/
  async componentDidMount() {
    let newMnemonic = ethers.utils.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));
    this.setState({
      mnemonic: newMnemonic
    })
    //get Ether network provider
    this.provider = ethers.getDefaultProvider('ropsten');
  }

  createAccount() {
    let wallet = ethers.Wallet.fromMnemonic(this.state.mnemonic, 'm/44\'/60\'/0\'/0/'+this.state.initialAccount);
    this.key = this.state.initialAccount
    this.addressList.push(wallet.address)
    this.setState({
      address: this.addressList,
      createButton: true,
      initialAccount: this.key + 1
    })
    this.activeWallet = wallet.connect(this.provider); //Connect to Ether test network (ropsten test network)

    //get the address balance
    this.activeWallet.getBalance().then((balance) => {
      let Accountbalance = ethers.utils.formatEther(balance)
      //Alert.alert(Accountbalance)
    }, (error) => {
      Alert.alert('error')
    });
  }

  refreshMnemonic() {
    //generate mnemonic word
    let newMnemonic = ethers.utils.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));
    this.setState({
      mnemonic: newMnemonic,
      initialAccount: this.key + 1,
      createButton: false
    })
  }

  render(){
    return(
      <View style={{ margin: 10, flex: 1}}>
        <Card title="Mnemonic Words">
          <TextInput value={this.state.mnemonic} multiline = {true} style={styles.mnemonic} 
            onChangeText={(mnemonic) => this.setState({mnemonic})}/>
        </Card>
        <View style={{marginTop:10}}></View>
        <Button onPress={() => this.refreshMnemonic()} title="Refresh Mnemonic Word" color='#f39800'/>
        <View style={{marginTop:10}}></View>
        <Button onPress={() => this.createAccount()} title="Create Account" disabled={this.state.createButton}/>
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
   fontWeight: 'bold',
   fontSize: 15
 }
})

const MnemonicView = withNavigation(MnemonicContainer);

export default MnemonicView;