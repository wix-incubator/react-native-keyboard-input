import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default class AwesomeProject extends Component {

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={() => this.props.navigator.push({screen: 'screens.innerScreen', navigatorStyle: {drawUnderNavBar: true, navBarHidden: true}})}>
          <Text style={{fontSize: 21}}>Tap for more keyboard fun</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
