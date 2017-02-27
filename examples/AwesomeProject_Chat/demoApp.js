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
  TextInput,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  PixelRatio,
  Platform
} from 'react-native';
import {BlurView} from 'react-native-blur';
import {KeyboardTrackingView} from 'react-native-keyboard-tracking-view';
import {AutoGrowingTextInput} from 'react-native-autogrow-textinput';
import {CustomKeyboardView, KeyboardRegistry} from 'react-native-custom-input-controller';

const IsIOS = Platform.OS === 'ios';
const ScreenSize = Dimensions.get('window');
const TrackInteractive = true;

class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this._keyboardWillShow = this._keyboardWillShow.bind(this);
    this._keyboardWillHide = this._keyboardWillHide.bind(this);
    this.state = {
      keyboardHeight: 0,
      keyboardToolbarHeight: 0,
      customKeyboard: {
        component: undefined,
        initialProps: undefined
      }
    };
  }

  componentWillMount() {
    const showEvent = IsIOS ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = IsIOS ? 'keyboardWillHide' : 'keyboardDidHide';
    this.keyboardEventListeners = [
      Keyboard.addListener(showEvent, this._keyboardWillShow),
      Keyboard.addListener(hideEvent, this._keyboardWillHide)
    ];
  }

  componentWillUnmount() {
    this.keyboardEventListeners.forEach((eventListener) => eventListener.remove());
  }

  _keyboardWillShow(event) {
    const keyboardHeight = event.endCoordinates.height;
    if (this.state.keyboardHeight !== keyboardHeight) {
      this.setState({keyboardHeight});
    }
  }

  _keyboardWillHide() {
    this.setState({keyboardHeight: 0});
  }

  showKeyboardView(component, title) {
    this.setState({
      customKeyboard: {
        component: component,
        initialProps: {title}
      }
    });
  }

  hideKeyboardView() {
    this.setState({customKeyboard: {}});
  }

  getToolbarButtons() {
    return [
      {
        text: 'show1',
        onPress: () => this.showKeyboardView('KeyboardView', 'FIRST - 1')
      },
      {
        text: 'show2',
        onPress: () => this.showKeyboardView('AnotherKeyboardView', 'SECOND - 2')
      },
      {
        text: 'hide',
        onPress: () => this.hideKeyboardView()
      }
    ];
  }

  renderKeyboardToolbar() {
    const ContainerComponent = IsIOS ? KeyboardTrackingView : View;
    const InnerContainerComponent = IsIOS ? BlurView : View;
    return (
      <ContainerComponent
        style={styles.trackingToolbarContainer}
        onLayout={(event) => this.setState({keyboardToolbarHeight: event.nativeEvent.layout.height})}
        trackInteractive={TrackInteractive}
      >
        <View style={{borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#bbb'}}/>
        <InnerContainerComponent blurType="xlight" style={styles.blurContainer}>
          <View style={styles.inputContainer}>
            <AutoGrowingTextInput
              maxHeight={200}
              style={styles.textInput}
              ref={(r) => this._textInput = r}
              placeholder={'Message'}
              underlineColorAndroid="transparent"
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
                </TouchableOpacity>
              )
            }
          </View>
          <CustomKeyboardView
            inputRef={this._textInput}
            component={this.state.customKeyboard.component}
            initialProps={this.state.customKeyboard.initialProps}
          />
        </InnerContainerComponent>
      </ContainerComponent>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}
                    contentInset={IsIOS && {bottom: (this.state.keyboardHeight + this.state.keyboardToolbarHeight)}}
                    keyboardDismissMode={TrackInteractive ? 'interactive' : 'none'}
        >
          <Text style={styles.welcome}>Keyboards example</Text>
        </ScrollView>
        {this.renderKeyboardToolbar()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  scrollContainer: {
    justifyContent: 'center',
    padding: 15,
    flex: 1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    paddingTop: 50,
    paddingBottom: 50
  },
  trackingToolbarContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: ScreenSize.width
  },
  inputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  blurContainer: {
    flex: 1,
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
    borderRadius: 18
  },
  sendButton: {
    paddingRight: 15,
    paddingLeft: 15
  }
});

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

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
KeyboardRegistry.registerComponent('KeyboardView', () => KeyboardView);
KeyboardRegistry.registerComponent('AnotherKeyboardView', () => AnotherKeyboardView);
