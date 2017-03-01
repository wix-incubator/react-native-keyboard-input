import React, {Component, PropTypes} from 'react';
import {Text, ScrollView, StyleSheet} from 'react-native';
import {KeyboardRegistry} from 'react-native-custom-input-controller';

class KeyboardView extends Component {
  static propTypes = {
    title: PropTypes.string,
  };
  render() {
    return (
      <ScrollView contentContainerStyle={[styles.keyboardContainer, {backgroundColor: 'purple'}]}>
        <Text style={{color: 'white'}}>HELOOOO!!!</Text>
        <Text style={{color: 'white'}}>{this.props.title}</Text>
      </ScrollView>
    );
  }
}

class AnotherKeyboardView extends Component {
  static propTypes = {
    title: PropTypes.string,
  };
  render() {
    return (
      <ScrollView contentContainerStyle={[styles.keyboardContainer, {backgroundColor: 'orange'}]}>
        <Text>*** ANOTHER ONE ***</Text>
        <Text>{this.props.title}</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

KeyboardRegistry.registerComponent('KeyboardView', () => KeyboardView);
KeyboardRegistry.registerComponent('AnotherKeyboardView', () => AnotherKeyboardView);
