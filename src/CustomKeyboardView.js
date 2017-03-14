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
  };

  constructor(props) {
    super(props);

    const {inputRef, component, initialProps} = props;
    if (TextInputKeyboardManagerIOS && inputRef && component) {
      TextInputKeyboardManagerIOS.setInputComponent(inputRef, {component, initialProps});
    }
  }

  async componentWillReceiveProps(nextProps) {
    console.log("ASDASD", "componentWillReceiveProps()");
    const {inputRef, component, initialProps} = nextProps;

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
  }

  render() {
    console.log("ASDASD", "render()");
    if (IsAndroid) {
      const {component} = this.props;
      const KeyboardComponent = component && KeyboardRegistry.getComponent(component);
      return (
        <CustomKeyboardViewNativeAndroid>
          {KeyboardComponent ? (<KeyboardComponent/>) : null}
        </CustomKeyboardViewNativeAndroid>
      );
    }
    return null;
  }
}
