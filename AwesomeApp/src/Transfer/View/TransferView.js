import React from 'react';
import {StyleSheet, Text, View, Picker} from 'react-native';
import {withNavigation} from 'react-navigation';

import Balance from '../Components/Balance'

class TransferView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      pickerValue: null
    }
  }
  
  renderPicker(key, i) {
    return (
      <Picker.Item key={i} label={key} value={i}/>
    )
  }

  render(){
    let {navigation} = this.props
    let addresses = navigation.getParam('address_list', ['No avalibal address!'])
    let wallets = navigation.getParam('wallet_list', 'No avalibal Wallet!');
    return(
      <View style={{flex: 1}}>
        <View style={{marginTop: 10}}>
          <Text style={styles.titlestyle}>Select your address:</Text>
          <Picker style={styles.pickerstyle} selectedValue={this.state.pickerValue}
            onValueChange={(itemValue, itemIndex) => this.setState({pickerValue:itemValue})}>
              {
                addresses.map((key, i) => this.renderPicker(key, i))
              }
          </Picker>
        </View>
        <Balance selected={this.state.pickerValue} wallets={wallets} addresses={addresses}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  titlestyle: {
    fontWeight: 'bold'
  },
  pickerstyle: {
    width: 420,
  },
})

const Transfer = withNavigation(TransferView)

export default Transfer