<?php

/**
 * Kahe arvu liitmine
 */
function sumIntegers(int $num1, int $num2): int
{
    return $num1 + $num2;
}

/**
 * Kahe arvu arvutamine erineva tehtemärgiga(+-/*)
 * Boonusülesanne
 */
function calculateIntegers(int $num1, int $num2, string $operation = '+'): int
{
    switch ($operation) {
        case '+':
            return $num1 + $num2;
        case '-':
            return $num1 - $num2;
        case '*':
            return $num1 * $num2;
        case '/':
            return $num1 / $num2;
        default:
            throw new Exception('Invalid operation selected');
    }
}

// Algväärtustame serverisse saadetud arvud:
$number1 = 0;
$number2 = 0;

// Algväärtustame kahe arvu tulemuse:
$calculation = null;

// Algväärtustame tehte:
$operation = '+';

// Kontrollime GET parameetreid
if (isset($_GET['arv1']) && isset($_GET['arv2'])) {
    $number1 = $_GET['arv1'];
    $number2 = $_GET['arv2'];
    // Boonusülesanne
    if (isset($_GET['tehe'])) {
        $operation = urldecode($_GET['tehe']);
        $calculation = calculateIntegers($number1, $number2, $operation);
    } else {
        $calculation = sumIntegers($number1, $number2);
    }
}

?>

<form method="GET">
    <label for="arv1">Esimene arv:</label>
    <input type="number" value="<?php echo $number1 ?>" name="arv1" />

    <label for="arv2">Teine arv:</label>
    <input type="number" value="<?php echo $number2 ?>" name="arv2" />

    <!-- Boonusülesande osa - tehte valik -->
    <label for="tehe">Vali tehe:</label>
    <select name="tehe">
        <option <?php echo $operation === '+' ? 'selected' : '' ?> value="<?php echo urlencode('+'); ?>">Liida</option>
        <option <?php echo $operation === '-' ? 'selected' : '' ?> value="<?php echo urlencode('-'); ?>">Lahuta</option>
        <option <?php echo $operation === '*' ? 'selected' : '' ?> value="<?php echo urlencode('*'); ?>">Korruta</option>
        <option <?php echo $operation === '/' ? 'selected' : '' ?> value="<?php echo urlencode('/'); ?>">Jaga</option>
    </select>

    <?php if (!is_null($calculation)) {?>
        <p><?php echo $calculation; ?></p>
    <?php } ?>

    <button type="submit">Arvuta</button>
</form>