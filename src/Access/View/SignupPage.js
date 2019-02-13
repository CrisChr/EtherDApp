import React from 'react';
import {StyleSheet, View, Text, AsyncStorage} from 'react-native';
import { Button, Provider, Toast, InputItem, Icon } from '@ant-design/react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import md5 from 'md5'

import AppView from '../../../App';

class SignupPage extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      username: '',
      password: '',
      rpassword: '',
      textNotice: '',
      passwordNotice: '',
      rpasswordNotice: ''
    }
  }

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
      case 'rpass':
        if(this.state.rpassword == ''){
          this.setState({
            rpasswordNotice: 'Please re-enter your password'
          })
        }else{
          this.setState({
            rpasswordNotice: ''
          })
        }
        break;
      default:
        break;
    }
  }

  async signUpAction() {
    let userName = this.state.username
    let passWord = this.state.password
    let rpassWord = this.state.rpassword
    if(userName != '' && passWord != '' && rpassWord != ''){
      if(passWord === rpassWord){
        let usercode = md5(userName+passWord)
        AsyncStorage.getItem(userName, (err, res) => {
          if(err){
            console.log('load user err in Sign up: ', err)
          }else if(res){
            Toast.fail('Your user name has registed!', 2, undefined, true)
          }else{
            AsyncStorage.setItem(userName, usercode, (err) => {
              if(err){
                console.log('sign up err: ', err)
              }else{
                Toast.success('Sign up successfully!', 2, undefined, true)
                storage.save({
                  key: 'userinfo',
                  data: {
                    user_name: userName,
                    user_password: passWord
                  },
                  expires: 1000 * 60 * 2
                })
                this.props.navigation.navigate('AppView')
              }
            })
          }
        })
      }else{
        this.setState({
          rpasswordNotice: 'Password wrong!'
        })
      }
    }else{
      await Toast.fail('Sign up failed!', 2, undefined, true)
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

        <InputItem clear type='password' value={this.state.rpassword} onChange={value => this.setState({rpassword: value})}
          placeholder='re-enter your password' editable={true} maxLength={10} style={{width:350,marginTop:10}} onBlur={() => this.onBlurCall('rpass')}>
          <Icon name='lock' size='sm' style={{marginTop:10}}/>
        </InputItem>
        <Text style={{color:'red'}}>{this.state.rpasswordNotice}</Text>

        <Button type='ghost' size='large' onPress={() => this.signUpAction()} style={{width:380, marginTop:35}}>
          Confirm
        </Button>
      </View>
    </Provider>
    )
  }
}


const Signup = createStackNavigator({
  SignupView: {
    screen: SignupPage,
    navigationOptions: {
      header: null
    }
  },
  AppView: {
    screen: AppView,
    navigationOptions: {
      header: null
    }
  }
});

const SignupView = createAppContainer(Signup)

export default SignupView;