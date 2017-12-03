import React from 'react';
import {Text,
        View,
        Button,
        StyleSheet,
        StatusBar } from 'react-native';
import { StackNavigator } from 'react-navigation';

let HomeScreen = require('./Screens/HomeScreen.js').HomeScreen;
let CompScreen = require('./Screens/CompScreen.js').CompScreen;
let TextScreen = require('./Screens/TextScreen.js').TextScreen;


const SimpleApp = StackNavigator({
  Home: { screen: HomeScreen },
  Comp: { screen: CompScreen},
  Text: { screen: TextScreen}
});


export default class App extends React.Component {
  render() {
    return (
      <View style={{flex:1}} >
      <StatusBar hidden={true}/>  
      <SimpleApp />
      </View>

      
    );
  }
}