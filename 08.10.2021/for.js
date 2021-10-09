// Lisalugemist, -uurimist:
// 1. https://www.w3schools.com/js/js_loop_for.asp
// 2. https://www.w3schools.com/js/js_loop_forin.asp
// 3. https://www.w3schools.com/js/js_loop_forof.asp

algarv = 0; // lõpp tulemus oleks 10;
// console.log(`algarv on ${algarv}`);

// Taoline viis on brute-force  / kilplaslik:
// algarv = algarv + 1;
// console.log(`algarv on ${algarv}`);
// algarv = algarv + 1;
// console.log(`algarv on ${algarv}`);
// algarv = algarv + 1;
// console.log(`algarv on ${algarv}`);
// algarv = algarv + 1;
// console.log(`algarv on ${algarv}`);
// algarv = algarv + 1;
// console.log(`algarv on ${algarv}`);
// algarv = algarv + 1;
// console.log(`algarv on ${algarv}`);
// algarv = algarv + 1;
// console.log(`algarv on ${algarv}`);
// algarv = algarv + 1;
// console.log(`algarv on ${algarv}`);
// algarv = algarv + 1;
// console.log(`algarv on ${algarv}`);
// algarv = algarv + 1;
// console.log(`algarv on ${algarv}`);

// Näide 1
// for (var lugeja = 0; lugeja < 10; lugeja = lugeja + 1) {
//     algarv = algarv + 1;
//     console.log(`algarv on ${algarv}`);
// }

// Näide 1 lihtsustatud
// for (algarv; algarv < 10; algarv = algarv + 1) {
//     console.log(`algarv on ${algarv}`);
// }

// Näide 1 veelgi lihtsustatud
// for (algarv; algarv < 10; algarv++) {
//     console.log(`algarv on ${algarv}`);
// }

// for (algarv = 1; algarv < 10; algarv *= 3) {
//     console.log(`algarv on ${algarv}`);
// }

for (var i = 1; i < 10; i *= 3) {
    algarv += 3;
    console.log(`algarv on ${algarv}`);
}

// algarv++; // => algarv = algarv + 1 => algarv += 1

console.log(`algarv on nüüd ${algarv}`);

console.log('foreach näide (for of):');

const arvud = [5, 3, 677, 2, 2, 221];
// foreach of - käib üle massiivi väärtuste
// siin esimesel kohal on ajutine taasväärtustatav muutuja, ning teisel kohal on array või list
for (var arv of arvud) {
    console.log(arv);
}

console.log('foreach näide (for in):');
// foreach in - käib üle objekti või massiivi atribuutide
for (var arv in arvud) {
    console.log(arv);
}
const obj = {
    arg1: 'value1',
    arg2: 'value2',
    arg3: 'value3',
    arg4: 'value4',
}

for (var argument in obj) {
    console.log(argument);
}

for (var values of Object.values(obj)) {
    console.log(values);
}

