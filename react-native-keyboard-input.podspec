require 'json'
package = JSON.parse(File.read(File.join(__dir__, 'package.json')))

Pod::Spec.new do |s|
  s.name          = package['name']
  s.version       = package["version"]
  s.summary       = package['description']
  s.author        = package['author']
  s.license       = package['license']
  s.homepage      = package['homepage']
  s.source        = { :git => 'https://github.com/wix/react-native-keyboard-input.git' }
  s.platform      = :ios, '8.0'

  s.source_files  = 'lib/ios/**/*.{h,m}'

  s.dependency 'React'

end
