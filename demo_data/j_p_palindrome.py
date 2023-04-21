def main ( ) :
    str , reverse_str = "Radar" , ""
    str_length = len ( str )
    for i in range ( ( str_length - 1 ) , - 1 , - 1 ) :
        reverse_str = reverse_str + str [ i ]
    if str.lower ( ) == reverse_str.lower ( ) :
        print ( "%s is a Palindrome String." % str )
    else :
        print ( "%s is not a Palindrome String." % str )

