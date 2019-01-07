import React from 'react';
import {StyleSheet, Text, View, Picker} from 'react-native';
import { InputItem, Button, List } from '@ant-design/react-native';
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
        pickerValue: null
    }
  }

  provider = ethers.getDefaultProvider('ropsten')

  async getBalanceAndCount(wallet) {
    //get Ether testing network provider
    let activeWallet = wallet.connect(this.provider)

    //get address balance
    await activeWallet.getBalance('pending').then((balance) => {
      this.setState({
        etherString: ethers.utils.formatEther(balance, { commify: true })
      })
    }, (error) => {
      console.log(error)
    })

    //get address transaction count
    await activeWallet.getTransactionCount('pending').then((transactionCount) => {
      this.setState({
        transaction: transactionCount.toString()
      })
    }, (error) => {
      console.log(error)
    })
  }

  async emitTransaction(wallet) {
    let activeWallet = wallet.connect(this.provider)
    await activeWallet.sendTransaction({
      to: ethers.utils.getAddress(this.props.addresses[this.state.pickerValue]),
      value: ethers.utils.parseEther(this.state.number)
    }).then((tx) => {
      console.log(tx)
      alert('Success!')
    }, (error) => {
      console.log(error)
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
    let selectedWallet = walletList[selectedIndex]
    
    return (
      <View style={styles.input_group_tyle}>
        <List>
          <InputItem clear type='number' onChange={(text) => this.setState({text})}
            value={this.state.etherString} editable={false} placeholder='ether'>Balance:</InputItem>
          <InputItem clear type='number' onChange={(text) => this.setState({text})} 
            value={this.state.transaction} editable={false} style={{marginTop:10}}>Transfer count:</InputItem>
        </List>
        <View style={styles.button_style}>
          <Button type='primary' onPress={(wallet) => this.getBalanceAndCount(selectedWallet)}>Refresh</Button>
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
          <InputItem clear type="number" onChange={value => {
              this.setState({
                number: value,
              });
            }}
            value={this.state.number} placeholder='ether'>Value:</InputItem>
        </List>
        <View style={styles.button_style}>
          <Button type='warning' onPress={(wallet) => this.emitTransaction(selectedWallet)}>Transfer</Button>
        </View>
      </View>
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
  input_style: {
    width: 200, 
    borderColor: 'gray', 
    borderWidth: 1,
    marginLeft: 10
  },
  button_style: {
    marginTop: 10, 
    width:100, 
    marginLeft: 300
  }
})