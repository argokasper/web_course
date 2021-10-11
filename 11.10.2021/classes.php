<?php

// Klass algab
class MyClass {
    private string $info;
    const ID = 10;

    /**
     * new MyClass()
     * new MyClass('Uus info')
     */
    public function __construct(string $info = 'Testing')
    {
        $this->info = $info;
    }

    public function getInfo(): string
    {
        return $this->info; // = 'Testing'
    }

    protected function setInfo(string $newVal): void
    {
        $this->info = $newVal;
    }
}
// Klass lõppeb

// MyClass laiendus:
class PublicLayer extends MyClass {
    public function giveNewInfo(string $value): void
    {
        $this->setInfo($value);
    }
}

$firstObject = new MyClass();
$myObject = new PublicLayer('Uus');
echo $firstObject->getInfo(); // struktuur objektilt pärimiseks: [OBJEKT]->[MUUTUJA]
echo "\n";
echo $myObject->getInfo();
echo "\n";

// Anname uue $info väärtuse:
$myObject->giveNewInfo('Mina olen uus väärtus');
echo "Läbi laiendatud klassi antud uus info väärtus: " . $myObject->getInfo();
echo "\n";

echo "Algab var_dump(firstObject):\n";
var_dump($firstObject);

echo "Algab var_dump(myObject):\n";
var_dump($myObject);

echo "Kas meie objekt on MyClass klassiga:\n";
// echo $myObject instanceof MyClass;

$xyz = 1;


// Tekstide liitmine:
$firstName = 'John';
$lastName = 'Smith';

echo "$firstName $lastName\n"; // => "John Smith"
echo $firstName . ' ' . $lastName; // => "John Smith"
