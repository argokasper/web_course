<?php

// Ette on antud tüüpide massiiv, millele tahame DB type vasteid.
// DB tüübid välja echoda kasutades tsüklit

$types = ['NUMBER', 'FLOAT', 'STORY', 'TEKST'];

foreach ($types as $type) {
    switch ($type) {
        case 'TEKST':
            $db_type = 'varchar';
            break;
        case 'NUMBER':
            $db_type = 'integer';
            break;
        case 'FLOAT':
            $db_type = 'float';
            break;
        case 'STORY':
            $db_type  = 'text';
            break;
        default:
            throw new Exception('Invalid type');
    }
    echo "Tüüp on: $type ja DB tüüp on: $db_type\n";
}


$types = ['NUMBER', 'FLOAT', 'STORY', 'TEKST']; // [0]='NUMBER', [1]='FLOAT', ...
// Kasutades for:
for ($i = 0; $i < count($types); $i++) {
    switch ($types[$i]) {
        case 'TEKST':
            $db_type = 'varchar';
            break;
        case 'NUMBER':
            $db_type = 'integer';
            break;
        case 'FLOAT':
            $db_type = 'float';
            break;
        case 'STORY':
            $db_type  = 'text';
            break;
        default:
            throw new Exception('Invalid type');
    }
    echo "Tüüp on: $types[$i] ja DB tüüp on: $db_type\n";
}
