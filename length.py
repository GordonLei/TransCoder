====================
def __sub__ ( cls , * args , ** kwargs ) :
    """
 Return a new Length object with the given arguments and keyword
 arguments.

 This is a convenience function that returns a new Length object
 with the given arguments and keyword arguments.

 """
    kwargs [ 'meters' ] = int ( kwargs.pop ( 'meters' , 0 ) )
    kwargs [ 'centimeters' ] = float ( kwargs.pop ( 'centimeters' , 0 ) )
    return Length ( * args , ** kwargs )

