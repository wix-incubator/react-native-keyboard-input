import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

export default class KeyboardInput extends Component {

  onPressBodyMessage() {
    this.props.navigator.push({
      screen: 'screens.innerScreen',
      navigatorStyle: {drawUnderNavBar: true, navBarHidden: true},
      passProps: {
        message: 'In the secondary tab, the keyboard input is inside a pushed screen, yet it works nonetheless! :-)'
      }
    });
  }

  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
        <TouchableOpacity onPress={this.onPressBodyMessage.bind(this)}>
          <Text style={{fontSize: 21}}>Tap for more keyboard fun...</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
