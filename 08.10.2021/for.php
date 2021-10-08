<?php

$algarv = 0;

// for ($i = 0; $i < 10; $i++) {
//     $algarv++;
//     echo "arv on nüüd: $algarv\n";
// }

for ($i = 10; $i > 0; $i--) {
    $algarv++;
    echo "$i ring: arv on nüüd: $algarv\n";
}

// for each loop
// kasutatakse kokkuloetavate andmetüüpide puhul: array, list
$arvud = [1, 4, 7, 3, 10]; // array

echo "foreach loop algab siit:\n";
// foreach'i esimesel kohal on array või list muutuja, ning teisel ajutine muutuja, mis saab iga ring uue väärtuse
foreach ($arvud as $arv) { // $arv = 1; $arv = 4; $arv = 7
    echo "$arv\n";
}

echo "foreach loop algab siit koos indeksiga:\n";
foreach ($arvud as $jarjekorraNumber => $arv) {
    echo "index=$jarjekorraNumber ja väärtus on=$arv\n";
}
