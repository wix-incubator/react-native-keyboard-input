import React, {PropTypes} from 'react';
import {requireNativeComponent, View} from 'react-native';
import CustomKeyboardView from './CustomKeyboardView';

const KeyboardToolbar = ({renderContent, kbComponent}) => {
  return (
    <View>
      {renderContent && renderContent()}
      <CustomKeyboardView component={kbComponent}/>
    </View>
  );
};

KeyboardToolbar.propTypes = {
  renderContent: PropTypes.func,
  kbComponent: React.PropTypes.string,
};

export default KeyboardToolbar;
