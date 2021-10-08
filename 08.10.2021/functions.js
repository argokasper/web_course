// function [functionName]()
function myFunction() {
    console.log('Hello world!');
}

// Funktsiooni välja kutsumine:
myFunction();

// argumendiga funktsioon
function getMax(num1, num2) {
    return Math.max(num1, num2);
}
const tulemus = getMax(231, 1234);

console.log(tulemus);


// funktsioon, mille nimi on 'astenda', kuid mis on defineeritud kui objekt
const astenda = function (baseNum, powerNum) {
    return baseNum**powerNum;
}

console.log(astenda(12314, 2));

//
const vanusPaevades = (startDate) => {
    const currentDate = new Date();
    console.log(currentDate);

    const parsedDate = new Date(startDate);

    const dateDiff = (currentDate - parsedDate) / (1000 * 60 * 60 * 24);


    return Math.floor(dateDiff);
}

console.log(vanusPaevades('2021-01-01'));
