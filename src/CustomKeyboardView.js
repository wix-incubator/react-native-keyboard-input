import React, {Component, PropTypes} from 'react';
import {View, Platform, Dimensions, Keyboard, DeviceEventEmitter, requireNativeComponent} from 'react-native';
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

    this.state = {
      availableHeightAndroid: 0
    };

    this.listener = DeviceEventEmitter.addListener("customKeyboardHeightUpdated", this.onKeyboardHeightUpdated.bind(this));
  }

  async componentWillReceiveProps(nextProps) {
    const {inputRef, component, initialProps} = nextProps;

    if (IsAndroid) {
      if (component && !this.state.availableHeightAndroid) {
        await TextInputKeyboardManagerAndroid.enterCustomKeyboardMode();
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

  componentWillUnmount() {
    this.listener.remove();
  }

  render() {
    if (IsAndroid) {
      const {component} = this.props;
      const KeyboardComponent = component && KeyboardRegistry.getComponent(component);
      console.log("ASDASD", "render()", this.state.availableHeightAndroid);
      return (
        <CustomKeyboardViewNativeAndroid>
          {
            KeyboardComponent && this.state.availableHeightAndroid
              ? (<View style={{height: this.state.availableHeightAndroid}}>
                  <KeyboardComponent/>
                </View>)
              : null
          }
        </CustomKeyboardViewNativeAndroid>
      );

      // return (
      //   <CustomKeyboardViewNativeAndroid>
      //     {KeyboardComponent ? (<KeyboardComponent/>) : null}
      //   </CustomKeyboardViewNativeAndroid>
      // );
    }
    return null;
  }

  onKeyboardHeightUpdated(height) {
    console.log("ASDASD", "onKeyboardHeightUpdated", height);
    this.setState({
      availableHeightAndroid: height
    });
  }
}
