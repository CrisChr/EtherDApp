import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';
import { Button } from '@ant-design/react-native';
import {Card} from 'react-native-elements';
import {withNavigation} from 'react-navigation';
import 'ethers/dist/shims.js';
import { ethers } from 'ethers';
import { TextInput } from 'react-native-gesture-handler';

import AddressList from '../Components/AddressList';

class MnemonicContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mnemonic: '',
      addressArray: [],
      walletArray: [],
      account: 0,
      buttonDisabled: false
    }
  }
  
  walletList = []
  addressList = []
  accountKey = 0

  /*Initial the mnemonic word after the component mounted*/
  componentDidMount() {
    let newMnemonic = ethers.utils.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));
    this.setState({
      mnemonic: newMnemonic
    })
  }

  createAccount() {
    let wallet = ethers.Wallet.fromMnemonic(this.state.mnemonic, 'm/44\'/60\'/0\'/0/'+this.state.account);
    this.addressList.push(wallet.address)
    this.accountKey = this.state.account
    this.setState({
      buttonDisabled: true,
      addressArray: this.addressList,
      account: this.accountKey + 1,
    })
    global.globalVal.wallets.push(wallet)
    this.saveAddresses(wallet.address)
    //this.refreshMnemonic()

    this.setState({
      buttonDisabled: false
    })
  }

  refreshMnemonic() {
    //generate mnemonic word
    let newMnemonic = ethers.utils.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));
    this.setState({
      mnemonic: newMnemonic
    })
  }

  saveAddresses(address) {
    storage.save({
      key: 'newaddress',
      data: {
        nowaddress: address,
        addresslist: this.state.addressArray
      },
      expires: null
    })
    //console.log("add one address: ", this.walletList)
  }

  render(){
    return(
      <View style={{ margin: 10, flex: 1}}>
        <Card title="Mnemonic Words">
          <TextInput value={this.state.mnemonic} multiline = {true} style={styles.mnemonic} 
            onChangeText={(mnemonic) => this.setState({mnemonic})}/>
        </Card>
        <View style={{marginTop:10}}></View>
        <Button type='primary' onPress={() => this.createAccount()} disabled={this.state.buttonDisabled}>
          Create Account
        </Button>
        <ScrollView>
          <AddressList items={this.state.addressArray} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mnemonic: {
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'red'
  }
})

const MnemonicView = withNavigation(MnemonicContainer);

export default MnemonicView;