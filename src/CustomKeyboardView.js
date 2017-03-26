import React, {Component, PropTypes} from 'react';
import {View, Text, Platform, Dimensions, DeviceEventEmitter, requireNativeComponent} from 'react-native';
import TextInputKeyboardManagerIOS from './TextInputKeyboardMangerIOS';
import TextInputKeyboardManagerAndroid from './TextInputKeyboardManagerAndroid';
import KeyboardRegistry from './KeyboardsRegistry';

const IsAndroid = Platform.OS === 'android';
const IsIOS = Platform.OS === 'ios';

const CustomKeyboardViewNativeAndroid = requireNativeComponent('CustomKeyboardViewNative');

export default class CustomKeyboardView extends Component {
  static propTypes = {
    inputRef: PropTypes.object,
    initialProps: PropTypes.object,
    component: PropTypes.string,
    onItemSelected: PropTypes.func,
  };

  constructor(props) {
    super(props);

    const {inputRef, component, initialProps, onItemSelected, onRequestShowKeyboard} = props;
    if (component) {
      this.addOnItemSelectListener(onItemSelected, component);

      if (TextInputKeyboardManagerIOS && inputRef) {
        TextInputKeyboardManagerIOS.setInputComponent(inputRef, {component, initialProps});
      }

      this.registeredRequestShowKeyboard = false;
    }
  }

  componentWillUnmount() {
    KeyboardRegistry.removeListeners('onRequestShowKeyboard');
  }

  addOnItemSelectListener(onItemSelected, component) {
    if (onItemSelected) {
      KeyboardRegistry.addListener(`${component}.onItemSelected`, (args) => {
        onItemSelected(component, args);
      });
    }
  }

  async componentWillReceiveProps(nextProps) {
    const {inputRef, component, initialProps, onRequestShowKeyboard} = nextProps;

    if (IsAndroid) {
      if (this.props.component !== component && !component) {
        await TextInputKeyboardManagerAndroid.reset();
      }
    }

    if (IsIOS && TextInputKeyboardManagerIOS && inputRef && component !== this.props.component) {
      if (component) {
        TextInputKeyboardManagerIOS.setInputComponent(inputRef, {component, initialProps});
      } else {
        TextInputKeyboardManagerIOS.removeInputComponent(inputRef);
      }
    }

    if (onRequestShowKeyboard && !this.registeredRequestShowKeyboard) {
      this.registeredRequestShowKeyboard = true;
      KeyboardRegistry.addListener('onRequestShowKeyboard', (args) => {
        onRequestShowKeyboard(args.keyboardId);
      });
    }
    this.registerListener(this.props, nextProps);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (nextProps.component === this.props.component) {
      return false;
    }
    return true;
  }


  componentWillUnmount() {
    if (this.keyboardEventListeners) {
      this.keyboardEventListeners.forEach(eventListener => eventListener.remove());
    }
    if (this.props.component) {
      KeyboardRegistry.removeListeners(`${this.props.component}.onItemSelected`);
    }
  }

  registerListener(props, nextProps) {
    const {component, onItemSelected} = nextProps;
    if (component && props.component !== component) {
      KeyboardRegistry.removeListeners(`${props.component}.onItemSelected`);
      this.addOnItemSelectListener(onItemSelected, component);
    }
  }

  render() {
    if (IsAndroid) {
      const {component} = this.props;
      const KeyboardComponent = component && KeyboardRegistry.getKeyboard(component);
      return (
        <CustomKeyboardViewNativeAndroid>
          {KeyboardComponent ? (<KeyboardComponent/>) : null}
        </CustomKeyboardViewNativeAndroid>
      );
    }
    return null;
  }
}
