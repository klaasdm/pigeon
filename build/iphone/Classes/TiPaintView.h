/**
 * pigeon Paint Module
 *
 * pigeon pigeon is Copyright (c) 2009-2010 by pigeon, Inc.
 * and licensed under the Apache Public License (version 2)
 */
#import "TiUIView.h"

@interface TiPaintView : TiUIView {
@private
	UIImageView *drawImage;
	CGPoint lastPoint;
	CGFloat strokeWidth;
	CGColorRef strokeColor;
	
}

@end
