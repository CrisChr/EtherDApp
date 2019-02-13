import React from 'react';
import {StyleSheet, View, ScrollView, Text, AsyncStorage} from 'react-native';
import { Button, Toast, Provider } from '@ant-design/react-native';
import {Card} from 'react-native-elements';
import 'ethers/dist/shims.js';
import { ethers } from 'ethers';
import { TextInput } from 'react-native-gesture-handler';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import AddressList from '../Components/AddressList';

class MnemonicView extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mnemonic: '',
      addressArray: [],
      walletArray: [],
      account: 0,
      buttonDisabled: false,
      userExist: false
    }
  }
  accountKey = 0
  userName = ''

  /*Initial the mnemonic word after the component mounted*/
  componentDidMount() {
    let newMnemonic = ethers.utils.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));
    this.setState({
      mnemonic: newMnemonic //'approve online alpha body gas beyond win hair method pool half length'
    })

    storage.load({
      key: 'userinfo'
    }).then(ret => {
      this.userName = ret.user_name
      AsyncStorage.getItem(ret.user_name+'=wallet', (err, res) =>{
        if(res != undefined){
          this.setState({
            userExist: true
          })
        }
      })
    })
  }

  createWallet() {
    let wallet = ethers.Wallet.fromMnemonic(this.state.mnemonic, 'm/44\'/60\'/0\'/0/'+this.state.account);
    return new Promise(function(resolve, reject){
      if(wallet){
        resolve(wallet)
      }else{
        reject(error)
      }
    })
  }

  async createAccount() {
    this.setState({
      buttonDisabled: true
    })
    await Toast.loading('Loading...', 0.1, undefined, true)
    await this.createWallet().then((wallet) => {
      global.globalVal.addressList.push(wallet.address)
      global.globalVal.walletList.push(wallet)
      this.accountKey = this.state.account
      this.setState({
        addressArray: global.globalVal.addressList,
        walletArray: global.globalVal.walletList,
        account: this.accountKey + 1,
        buttonDisabled: false
      })
      this.saveAddresses(wallet.address, wallet)
    }, (error) => {
      console.log(error)
    })
  }

  saveAddresses(address, wallet) {
    //save address and address list to db
    if(this.state.userExist){
      AsyncStorage.getItem(this.userName+'=wallet', (err, res) => {
        if(err){
          console.log('get wallet err: ', err)
        }else{
          let walletinfo = JSON.parse(res)
          if(!walletinfo.addresses.includes(address)){
            walletinfo.addresses.push(address)
            walletinfo.wallets.push(wallet)
          }
          AsyncStorage.setItem(this.userName+'=wallet', JSON.stringify(walletinfo), (err) => {
            if(err){
              console.log('update wallet err: ', err)
            }
          })
        }
      })
    }else{
      let walletsInfo = {
        addresses: this.state.addressArray,
        wallets: this.state.walletArray
      }
      AsyncStorage.setItem(this.userName+'=wallet', JSON.stringify(walletsInfo), (err) => {
        if(err){
          console.log('some err when create wallet: ', err)
        }else{
          this.setState({
            userExist: true
          })
        }
      })
    }
  }

  render(){
    return(
      <Provider>
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
      </Provider>
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

const Mnemonic = createStackNavigator({
  MnemonicView: {
    screen: MnemonicView,
    navigationOptions:{
      header: null
    }
  }
})

const MnemonicContainer = createAppContainer(Mnemonic)

export default MnemonicContainer;