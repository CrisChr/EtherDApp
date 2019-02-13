import React from 'react';
import {StyleSheet, View, Text, AsyncStorage} from 'react-native';
import { Button, Provider, Toast, InputItem, Icon } from '@ant-design/react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import md5 from 'md5'

import AppView from '../../../App';
import SignupView from './SignupPage';

class LoginPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      textNotice: '',
      passwordNotice: '',
      isLogin: false,
      animating: false
    }
  }

  // componentWillMount(){
  //   storage.load({
  //     key: 'userinfo'
  //   }).then(ret => {
  //     console.log('user name: ', ret.user_name)
  //     if(ret.user_name != ''){
  //       AsyncStorage.getItem(ret.user_name+'=isLogin', (err, res) => {
  //         if(res == 'true'){
  //           this.setState({
  //             isLogin: res,
  //             username: ret.user_name,
  //             password: ret.user_password
  //           })
  //         }
  //       })
  //     }
  //   })
  // }

  onBlurCall(type){
    switch (type) {
      case 'text':
        if(this.state.username == ''){
          this.setState({
            textNotice: 'Please enter your email address'
          })
        }else{
          this.setState({
            textNotice: ''
          })
        }
        break;
      case 'pass':
        if(this.state.password == ''){
          this.setState({
            passwordNotice: 'Please enter your password'
          })
        }else{
          this.setState({
            passwordNotice: ''
          })
        }
        break;
      default:
        break;
    }
  }

  async loginAction() {
    let userName = this.state.username
    let passWord = this.state.password
    
    if(userName != '' && passWord != ''){
      let usercode = md5(userName+passWord)
      AsyncStorage.getItem(userName, (err, res) => {
        if(err){
          console.log('some err in log in: ', err)
        }else if(res == usercode){
          Toast.success('Log in successfully', 2, undefined, true)
          storage.save({
            key: 'userinfo',
            data: {
              user_name: userName,
              user_password: passWord
            },
            expires: 1000 * 60 * 2
          })
          this.props.navigation.navigate('AppView')
        }else{
          Toast.fail('You have not registered!', 2, undefined, true)
        }
      })
    }else{
      Toast.fail('Log in failed!', 2, undefined, true)
    }
  }

  render(){
    return(
    <Provider>
       <View style={{flex:1, justifyContent: 'center', alignItems:'center'}}>
        <InputItem clear type='email-address' value={this.state.username} onChange={value => this.setState({username: value})} 
          placeholder="Email address" editable={true} style={{width:350}} maxLength={20} onBlur={() => this.onBlurCall('text')}>
          <Icon name='user' size='sm'/>
        </InputItem>
        <Text style={{color:'red'}}>{this.state.textNotice}</Text>
          
        <InputItem clear type='password' value={this.state.password} onChange={value => this.setState({password: value})}
          placeholder='Password' editable={true} maxLength={10} style={{width:350,marginTop:10}} onBlur={() => this.onBlurCall('pass')}>
          <Icon name='lock' size='sm' style={{marginTop:10}}/>
        </InputItem>
        <Text style={{color:'red'}}>{this.state.passwordNotice}</Text>

        <Button type='primary' size='large' onPress={() => this.loginAction()} style={{width:380, marginTop:35}}>
          Log in
        </Button>
        <Button type='ghost' size='large' onPress={() => this.props.navigation.navigate('SignupView')} style={{width:380, marginTop:35}}>
          Sign up
        </Button>
       </View>
    </Provider>
    )
  }
}

const Login = createStackNavigator({
  LoginView: {
    screen: LoginPage,
    navigationOptions:{
      header: null, 
    }
  },
  SignupView: {
    screen: SignupView,
    navigationOptions:{
      header: null,
    }
  },
  // AppView: {
  //   screen: AppView,
  //   navigationOptions: {
  //     header: null,
  //   }
  // }
})

//const LoginView = createAppContainer(Login);

export default Login;