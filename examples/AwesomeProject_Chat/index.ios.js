/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import _ from 'lodash';
import React, { Component } from 'react';
import ReactNative, {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';

import CustomInputController from 'react-native-custom-input-controller';

export default class AwesomeProject extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TextInput
          ref='myTextInput'
          style={{ height: 40, borderColor: 'gray', borderWidth: 1, padding: 8, margin: 20 }}
        />
        <TouchableOpacity onPress={() => this._onResetButton()}>
          <Text>Reset</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this._onPressButton()}>
          <Text>Change</Text>
        </TouchableOpacity>
      </View>
    );
  }

  _onPressButton() {
    const reactTag = ReactNative.findNodeHandle(this.refs['myTextInput']);
    CustomInputController.presentCustomInputComponent(reactTag, 'CustomInput');
  }

  _onResetButton() {
    const reactTag = ReactNative.findNodeHandle(this.refs['myTextInput']);
    CustomInputController.resetInput(reactTag);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
});

class CustomInput extends Component {
  getRandomColor() {
    const letters = '0123456789ABCDEF'.split('');
    let color = '#';

    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: this.getRandomColor() }} />
    )
  }
}

AppRegistry.registerComponent('CustomInput', () => CustomInput);
AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);