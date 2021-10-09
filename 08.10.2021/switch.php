<?php
// Lisalugemist, -uurimist: https://www.w3schools.com/php/php_switch.asp

$type = 'STORY';

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

echo "Tüüp on: $type ja DB tüüp on: $db_type";