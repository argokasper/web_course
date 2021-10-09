// Lisaligemist, -uurimist: https://www.w3schools.com/js/js_switch.asp

const tekst = 'Tere tere tere';

var vastus = 'placeholder';

switch (tekst) {
    case 'Hello World!':
        vastus = 'Hello';
        break;
    case 'Hello all!':
    case 'Hello':
    case 'Tere tere':
        vastus = 'Hi again!';
        break;


}

console.log(vastus);