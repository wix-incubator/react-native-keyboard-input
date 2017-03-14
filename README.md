# React Native Keyboard Input

Presents a React component as an input view which replaces the system keyboard. Can be used for creating custom input views such as an image gallery, stickers, etc.

Supports both iOS and Android.

<img src="Supplementals/example2.gif" />

##Installation
Install the package from npm:

`yarn add react-native-keyboard-input` or `npm i --save react-native-keyboard-input`

Link the native library:

####Android

Add to the `android\app\build.gradle` dependencies:

```
compile project(":reactnativekeyboardinput")
```

Add to `android\settings.gradle`:

```
include ':reactnativekeyboardinput'
project(':reactnativekeyboardinput').projectDir = new File(rootProject.projectDir, '../lib/android')
```

In your `MainApplication.java`, add to the `getPackages()` list:

```
import com.wix.reactnativekeyboardinput.KeyboardInputPackage;

@Override
protected List<ReactPackage> getPackages() {
  return Arrays.<ReactPackage>asList(
      //add this pacakge:
      new KeyboardInputPackage()
  );
}
};
```

####iOS
In Xcode, drag both `RCTCustomInputController.xcodeproj` and `KeyboardTrackingView.xcodeproj` from your `node_modules` to the Libraries folder in the Project Navigator, then add `licRCTCustomInputController.a` and `libKeyboardTrackingView.a` to your app target "Linked Frameworks and Libraries".


##Usage

There are 2 main parts to the necessary implementation:

###1. A keyboard component
Create a component that you wish to use as a keyboard input. For example:

```
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
```

Now register with the keyboard registry so it can be used later as a keyboard:

```
import {KeyboardRegistry} from 'react-native-keyboard-input';

KeyboardRegistry.registerComponent('MyKeyboardView', () => KeyboardView);
```

When you need to notify about selecting an item in the keyboard, use:

```
KeyboardRegistry.notifyListeners(`MyKeyboardView.onItemSelected`, params);
```

###2. Using the keyboard component as an input view
While this package provides several component and classes for low-level control over custom keyboard inputs, the easiets way would be to use `KeyboardToolbar`. It's the only thing you'll need to show your Keyboard component as a custom input. For example:

```
<KeyboardToolbar
  renderContent={this.keyboardToolbarContent}
  kbInputRef={this.textInputRef}
  kbComponent={this.state.customKeyboard.component}
  kbInitialProp={this.state.customKeyboard.initialProps}
/>
```

| prop | type | description |
| ---- | ---- | ----| ---- |
| renderContent | Function | a fucntion for rendering the content of the keyboard toolbar |
| kbInputRef | Object | A ref to the input component which triggers the showing of the keyboard |
| kbComponent | String | The registered component name |
| kbInitialProps | Object | Initial props to pass to the registered keyboard component |
| onItemSelected | Function | a callback function for a selection of an item in the keyboard component |

This component takes care of making your toolbar (which is rendered via `renderContent `) "float" above the keyboard (necessary for iOS), and for setting your component as the keyboard input when the `kbComponent` changes.

##Demo

See [demoApp.js](https://github.com/wix/react-native-keyboard-input/blob/master/demo/demoApp.js) for a full working example.