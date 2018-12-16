import React from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';
import {createStackNavigator, withNavigation, createAppContainer } from 'react-navigation';

class HomeScreen extends React.Component {
 render(){
   return(
     <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
       <Text>This is Home!</Text>
       <Button title='Go to Details'
         onPress={() => this.props.navigation.navigate('DetailsView', {content: 'This is Detail!'})}/>
     </View>
   )
 }
}

const HomeView = withNavigation(HomeScreen);

export default HomeView;