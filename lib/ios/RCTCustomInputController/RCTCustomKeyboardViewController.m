//
//  RCTCustomKeyboardViewController.m
//
//  Created by Leo Natan (Wix) on 12/12/2016.
//  Copyright © 2016 Leo Natan. All rights reserved.
//

#import "RCTCustomKeyboardViewController.h"

#if __has_include(<KeyboardTrackingView/ObservingInputAccessoryView.h>)
    #import <KeyboardTrackingView/ObservingInputAccessoryView.h>
    #define ObservingInputAccessoryView_IsAvailable true
#endif

@implementation RCTCustomKeyboardViewController

- (instancetype)init
{
	self = [super init];
	
	if(self)
	{
		self.inputView = [[UIInputView alloc] initWithFrame:CGRectZero inputViewStyle:UIInputViewStyleKeyboard];

        self.heightConstraint = [self.inputView.heightAnchor constraintEqualToConstant:0];
        
#ifdef ObservingInputAccessoryView_IsAvailable
        ObservingInputAccessoryView *activeObservingInputAccessoryView = [ObservingInputAccessoryViewManager sharedInstance].activeObservingInputAccessoryView;
        if (activeObservingInputAccessoryView != nil)
        {
            CGFloat keyboardHeight = activeObservingInputAccessoryView.keyboardHeight;
            if (keyboardHeight > 0)
            {
                self.heightConstraint.constant = keyboardHeight;
                [self setAllowsSelfSizing:YES];
            }
        }
#endif
		//!!!
		self.view.translatesAutoresizingMaskIntoConstraints = NO;
	}
	
	return self;
}

- (void) setAllowsSelfSizing:(BOOL)allowsSelfSizing
{
    if(self.inputView.allowsSelfSizing != allowsSelfSizing)
    {
        self.inputView.allowsSelfSizing = allowsSelfSizing;
        self.heightConstraint.active = allowsSelfSizing;
    }
}

-(void)setRootView:(RCTRootView*)rootView
{
    if(_rootView != nil)
    {
        [_rootView removeFromSuperview];
    } else {
        // Add background view that covers the entire input view
        UIView *whiteBackground = [[UIView alloc] init];
        whiteBackground.backgroundColor = [UIColor whiteColor];
        [self.inputView addSubview: whiteBackground];

        whiteBackground.translatesAutoresizingMaskIntoConstraints = NO;
        [whiteBackground.leadingAnchor constraintEqualToAnchor:self.inputView.leadingAnchor].active = YES;
        [whiteBackground.trailingAnchor constraintEqualToAnchor:self.inputView.trailingAnchor].active = YES;
        [whiteBackground.topAnchor constraintEqualToAnchor:self.inputView.topAnchor].active = YES;
        [whiteBackground.bottomAnchor constraintEqualToAnchor:self.inputView.bottomAnchor].active = YES;
    }
    
    _rootView = rootView;
    _rootView.translatesAutoresizingMaskIntoConstraints = NO;
    [self.inputView addSubview:_rootView];
    
    [_rootView.leadingAnchor constraintEqualToAnchor:self.view.leadingAnchor].active = YES;
    [_rootView.trailingAnchor constraintEqualToAnchor:self.view.trailingAnchor].active = YES;
    [_rootView.topAnchor constraintEqualToAnchor:self.view.topAnchor].active = YES;

    NSLayoutYAxisAnchor *yAxisAnchor = self.view.bottomAnchor;
#if __IPHONE_OS_VERSION_MAX_ALLOWED > __IPHONE_10_3
    if (@available(iOS 11.0, *)) {
        yAxisAnchor = self.view.safeAreaLayoutGuide.bottomAnchor;
    }
#endif
    [_rootView.bottomAnchor constraintEqualToAnchor:yAxisAnchor].active = YES;
}

@end
