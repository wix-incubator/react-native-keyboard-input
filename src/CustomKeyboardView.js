import React, {Component, PropTypes} from 'react';
import {View, Platform, Dimensions, AppRegistry, Keyboard} from 'react-native';
import TextInputKeyboardMangerIOS from './TextInputKeyboardMangerIOS';
import KeyboardRegistry from './KeyboardsRegistry';

const IsIOS = Platform.OS === 'ios';
const IsAndroid = Platform.OS === 'android';
const ScreenSize = Dimensions.get('window');

export default class CustomKeyboardView extends Component {
  static propTypes = {
    inputRef: PropTypes.object,
    initialProps: PropTypes.object,
    component: PropTypes.string,
  };

  constructor(props) {
    super(props);

    this.state = {androidKeyboardHeight: 0};

    const {inputRef, component, initialProps} = props;
    if(TextInputKeyboardMangerIOS && inputRef && component) {
      TextInputKeyboardMangerIOS.setInputComponent(inputRef, {componentt, initialProps});
    }
  }

  _androidKeyboardDidShow(event) {
    const keyboardHeight = event.endCoordinates.height;
    if (this.state.androidKeyboardHeight !== keyboardHeight) {
      this.setState({androidKeyboardHeight: keyboardHeight});
    }
  }

  componentWillMount() {
    if (IsAndroid) {
      this.keyboardEventListeners = [
        Keyboard.addListener('keyboardDidShow', this._androidKeyboardDidShow.bind(this)),
      ];
    }
  }

  componentWillUnmount() {
    this.keyboardEventListeners.forEach((eventListener) => eventListener.remove());
  }

  componentWillReceiveProps(nextProps) {
    if (IsAndroid) {
      if (this.props.component) {
        Keyboard.dismiss();
      }
    } else if(TextInputKeyboardMangerIOS && nextProps.inputRef && nextProps.component != this.props.component) {
      if(nextProps.component) {
        TextInputKeyboardMangerIOS.setInputComponent(nextProps.inputRef, {component: nextProps.component, initialProps: nextProps.initialProps});
      } else {
        TextInputKeyboardMangerIOS.removeInputComponent(nextProps.inputRef);
      }
    }
  }

  render() {
    if (IsAndroid && this.props.component) {
      const KeyboardComponent = KeyboardRegistry.getComponent(this.props.component);
      return (
        <View style={{width: ScreenSize.width, height: this.state.androidKeyboardHeight}}>
          <KeyboardComponent {...this.props.initialProps}/>
        </View>
      );
    }
    return null;
  }
}
