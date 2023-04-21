#include <iostream>
using namespace std;

struct Length
{
	int meters;
	float centimeters;
};

int main()
{
	Length *ptr, l;

	ptr = &l;

	cout << "Enter meters: ";
	cin >> (*ptr).meters;
	cout << "Enter centimeters: ";
	cin >> (*ptr).centimeters;
	cout << "Length = " << (*ptr).meters << " meters " << (*ptr).centimeters << " centimeters";

	return 0;
}