//
//  RCTCustomInputController.m
//
//  Created by Leo Natan (Wix) on 13/12/2016.
//  Copyright © 2016 Leo Natan. All rights reserved.
//

#import "RCTCustomInputController.h"
#import "RCTUIManager.h"
#import "RCTCustomKeyboardViewController.h"
#import "RCTTextView.h"
#import "RCTTextField.h"

#define kHlperViewTag 0x1f1f1f

NSString *const RCTCustomInputControllerKeyboardResigendEvent = @"kbdResigned";

@protocol _WXInputHelperViewDelegate <NSObject>
-(void)_WXInputHelperViewResignFirstResponder:(UIView*)wxInputHelperView;
@end

@interface _WXInputHelperView : UIView

@property (nullable, nonatomic, readwrite, strong) UIInputViewController *inputViewController;
@property (nonatomic, weak) id<_WXInputHelperViewDelegate> delegate;

@property (nullable, readwrite, strong) UIView *inputAccessoryView;

@end

@implementation _WXInputHelperView

- (BOOL)canBecomeFirstResponder
{
    return YES;
}

- (BOOL)resignFirstResponder
{
    BOOL rv = [super resignFirstResponder];
    
    [self removeFromSuperview];
    
    if(self.delegate && [self.delegate respondsToSelector:@selector(_WXInputHelperViewResignFirstResponder:)])
    {
        [self.delegate _WXInputHelperViewResignFirstResponder:self];
    }
    
    return rv;
}

@end


@interface RCTCustomInputController () <_WXInputHelperViewDelegate>

@property(nonatomic) BOOL customInputComponentPresented;

@end

@implementation RCTCustomInputController

- (dispatch_queue_t)methodQueue
{
    return dispatch_get_main_queue();
}

- (NSArray<NSString *> *)supportedEvents
{
    return @[RCTCustomInputControllerKeyboardResigendEvent];
}

RCT_EXPORT_MODULE(CustomInputController)

- (instancetype)init
{
    self = [super init];
    if (self)
    {
        self.customInputComponentPresented = NO;
    }
    return self;
}

-(BOOL)reactCanBecomeFirstResponder:(UIView*)inputField
{
    if([inputField respondsToSelector:@selector(reactWillMakeFirstResponder)])
    {
        [inputField performSelector:@selector(reactWillMakeFirstResponder)];
    }
    return [inputField canBecomeFirstResponder];
}

-(void)reactDidMakeFirstResponder:(UIView*)inputField
{
    if([inputField respondsToSelector:@selector(reactDidMakeFirstResponder)])
    {
        [inputField performSelector:@selector(reactDidMakeFirstResponder)];
    }
}

-(UIView*)getFirstResponder:(UIView*)view
{
    if (view == nil || [view isFirstResponder])
    {
        return view;
    }
    
    for (UIView *subview in view.subviews)
    {
        UIView *firstResponder = [self getFirstResponder:subview];
        if(firstResponder != nil)
        {
            return firstResponder;
        }
    }
    return nil;
}

RCT_EXPORT_METHOD(presentCustomInputComponent:(nonnull NSNumber*)inputFieldTag params:(nonnull NSDictionary*)params)
{
    UIView* inputField = [self.bridge.uiManager viewForReactTag:inputFieldTag];
    BOOL canBecomeFirstResponder = [self reactCanBecomeFirstResponder:inputField];
    if(canBecomeFirstResponder)
    {
        [self reactDidMakeFirstResponder:inputField];
    }
    
    RCTBridge* bridge = [self.bridge valueForKey:@"parentBridge"];
    if(bridge != nil)
    {
        NSDictionary *initialProps = params[@"initialProps"];
        RCTRootView* rv = [[RCTRootView alloc] initWithBridge:bridge moduleName:params[@"component"] initialProperties:initialProps];
        if(initialProps != nil && initialProps[@"backgroundColor"] != nil)
        {
            UIColor *backgroundColor = [RCTConvert UIColor:initialProps[@"backgroundColor"]];
            if(backgroundColor != nil)
            {
                rv.backgroundColor = backgroundColor;
            }
        }
        
        self.customInputComponentPresented = NO;
        
        RCTCustomKeyboardViewController* customKeyboardController = [[RCTCustomKeyboardViewController alloc] initWithRootView:rv];
        
        _WXInputHelperView* helperView = [[_WXInputHelperView alloc] initWithFrame:CGRectZero];
        helperView.tag = kHlperViewTag;
        helperView.delegate = self;
        
        if ([inputField isKindOfClass:[RCTTextView class]])
        {
            UITextView *textView = [inputField valueForKey:@"_textView"];
            if (textView != nil)
            {
                helperView.inputAccessoryView = textView.inputAccessoryView;
            }
        }
        else
        {
            UIView *firstResponder = [self getFirstResponder:inputField];
            helperView.inputAccessoryView = firstResponder.inputAccessoryView;
        }
        
        [helperView reloadInputViews];
        
        helperView.backgroundColor = [UIColor clearColor];
        [inputField.superview addSubview:helperView];
        [inputField.superview sendSubviewToBack:helperView];
        
        helperView.inputViewController = customKeyboardController;
        [helperView reloadInputViews];
        [helperView becomeFirstResponder];
        
        self.customInputComponentPresented = YES;
    }
}

RCT_EXPORT_METHOD(resetInput:(nonnull NSNumber*)inputFieldTag)
{
    self.customInputComponentPresented = NO;
    
    UIView* inputField = [self.bridge.uiManager viewForReactTag:inputFieldTag];
    if(inputField != nil && [self reactCanBecomeFirstResponder:inputField])
    {
        _WXInputHelperView* helperView = [inputField.superview viewWithTag:kHlperViewTag];
        if(helperView != nil && [helperView isFirstResponder])
        {//restore the first responder only if it was already the first responder to prevent the keyboard from opening again if not necessary
            [inputField becomeFirstResponder];
        }
        [self reactDidMakeFirstResponder:inputField];
    }
}

RCT_EXPORT_METHOD(dismissKeyboard)
{
    UIView *firstResponder = [self getFirstResponder:[UIApplication sharedApplication].delegate.window];
    if(firstResponder != nil)
    {
        [firstResponder resignFirstResponder];
    }
}

#pragma mark - _WXInputHelperViewDelegate methods

-(void)_WXInputHelperViewResignFirstResponder:(UIView*)wxInputHelperView
{
    if(self.customInputComponentPresented)
    {
        [self sendEventWithName:RCTCustomInputControllerKeyboardResigendEvent body:nil];
    }
    self.customInputComponentPresented = NO;
}

@end
