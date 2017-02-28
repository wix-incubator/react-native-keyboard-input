import React, { Component } from 'react';
import {Text, ScrollView} from 'react-native';
import {KeyboardRegistry} from 'react-native-custom-input-controller';

class KeyboardView extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'purple'}}>
        <Text style={{color: 'white'}}>HELOOOO!!!</Text>
        <Text style={{color: 'white'}}>{this.props.title}</Text>
      </ScrollView>
    );
  }
}

class AnotherKeyboardView extends Component {
  render() {
    return (
      <ScrollView contentContainerStyle={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', backgroundColor: 'orange'}}>
        <Text>*** ANOTHER ONE ***</Text>
        <Text>{this.props.title}</Text>
      </ScrollView>
    );
  }
}

KeyboardRegistry.registerComponent('KeyboardView', () => KeyboardView);
KeyboardRegistry.registerComponent('AnotherKeyboardView', () => AnotherKeyboardView);