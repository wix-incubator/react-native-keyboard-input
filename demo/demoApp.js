/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Keyboard,
  PixelRatio,
  Platform
} from 'react-native';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {BlurView} from 'react-native-blur';
import {KeyboardToolbar} from 'react-native-keyboard-input';

import './demoKeyboards';

const IsIOS = Platform.OS === 'ios';
const TrackInteractive = true;

class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this.keyboardToolbarContent = this.keyboardToolbarContent.bind(this);
    this.keyboardWillShow = this.keyboardWillShow.bind(this);
    this.keyboardWillHide = this.keyboardWillHide.bind(this);
    this.state = {
      keyboardHeight: 0,
      keyboardToolbarHeight: 0,
      customKeyboard: {
        component: undefined,
        initialProps: undefined,
      },
    };
  }

  componentWillMount() {
    const showEvent = IsIOS ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = IsIOS ? 'keyboardWillHide' : 'keyboardDidHide';
    this.keyboardEventListeners = [
      Keyboard.addListener(showEvent, this.keyboardWillShow),
      Keyboard.addListener(hideEvent, this.keyboardWillHide),
    ];
  }

  componentWillUnmount() {
    this.keyboardEventListeners.forEach((eventListener) => eventListener.remove());
  }

  getToolbarButtons() {
    return [
      {
        text: 'show1',
        onPress: () => this.showKeyboardView('KeyboardView', 'FIRST - 1'),
      },
      {
        text: 'show2',
        onPress: () => this.showKeyboardView('AnotherKeyboardView', 'SECOND - 2'),
      },
      {
        text: 'reset',
        onPress: () => this.resetKeyboardView(),
      },
    ];
  }

  resetKeyboardView() {
    this.setState({customKeyboard: {}});
  }

  showKeyboardView(component, title) {
    this.setState({
      customKeyboard: {
        component,
        initialProps: {title},
      },
    });
  }

  keyboardWillShow(event) {
    const keyboardHeight = event.endCoordinates.height;
    if (this.state.keyboardHeight !== keyboardHeight) {
      this.setState({keyboardHeight});
    }
  }

  keyboardWillHide() {
    this.setState({keyboardHeight: 0});
  }

  keyboardToolbarContent() {
    const InnerContainerComponent = (IsIOS && BlurView) ? BlurView : View;
    return (
      <InnerContainerComponent blurType="xlight">
        <View style={{borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#bbb'}}/>
        <View style={styles.inputContainer}>
          <AutoGrowingTextInput
            maxHeight={200}
            style={styles.textInput}
            ref={(r) => {
              this.textInputRef = r;
            }}
            placeholder={'Message'}
            underlineColorAndroid="transparent"
            onFocus={() => this.resetKeyboardView()}
          />
          <TouchableOpacity style={styles.sendButton} onPress={() => Keyboard.dismiss()}>
            <Text>Action</Text>
          </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row'}}>
          {
            this.getToolbarButtons().map((button, index) =>
              <TouchableOpacity onPress={button.onPress} style={{paddingLeft: 15, paddingBottom: 10}} key={index}>
                <Text>{button.text}</Text>
              </TouchableOpacity>)
          }
        </View>
    </InnerContainerComponent>
    );
  }

  render() {
    return (
      <KeyboardToolbar
        renderContent={this.keyboardToolbarContent}
        onHeightChanged={height => /*this.setState({keyboardToolbarHeight: height})*/{}}
        trackInteractive={TrackInteractive}
        kbInputRef={this.textInputRef}
        kbComponent={this.state.customKeyboard.component}
        kbInitialProp={this.state.customKeyboard.initialProps}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          contentInset={IsIOS && {bottom: (this.state.keyboardHeight + this.state.keyboardToolbarHeight)}}
          keyboardDismissMode={TrackInteractive ? 'interactive' : 'none'}
        >
          <Text style={styles.welcome}>Keyboards example</Text>
        </ScrollView>
      </KeyboardToolbar>
    );
  }
}

const styles = StyleSheet.create({
  scrollContainer: {
    justifyContent: 'center',
    padding: 15,
    flex: 1,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    paddingTop: 50,
    paddingBottom: 50,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 10,
    paddingTop: 2,
    paddingBottom: 5,
    fontSize: 16,
    backgroundColor: 'white',
    borderWidth: 0.5 / PixelRatio.get(),
    borderRadius: 18,
  },
  sendButton: {
    paddingRight: 15,
    paddingLeft: 15,
  },
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
