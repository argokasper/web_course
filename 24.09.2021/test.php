<?php

printf('testing');

$number = 0;

if ($number === 0) {
    printf('This is zero');
}


/**
 * @param int $number
 * @return int
 */
function addFiveToNumber(int $number): int {
    return $number + 5;
}

printf(addFiveToNumber(10));
