import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { withNavigation } from 'react-navigation';


class KeyStore extends React.Component {
 render(){

   const { navigation } = this.props;

   const detailContent = navigation.getParam('content', 'No');

   return(
     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
       <Text>{detailContent}</Text>
     </View>
   )
 }
}

const KeyStoreView = withNavigation(KeyStore);

export default KeyStoreView;