import React from 'react';
import {StyleSheet} from 'react-native';

import { List } from '@ant-design/react-native';
const Item = List.Item;

export default class AddressList extends React.Component {
  pushAddress(items){
    let addressList = [];
    if(items != null && items.length != 0){
      for(var i=0; i<items.length; i++){
        addressList.push(
          <Item key={i}>{items[i]}</Item>
        )
      }
    }
    return addressList;
  }

  render(){
    return (
      <List style={styles.accountStyle}>{this.pushAddress(this.props.items)}</List>
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