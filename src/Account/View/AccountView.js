import React from 'react';
import {Text, View, TouchableOpacity, AsyncStorage} from 'react-native';
import { Card } from '@ant-design/react-native';
import {withNavigation, createAppContainer, createStackNavigator} from 'react-navigation';

import LoginView from '../../Access/View/LoginPage'

class AccountView extends React.Component {
 constructor(props){
   super(props)
   this.state = {
     username: ''
   }
 }
 
 componentWillMount(){
   let that = this
   storage.load({
     key: 'userinfo'
   }).then((ret) => {
     if(ret.user_name != ""){
       that.setState({
         username: ret.user_name
       })
     }
   })
 }

 LogOutAction() {
  storage.remove({
    key: 'userinfo'
  });
  this.props.navigation.navigate('LoginView')
 }

 render(){
   return(
     <View>
       <Card full>
          <Card.Body>
            <View style={{ height: 100 }}>
              <Text style={{ marginLeft: 16, fontSize:20, fontWeight: 'bold' }}>{this.state.username}</Text>
            </View>
          </Card.Body>
        </Card>
          <TouchableOpacity onPress={() => this.LogOutAction()} style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={{marginTop: 30, fontSize: 20, fontWeight: 'bold', color: 'blue'}}>Log out</Text>
          </TouchableOpacity>
     </View>
   )
 }
}

const Account = withNavigation(AccountView)

export default Account