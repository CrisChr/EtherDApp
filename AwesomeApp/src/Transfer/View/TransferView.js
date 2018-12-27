import React from 'react';
import {StyleSheet, Text, View, Picker} from 'react-native';
import {withNavigation} from 'react-navigation';

import Balance from '../Components/Balance'

class TransferView extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      addressList: [],
      pickerValue: null
    }
  }

  componentDidMount() {
    /*storage.load({
      key: 'newaddress',

      // autoSync(默认为true)意味着在没有找到数据或数据过期时自动调用相应的sync方法
      autoSync: true,

      // syncInBackground(默认为true)意味着如果数据过期，
      // 在调用sync方法的同时先返回已经过期的数据。
      // 设置为false的话，则始终强制返回sync方法提供的最新数据(当然会需要更多等待时间)。
      syncInBackground: true,

      // 你还可以给sync方法传递额外的参数
      syncParams: {
        extraFetchOptions: {
          // 各种参数
        },
        someFlag: true,
      },
    }).then(ret => {
      // 如果找到数据，则在then方法中返回
      // 注意：这是异步返回的结果（不了解异步请自行搜索学习）
      // 你只能在then这个方法内继续处理ret数据
      // 而不能在then以外处理
      // 也没有办法“变成”同步返回
      // 你也可以使用“看似”同步的async/await语法

      // 更新data值
      this.setState({
        addressList: ret.addresslist
      });

    }).catch(err => {
      //如果没有找到数据且没有sync方法，
      //或者有其他异常，则在catch中返回
      console.warn(err.message);
      switch (err.name) {
        case 'NotFoundError':
          // 更新
          this.setState({
            addressList: []
          });

          break;
        case 'ExpiredError':
          // TODO
          break;
      }
    })*/
  }
  
  renderPicker(key, i) {
    return (
      <Picker.Item key={i} label={key} value={i}/>
    )
  }

  render(){
    let {navigation} = this.props
    let newAddress = navigation.getParam('content', ['No avalibal address'])
    return(
      <View style={{flex: 1}}>
        <View style={{marginTop: 10}}>
          <Text style={styles.titlestyle}>Select your address:</Text>
          <Picker style={styles.pickerstyle} selectedValue={this.state.pickerValue}
            onValueChange={(itemValue, itemIndex) => this.setState({pickerValue:itemValue})}>
              {
                newAddress.map((key, i) => this.renderPicker(key, i))
              }
          </Picker>
        </View>
        <Balance selected={this.state.pickerValue} list={newAddress}/>
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