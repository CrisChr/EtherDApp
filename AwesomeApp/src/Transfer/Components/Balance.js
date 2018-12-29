import React from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
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
        targetAddr: '',
        etherVal: ''
    }
  }

  getBalanceAndCount(wallet) {
    //get Ether testing network provider
    let activeWallet = wallet.connect(ethers.getDefaultProvider('ropsten'))

    //get address balance
    activeWallet.getBalance('pending').then((balance) => {
      this.setState({
        etherString: ethers.utils.formatEther(balance, { commify: true })
      })
    }, (error) => {
      console.log(error)
    })

    //get address transaction count
    activeWallet.getTransactionCount('pending').then((transactionCount) => {
      this.setState({
        transaction: transactionCount.toString()
      })
    }, (error) => {
      console.log(error)
    })
  }

  emitTransaction(wallet) {
    let activeWallet = wallet.connect(ethers.getDefaultProvider('ropsten'))
    activeWallet.sendTransaction({
      to: '0x405115cbf5266F3a19B708C1D1a22a28ed2b1638',
      value: ethers.utils.parseEther('0.5')
    }).then((tx) => {
      console.log(tx)
      alert('Success!')
    }, (error) => {
      console.log(error)
    })
  }

  render(){
    let selectedIndex = this.props.selected
    let walletList = this.props.wallets
    if(selectedIndex == null) selectedIndex = 0
    let selectedWallet = walletList[selectedIndex]
    
    return (
      <View style={styles.input_group_tyle}>
        <View>
          <Text style={styles.title_tyle}>Balance (ether):</Text>
          <TextInput style={styles.input_style} onChangeText={(text) => this.setState({text})}
            value={this.state.etherString} editable={false}/>
        </View>
        <View style={{marginTop:10}}>
          <Text style={styles.title_tyle}>Transfer count:</Text>
          <TextInput style={styles.input_style} onChangeText={(text) => this.setState({text})} 
            value={this.state.transaction} editable={false}/>
        </View>
        <View style={styles.button_style}>
          <Button title='Refresh' onPress={(wallet) => this.getBalanceAndCount(selectedWallet)}/>
        </View>
        <View>
          <Text style={styles.title_tyle}>Target Address:</Text>
          <TextInput style={{width:400, marginLeft:5, borderWidth:1}} onChangeText={(targetAddr) => this.setState({targetAddr})}
            value={this.state.targetAddr} editable={true}/>
        </View>
        <View style={{marginTop:10}}>
          <Text style={styles.title_tyle}>Value (ether):</Text>
          <TextInput style={styles.input_style} onChangeText={(etherVal) => this.setState({etherVal})}
            value={this.state.etherVal} editable={true}/>
        </View>
        <View style={styles.button_style}>
          <Button title='Transfer' onPress={(wallet) => this.emitTransaction(selectedWallet)} color='#ee7800'/>
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