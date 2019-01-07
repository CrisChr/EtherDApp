import React from 'react';
import {StyleSheet} from 'react-native';

import { List } from '@ant-design/react-native';
const Item = List.Item;

export default class AddressList extends React.Component {
  render(){
    let addressList = []
    let addresses = this.props.items
    if(addresses != null && addresses.length != 0){
      for(var i=0; i<addresses.length; i++){
        addressList.push(
         <Item key={i}>{addresses[i]}</Item>
        )
      }
    }
    
    return (
      <List style={styles.accountStyle}>{addressList}</List>
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