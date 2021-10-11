const xyz = 1; // muutujat ei saa teistkordselt väärtustada
var test = 1; // muutujat saab väärtustada lõpmtatu arv kordi
otherTest = 2; // muutujat saab väärtustada lõpmtatu arv kordi

console.log(xyz);

class MyClass {
    variable = 'tere';


}
const variable = 'test';
console.log('prindin välja:', variable);


const myClass = new MyClass();

console.log(myClass.variable); // struktuur objektilt pärimiseks: [OBJEKT].[MUUTUJA]

// tekstide liitmine:
const text1 = 'Hello';
const text2 = 'World';

console.log(text1 + ' ' + text2 + '!'); // Hello World!