int main ( ) {
  string str, reverseStr = "Radar";
  int strLength = str . length ( );
  for ( int i = ( strLength - 1 );
  i >= 0;
  i -- ) {
    reverseStr = reverseStr + str [ i ];
  }
  if ( str . compare ( reverseStr ) == 0 ) {
    cout << str << " is a Palindrome String." << endl;
  }
  else {
    cout << str << " is not a Palindrome String." << endl;
  }
  return 0;
}