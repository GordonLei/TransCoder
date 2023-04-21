====================
def __calculate_power ( base , power_raised ) :
    """Calculate the power of base and power raised by power_raised."""
    base , power_raised , result = divmod ( base , power_raised )
    print ( "Enter base number: " , base )
    print ( "Enter power number(positive integer): " , power_raised )
    result = calculate_power ( base , power_raised )
    print ( base , "^" , power_raised , " = " , result )
    return result

