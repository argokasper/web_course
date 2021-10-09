<?php
// Lisalugemist, -uurimist: https://www.w3schools.com/php/php_functions.asp

function myFunction() {
    return "Hello world!\n";
}

echo myFunction();

// argumendiga funktsioon
function addNumbers($number1, $number2) {
    return $number1 + $number2;
}

echo addNumbers(10, 40) . "\n";

function substractNumbers(int $number1, int $number2): int
{
    return $number1 - $number2;
}

echo substractNumbers(34, 10) . "\n";

$powerNumbers = function(int $base, int $power) {
    return $base**$power;
};

echo $powerNumbers(10, 2 . "\n");
