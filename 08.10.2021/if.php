<?php
// Lisalugemist, -uurimist: https://www.w3schools.com/php/php_if_else.asp

$number = 53;

if ($number % 2 === 0) {
    echo "Number on paarisarv\n";
} else { // ALATI tõene
    echo "Number on paaritu arv\n";
}

$arv = 13;

$vastus = $arv**2;
if ($vastus === 0) echo $vastus .': ' . 'on paarisarv\n';
// else echo "$vastus: on paaritu arv\n";
else printf('%s: on paaritu arv', $vastus);

$arv1 = 109;
$arv2 = 15;

$var1 = $arv1 < $arv2;
if ($var1 === true) {
    echo "true";
} else if (!$var1) {
    echo "false";
}
