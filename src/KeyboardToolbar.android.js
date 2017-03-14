import React, {PropTypes} from 'react';
import {requireNativeComponent, View} from 'react-native';
import CustomKeyboardView from './CustomKeyboardView';

const KeyboardToolbar = ({renderContent, kbComponent, children}) => {
  return (
    <View style={{flex: 1}}>

      <View style={{flex: 1}}>
        {children}
      </View>

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
