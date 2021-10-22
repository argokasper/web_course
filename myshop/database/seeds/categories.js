// kaup24 peakategooriad:
const categories = [
    'Isikukaitsevahendid, desinfitseerijad',
    'Top pakkumisedUudisSoodusmüükTooted poes',
    'Spetsiaalsed kaitsevahendid',
    'Meditsiini tarvikud',
    'Hügieenitarbed',
    'Vitamiinid ja toidulisandid',
    'Emale ja lapsele',
    'Mööbel ja sisustus',
    'Kosmeetika, parfüümid',
    'Lapsed ja imikud',
    'Sanitaartehnika, remont, küte',
    'Kodumasinad, kodutehnika',
    'Sport, puhkus, matkamine',
    'Kodutarbed',
    'Jalanõud, riided ja aksessuaarid',
    'Arvutid ja IT- tehnika',
    'Lemmikloomatarbed',
    'Aiakaubad',
    'Mobiiltelefonid, foto-, videokaamerad',
    'Autokaubad',
    'Kingitused, peoatribuutika',
    'Erootikakaubad',
    'Nutikodu',
    'Toidukaubad',
    'Raamatud',
    'Kontoritarbed, koolikaubad, loometöö tooted',
    'Super pakkumine',
    'Outlet',
    'Tooted poes',
    'Brändid',
    'Uudised',
];

const insertValues = [];

for (var category of categories) {
    insertValues.push(`('${category}')`);
}

module.exports = [`INSERT INTO categories (name) VALUES ${insertValues.join(',')}`];
