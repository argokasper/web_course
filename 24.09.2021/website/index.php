<?php
// index.php on vaikimisi faili nimi, mille PHP veebiserverid üles korjavad ja loevad
// PHP fail peab algama <?php märgendiga!!

echo "tere"; // kirjutab välja "tere"
print("tere"); // kirjutab välja "tere", sanrnane 'echo'-ga
echo '</br>'; // üks viis HTML-i kirjutada (ei soovita, kuna VS Code jt programmid ei highlight'i süntaksit ära)

// Kasutame siin printf() - 'f' funktsiooni nimes viitab format'ile ehk vormindamisele, sellele saab kaasa anda stiili
// Kasutame siin new DateTime() - loob kuupäeva objekti, kui jätta sulud tühjaks, võetakse süsteemi praegune aeg
// Kuna objekti ei saa koos tekstiga  PHP-s välja kirjutada, siis tuleb objektilt küsida tekstilist väärtust,
// seda saab ->format() meetodiga, seda meetodit saab ainult välja kutsuda tervelt objektilt,
// seepärast olen pannud sulud ümber (new DateTime()), sest kui oleks "new DateTime()->format()",
// siis PHP loeks seda kui "DateTime()->format()" ning see ei ole korrektne süntaks
printf("Praegune kellaaeg on: " . (new DateTime())->format('Y-m-d H:i:s'));

// Kirjeldame vajalikke funktsioone:
// Algoritmi näide
function addOne(int $num): int
{
    return $num + 1;
}

// Loome muutuja, mida saame ümberväärtustada ning kasutada väärtuse kuvamises
// Algväärtustame mängu arvu:
$calculatedArv = 0;

// Siin kontrollime kas URL'is on saadetud 'arv' parameeter,
// sest kui ei ole, siis me ei saa 'addOne()' funktsiooni välja kutsuda,
// kuna ei ole numbrit, mida kasutada
// väärtustame if-i sees abimuutuja '$arv'
if (isset($_GET['arv']) && $arv = $_GET['arv']) {
    $calculatedArv = addOne($arv); // Kasutame funktsiooni, et taasväärtustada muutuja '$calulatedArv'
}

// kui tahta PHP skripti lõpetada, siis tuleb kasutada järgmist märgendit:
?>
<h1>Minu leht</h1>

<?php echo "tere jälle" ?>

<p><?php echo 10 + 10; ?></p> <!-- Saab ka nii PHP-d HTML-i sees kirjutada -->

<!-- Loome HTML vormi, mis lubab serverisse päringut saata, method'iks paneme GET,
mis lubab URL-is kaasa saata muutujaid, parameetreid -->
<form method="GET">
    <h2>Näidismäng:</h2>
    <label for="arv">Sisesta algusarv:</label>
    <input name="arv" type="text" value="<?php echo $calculatedArv; ?>" />
    <button type="submit">Liida üks</button>
    <p>Tulemus</p>
    <input disabled value="<?php echo $calculatedArv; ?>" />
</form>
