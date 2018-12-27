import React from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
//import 'ethers/dist/shims.js';
import { ethers } from 'ethers';
// import ignoreWarnings from 'react-native-ignore-warnings';

// ignoreWarnings('Setting a timer');

export default class Balance extends React.Component {
  constructor(props){
      super(props)
      this.state = {
          etherString: ""
      }
  }

  ethers = ""

  async changeBalance(balance) {
    // this.setState({
    //     etherString: balance
    // })
    console.log("Balance: ",balance)
  }

  render(){
    let selectedIndex = this.props.selected
    let addrList = this.props.list
    let selectedAddr = addrList[selectedIndex]

    // let etherString=''
    // let provider = ethers.getDefaultProvider('ropsten');
    // provider.getBalance(selectedAddr).then(function(balance){
    //   etherString = ethers.utils.formatEther(balance, { commify: true })
    // }, (error) => {

    // })
    
    console.log("address: ", selectedAddr)
    let provider = ethers.getDefaultProvider('ropsten');
    provider.getBalance(selectedAddr).then(function(balance){
      this.ethers = ethers.utils.formatEther(balance, { commify: true })
      console.log("Balance: ", this.ethers)
    })
    return (
      <View style={styles.buttonstyle}>
        <TextInput/>
        <Button title='Refresh' onPress={() => this.getBalance()}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  buttonstyle: {
    marginTop: 10, 
    marginLeft:300, 
    flex:1, 
    width: 100, 
    height: 50, 
    justifyContent: 'flex-start'
  }
})