import React from 'react';
import {StyleSheet, Text, View, Picker} from 'react-native';
import { InputItem, Button, List, Toast, Provider } from '@ant-design/react-native';
import 'ethers/dist/shims.js';
import { ethers } from 'ethers';
import ignoreWarnings from 'react-native-ignore-warnings';

ignoreWarnings('Setting a timer');

export default class Balance extends React.Component {
  constructor(props){
    super(props)
    this.state = {
        etherString: '',
        transaction: '',
        number: '',
        pickerValue: null,
        refreshBtn: false,
        transferBtn: false
    }
  }

  async getBalanceAndCount(address) {
    this.setState({
      refreshBtn: true,
      transferBtn: true
    })
    await Toast.loading('Loading...', 0.2, undefined, true)
    let provider = new ethers.providers.EtherscanProvider('ropsten');
    //console.log('refresh address: ', address)
    //get address balance
    await provider.getBalance(address).then((balance) => {
      this.setState({
        etherString: ethers.utils.formatEther(balance, { commify: true })
      })
    }, (error) => {
      console.log(error)
    })

    //get address transaction count
    await provider.getTransactionCount(address).then((transactionCount) => {
      this.setState({
        transaction: transactionCount.toString()
      })
    }, (error) => {
      console.log(error)
    })
    this.setState({
      refreshBtn: false,
      transferBtn: false
    })
  }

  async emitTransaction(address, wallet) {
    this.setState({
      refreshBtn: true,
      transferBtn: true
    })

    await Toast.loading('Transfer ether...', 2, undefined, true)
    let provider = new ethers.providers.EtherscanProvider('ropsten');

    // console.log('wallets: ', this.props.wallets)
    // console.log('selected address: ', address)
    // console.log('selected wallet: ', this.props.wallets[this.state.pickerValue])

    let privateKey = wallet.signingKey.privateKey
    let activeWallet = new ethers.Wallet(privateKey, provider)
    // console.log('private key wallet: ', wallet)

    await activeWallet.sendTransaction({
      to: ethers.utils.getAddress(this.props.addresses[this.state.pickerValue]),
      value: ethers.utils.parseEther(this.state.number)
    }).then((tx) => {
      // console.log(tx)
      Toast.success('Load success !!!', 1);
    }, (error) => {
      console.log(error)
    })
    this.setState({
      refreshBtn: false,
      transferBtn: false
    })
  }

  renderPicker(key, i) {
    return (
      <Picker.Item key={i} label={key} value={i}/>
    )
  }

  render(){
    let selectedIndex = this.props.selected
    let addressList = this.props.addresses
    let walletList = this.props.wallets
    if(selectedIndex == null) selectedIndex = 0
    let selectedAddress = addressList[selectedIndex]
    let selectedWallet = walletList[selectedIndex]
    
    return (
      <Provider>
        <View style={styles.input_group_tyle}>
          <List>
            <InputItem clear type='number' onChange={(text) => this.setState({text})}
              value={this.state.etherString} editable={false} placeholder='ether'>Balance:</InputItem>
            <InputItem clear type='number' onChange={(text) => this.setState({text})} 
              value={this.state.transaction} editable={false} style={{marginTop:10}}>Transfer count:</InputItem>
          </List>
          <View style={styles.button_style}>
            <Button type='primary' onPress={(wallet) => this.getBalanceAndCount(selectedAddress)} 
              disabled={this.state.refreshBtn}>
              Refresh
            </Button>
          </View>
          <View>
            <Text style={styles.title_tyle}>Target Address:</Text>
            <Picker style={styles.pickerstyle} selectedValue={this.state.pickerValue}
              onValueChange={(itemValue, itemIndex) => this.setState({pickerValue:itemValue})}>
                {
                  addressList.map((key, i) => this.renderPicker(key, i))
                }
            </Picker>
          </View>
          <List>
            <InputItem clear type="number" onChange={value => this.setState({number: value})}
              value={this.state.number} placeholder='ether'>Value:</InputItem>
          </List>
          <View style={styles.button_style}>
            <Button type='warning' onPress={(wallet) => this.emitTransaction(selectedAddress, selectedWallet)}
              disabled={this.state.transferBtn}>
              Transfer
            </Button>
          </View>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  input_group_tyle: {
    marginTop: 10, 
    flex: 1 
  },
  title_tyle: {
    fontWeight: 'bold'
  },
  button_style: {
    marginTop: 10, 
    width:100, 
    marginLeft: 240
  }
})