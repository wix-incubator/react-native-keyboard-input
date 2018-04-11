require 'json'
version = JSON.parse(File.read('package.json'))["version"]

Pod::Spec.new do |s|

  s.name                  = "react-native-keyboard-input"
  s.version               = version
  s.summary               = "Keyboard Input for React Native."
  s.homepage              = "https://github.com/wix/react-native-keyboard-input"
  s.license               = 'MIT'
  s.source                = { path: '.' }
  s.ios.deployment_target = '9.0'
  s.authors               = { 'Leo Natan' => 'lnatan@wix.com' }
  s.source_files          = 'lib/ios/{LNInterpolation/*,RCTCustomInputController/*}.{h,m,mm}'
  s.dependency 'React'
  s.dependency 'react-native-keyboard-tracking-view'

end