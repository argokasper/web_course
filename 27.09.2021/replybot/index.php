<?php
// Esileht, url=/
// teeme lehe avalikuks urlil: argo.local/replybot
?>
<!DOCTYPE html>
<html>
    <?php
    // Lisame siia template'i, mis on taaskasutatav kõikide lehtede <head> osas
    // See annab meile võimaluse taaskasutada sama faili mitmes lehes
    include_once('partials/head.php');
    ?>
    <title>ReplyBot</title>
    <script src="js/main.js"></script>
<body>

    <h1>Tere tulemast ReplyBot-i!</h1>
    <subtitle>Võid siia kirjutada mida iganes ning ReplyBot vastab sulle alati.</subtitle>
    <section
        id="pastMessages"
        style="
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            height: 500px;
            width: 400px;
            border: 1px solid #000;
            padding: 10px;
            margin-top:10px;
            margin-bottom:10px;
            overflow-y: auto;
            "
        >
        <?php
            $messages = [];
            // tahame siia html'i, siis
            ?>
                <div></div>
            <?php
            // Kui pole ühtegi sõnumit, siis kuvame infot selle kohta
            if (count($messages) === 0) { ?>
                <div style="
                    flex-shrink: 0;
                    align-self: flex-start;
                    min-width: 100px;
                    max-width: 300px;
                    min-height: 20px;
                    line-height: 20px;
                    margin: 10px;
                    padding: 5px;
                    border-radius: 10px;
                    background-color: dodgerblue;
                    color: white;
                ">
                    <p>Hetkel sõnumid puuduvad.</p>
                </div>
            <?php } else {
                // Siia ilmub saadetud sõnumite vastused
                // kasutme tsükleid, et kuvada välja kõik vastused
                foreach ($messages as $message) {
                    // loome sõnumite plokke
                    // tegevused
                }
            }

        ?>
    </section>
    <form
        id="form"
        style="
            width: 420px;
            display: flex;
            flex-direction:row;
            justify-content: space-between;
        "
    >
        <textarea
            placeholder="Kirjuta midagi ReplyBot'ile"
            id="messageInput"
            type="text"
            name="message"
            rows="2"
            maxlength="255"
            style="
                min-height:40px;
                max-height:150px;
                width:300px;
                min-width:300px;
                max-width:300px;
                padding:5px;
            "
        ></textarea>
        <button id="sendButton" type="submit">Saada</button>
    </form>
</body>
</html>
