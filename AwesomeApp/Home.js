import React from 'react';
import {StyleSheet, Text, View, Alert, Button} from 'react-native';
import {Card} from 'react-native-elements';
import {createStackNavigator, withNavigation, createAppContainer } from 'react-navigation';
import { ethers } from 'ethers';

export default class WalletContainer extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      mnemonic: ''
    }
  }

  async componentWillMount() {
    let newMnemonic = ethers.utils.HDNode.entropyToMnemonic(ethers.utils.randomBytes(16));
    this.setState({
      mnemonic: newMnemonic
    })
  }

  createWallet() {
    Alert.alert(this.state.mnemonic)
  }

  render(){
    return(
      <View style={{ padding: 20}}>
        <Card title="Mnemonic Words">
          <Text style={{ fontWeight: 'bold', color: 'red', textAlign: 'center'}}>
            These 12 words are the only way to restore your accounts. Save them somewhere safe and secret.
          </Text>
          <Text style={{ padding: 20}}></Text>
        </Card>
        <Button onPress={() => this.createWallet()} title="I've saved my words safely. Create wallet" style={{paddingTop: 20}}/>
      </View>
    )
  }
}

//const HomeView = withNavigation(HomeScreen);

//export default HomeView;