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

  async getBalance(selectedAddr) {
    //console.log("address: ", selectedAddr)
    let provider = ethers.getDefaultProvider('ropsten');
    provider.getBalance(selectedAddr).then((balance) => {
      this.ethers = ethers.utils.formatEther(balance, { commify: true })
      this.setState({
        etherString: this.ethers
      })
      //console.log("Balance: ", this.ethers)
    })
    
  }

  render(){
    let selectedIndex = this.props.selected
    let addrList = this.props.list
    if(selectedIndex == null) selectedIndex = 0
    let selectedAddr = addrList[selectedIndex]
    return (
      <View style={styles.buttonstyle}>
        <View>
          <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}} onChangeText={(text) => this.setState({text})}
            value={this.state.etherString} editable={false}/>
          <Text>{"ether"}</Text>
        </View>
        
        <Button title='Refresh' onPress={(addr) => this.getBalance(selectedAddr)}/>
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