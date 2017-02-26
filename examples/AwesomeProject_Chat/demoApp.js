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
import {TextInputKeyboardManger} from 'react-native-custom-input-controller';

const screenSize = Dimensions.get('window');
const trackInteractive = true;

const KeyboardToolbar = ({ContainerComponent, InnerContainerComponent, onActionPress, buttons, onLayout, onInputFocus, inputRefCallback}) =>
  <ContainerComponent style={styles.trackingToolbarContainer} onLayout={onLayout} trackInteractive={trackInteractive}>
    <View style={{borderTopWidth: StyleSheet.hairlineWidth, borderColor: '#bbb'}}/>
    <InnerContainerComponent blurType="xlight" style={styles.blurContainer}>
      <View style={styles.inputContainer}>
        <AutoGrowingTextInput
          maxHeight={200}
          style={styles.textInput}
          ref={(r) => inputRefCallback && inputRefCallback(r)}
          placeholder={'Message'}
          underlineColorAndroid="transparent"
        />
        <TouchableOpacity style={styles.sendButton} onPress={onActionPress}>
          <Text>Action</Text>
        </TouchableOpacity>
      </View>
      <View style={{flexDirection: 'row',}}>
        {
          buttons.map((button, index) =>
            <TouchableOpacity onPress={button.onPress} style={{paddingLeft: 15, paddingBottom: 10}} key={index}>
              <Text>{button.text}</Text>
            </TouchableOpacity>
          )
        }
      </View>
    </InnerContainerComponent>
  </ContainerComponent>;

class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    this._keyboardWillShow = this._keyboardWillShow.bind(this);
    this._keyboardWillHide = this._keyboardWillHide.bind(this);
    this.state = {
      keyboardHeight: 0,
      keyboardToolbarHeight: 0
    };
  }

  componentWillMount() {
    this.keyboardEventListeners = [
      Keyboard.addListener('keyboardWillShow', this._keyboardWillShow),
      Keyboard.addListener('keyboardWillHide', this._keyboardWillHide)
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

  showKeyboardView() {
    const params = {
      component: 'KeyboardView',
      initialProps: {
        title: 'there!!'
      }
    };
    TextInputKeyboardManger.setInputComponent(this._textInput, params);
  }

  hideKeyboardView() {
    TextInputKeyboardManger.removeInputComponent(this._textInput);
  }

  getToolbarButtons() {
    return [
      {
        text: 'show', onPress: () => this.showKeyboardView()
      },
      {
        text: 'hide',
        onPress: () => this.hideKeyboardView()
      }
    ];
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}
                    contentInset={{bottom: (this.state.keyboardHeight + this.state.keyboardToolbarHeight)}}
                    keyboardDismissMode={trackInteractive ? 'interactive' : 'none'}
        >
          <Text style={styles.welcome}>Keyboards example</Text>
        </ScrollView>
        <KeyboardToolbar
          ContainerComponent={Platform.OS === 'ios' ? KeyboardTrackingView : View}
          InnerContainerComponent={Platform.OS === 'ios' ? BlurView : View}
          onActionPress={() => this._textInput._textInput.blur()}
          buttons={this.getToolbarButtons()}
          onLayout={(event) => this.setState({keyboardToolbarHeight: event.nativeEvent.layout.height})}
          inputRefCallback={(r) => this._textInput = r}/>
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
    padding: 15
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
    width: screenSize.width
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
      <ScrollView contentContainerStyle={{flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <Text>HELOOOO!!!</Text>
        <Text>{this.props.title}</Text>
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
AppRegistry.registerComponent('KeyboardView', () => KeyboardView);
