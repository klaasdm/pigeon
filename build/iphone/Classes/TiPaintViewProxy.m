/**
 * pigeon Paint Module
 *
 * pigeon pigeon is Copyright (c) 2009-2010 by pigeon, Inc.
 * and licensed under the Apache Public License (version 2)
 */

#import "TiPaintViewProxy.h"
#import "TiUtils.h"

@implementation TiPaintViewProxy


-(void)clear:(id)args
{
	[[self view] performSelectorOnMainThread:@selector(clear:) withObject:args waitUntilDone:NO];
}

@end
