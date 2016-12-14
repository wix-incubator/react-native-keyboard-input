//
//  WXInputViewControllerManager.h
//
//  Created by Leo Natan (Wix) on 12/12/2016.
//  Copyright © 2016 Leo Natan. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface WXInputViewControllerManager : NSObject

+ (void)presentInputViewController:(UIInputViewController*)inputViewController forTextField:(UITextField*)textField;

@end
