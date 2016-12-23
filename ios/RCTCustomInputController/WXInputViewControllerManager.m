//
//  WXInputViewControllerManager.m
//
//  Created by Leo Natan (Wix) on 12/12/2016.
//  Copyright © 2016 Leo Natan. All rights reserved.
//

#import "WXInputViewControllerManager.h"
@import ObjectiveC;

@interface _WXInputHelperView : UIView

@property (nullable, nonatomic, readwrite, strong) UIInputViewController *inputViewController;

@end

@implementation _WXInputHelperView

- (BOOL)canBecomeFirstResponder
{
	return YES;
}

@end

static const void* WXTextFieldInputViewHelperView = &WXTextFieldInputViewHelperView;

@implementation WXInputViewControllerManager

+ (void)_fixupResponder:(UIResponder*)responder
{
	Class originalClass = responder.class;
	NSString* originalClassName = NSStringFromClass(originalClass);
	NSString* isaSubclassName = [NSString stringWithFormat:@"%@_WXInputViewControllerManager", originalClassName];
	Class isaSubclass = NSClassFromString(isaSubclassName);
	if(isaSubclass == NULL)
	{
		isaSubclass = objc_allocateClassPair(originalClass, isaSubclassName.UTF8String, 0);
		
		void (^cleanup)(id) = ^ (id _self)
		{
			_WXInputHelperView* helperView = [objc_getAssociatedObject(_self, WXTextFieldInputViewHelperView) nonretainedObjectValue];
			[helperView removeFromSuperview];
			objc_setAssociatedObject(_self, WXTextFieldInputViewHelperView, nil, OBJC_ASSOCIATION_RETAIN_NONATOMIC);
			
			object_setClass(_self, originalClass);
		};
	
		IMP imp;
		
		imp = imp_implementationWithBlock(^ (id _self, UIView* newSuperview) {
			struct objc_super super = {
				.receiver = _self,
				.super_class = originalClass,
			};
			
			void (*objc_msgSendSuper_typed)(struct objc_super *, SEL, id) = (void *)&objc_msgSendSuper;
			objc_msgSendSuper_typed(&super, @selector(willMoveToSuperview:), newSuperview);
			
			cleanup(_self);
		});
		
		class_addMethod(isaSubclass, @selector(willMoveToSuperview:), imp, method_getTypeEncoding(class_getInstanceMethod([UIView class], @selector(willMoveToSuperview:))));
		
		imp = imp_implementationWithBlock(^ (id _self) {
			return originalClass;
		});
		
		class_addMethod(isaSubclass, @selector(class), imp, method_getTypeEncoding(class_getInstanceMethod(NSObject.class, @selector(class))));
		
		objc_registerClassPair(isaSubclass);
		
		class_addMethod(objc_getMetaClass(isaSubclassName.UTF8String), @selector(class), imp, method_getTypeEncoding(class_getClassMethod(NSObject.class, @selector(class))));
	}
	object_setClass(responder, isaSubclass);
}

+ (void)presentInputViewController:(UIInputViewController*)inputViewController forTextField:(UITextField*)textField
{
	_WXInputHelperView* helperView = [objc_getAssociatedObject(textField, WXTextFieldInputViewHelperView) nonretainedObjectValue];
	if(helperView == nil)
	{
		helperView = [[_WXInputHelperView alloc] initWithFrame:CGRectZero];
		helperView.backgroundColor = [UIColor clearColor];
		[textField.superview addSubview:helperView];
		[textField.superview sendSubviewToBack:helperView];
		objc_setAssociatedObject(textField, WXTextFieldInputViewHelperView, [NSValue valueWithNonretainedObject:helperView], OBJC_ASSOCIATION_RETAIN_NONATOMIC);
	}
	helperView.inputViewController = inputViewController;
	[helperView reloadInputViews];
	[helperView becomeFirstResponder];
	
	[self _fixupResponder:textField];
}

@end
