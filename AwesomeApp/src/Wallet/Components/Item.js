import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default class Items extends React.Component {
  render(){
    let addressList = []
    let addresses = this.props.items
    if(addresses != null && addresses.length != 0){
      for(var i=0; i<addresses.length; i++){
        addressList.push(
         <Text key={i} style={styles.accountStyle}>Address {i+1}: {this.props.items[i]}</Text>
        )
      }
    }
    
    return (
      <View>{addressList}</View>
    )
  }
}

const styles = StyleSheet.create({
 accountStyle: {
   margin: 10,
   fontWeight: 'bold',
   fontSize: 15
 }
})