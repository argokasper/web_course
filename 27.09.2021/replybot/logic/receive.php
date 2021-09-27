<?php
header("Content-Type: application/json; charset=UTF-8"); // määrame ära, et kõik sereri vastused on json kujul

$message = ''; // algväärtustame muutuja

// kontrollime, kas muutuja 'message' on saadetud ning kas see pole tühi
if (isset($_POST['message']) && $_POST['message'] !== '') {
    $message = $_POST['message'];

    sleep(rand(1, 4)); // Pausime skripti 1-4 sekundiks - jätame mulje, et BOT mõtleb

    $reply = processMessage($message);
    sendResponse([ 'reply' => $reply ]);
} else {
    // Tegeleme veaga. Kui message'it ei saadeta serverisse, siis saadame vastuseks veateate
    echo json_encode($_POST);
    sendResponse([ 'error' => 'No message sent' ], 422);
}

/**
 * BOT'i aju, siia lisame reegleid, kuidas BOT peaks vastame mingitele sisenditele
 */
function processMessage(string $message): string {
    switch ($message) {
        case 'Kuidas sul läheb?':
            $possibleReplies = ['Hästi', 'Halvasti', 'Pole viga. Kuidas endal?'];
            return (string)$possibleReplies[array_rand($possibleReplies, 1)];
        default:
            $possibleReplies = ['Ei saanud aru.', 'Ma ei ole veel nii osav', 'Olen väsinud, küsi homme uuesti, äkki siis tean'];
            return (string)$possibleReplies[array_rand($possibleReplies, 1)];
    }
}

/**
 * Saadame päringu browserisse
 * Lisame päiseid ning vormindame data JSON kujule
 */
function sendResponse(array $data, int $statusCode = 200) {
    http_response_code($statusCode);
    echo json_encode($data);
}
