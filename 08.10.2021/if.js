// Lisalugemist, -uurimist: https://www.w3schools.com/js/js_if_else.asp

const number = 0;

if (number === 10) { // väär
    console.log('Number on 10');
} else if (number === 0) { // tõene
    console.log('Number on 0');
} else if (number % 2 === !0) { // tõene
    console.log('Number on paarisarv');
} else { // ALATI tõene
    console.log('Number on midagi muud');
}

const arv = 15;

const jaak2ga = arv % 2; // modulo tehe: https://press.rebus.community/programmingfundamentals/chapter/integer-division-and-modulus/

console.log(jaak2ga);

if (jaak2ga === 0) console.log(arv + ': ' + 'paarisarv'); // stringide kokkuliitmine contact stiilis: https://masteringjs.io/tutorials/fundamentals/string-concat (Esimene on teema kohta, aga seal on veel 2 meetodit lisaks)
else console.log(`${arv}: paaritu arv`); // string'ide kokku liitmine interpolatsiooniga (string interpolation `${variable}`): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals

// ----
console.log(!1);

// 0 ja 1 võivad olla ka tõeväärtused
if (arv % 2 === !0) { // 15 % 2 = 1; !0 = 1 => 1==1
    console.log('Number on paaritu arv');
}
console.log(typeof (arv % 2), typeof !0);

// -----

