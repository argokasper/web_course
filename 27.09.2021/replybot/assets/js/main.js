window.onload = () => { // ootame ära, kuni HTML on end browser'is ära laadinud ja alles siis käivitame muud JS funktsioonid
    console.log('laadisin ära');

    const form = document.getElementById('form');
    form.addEventListener('submit', sendRequest);

    // delete nuppude triggerite lisamine
    const deleteButtons = document.getElementsByClassName('delete');
    for(button of deleteButtons) {
        // seome ära 'click' event'i kõikidele delete nuppudele
        button.addEventListener('click', deleteMessage);
    }

    const messageInput = document.getElementById('messageInput');
    messageInput.addEventListener('change', checkInput);


    /**
     * Tekitame funktsiooni, mis saadab serverisse meie saadetud sõnumi
     * @param {SubmitEvent} event
     */
    function sendRequest(event) {
        document.getElementById('sendButton').disabled = true; // Keelame saata, kuni pole vastust saanud
        const message = document.getElementById('messageInput').value;

        addMyMessage(message); // lisame ka enda kirjutatud sõnumi vaatevälja
        document.getElementById('messageInput').value = ''; // teeme oma sisendi tühjaks

        event.preventDefault(); // kui see .preventDefault() välja kutsuda, siis ei käivitata browseri vaikimisi päringut
        const postParams = `message=${message}`;
        const Http = new XMLHttpRequest();
        const url='/replybot/logic/receive.php';

        Http.open('POST', url);
        Http.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        Http.send(postParams);

        // Kuulame päringu erinevaid evente
        Http.onreadystatechange = (e) => {
            // Püüame kinni done(4) event'i kui status on 200 (OK)
            if (Http.readyState === 4) {
                if (Http.status === 200) {
                    const reply = (JSON.parse(Http.responseText)).reply;
                    const container = document.getElementById('pastMessages');
                    const messageContainer = document.createElement('div');
                    messageContainer.className = 'messages';

                    messageContainer.innerHTML = `<p>${reply}</p>`
                    container.appendChild(messageContainer);
                    scrollBottom(container);
                }
                document.getElementById('sendButton').disabled = false; // Lubame nuppu uuesti vajutada
            }
        }
    }

    /**
     *
     * @param {string} message
     */
    function addMyMessage(message) {
        const container = document.getElementById('pastMessages');
        const messageContainer = document.createElement('div');
        messageContainer.className = 'messages my-messages';

        messageContainer.innerHTML = `<p>${message}</p>`
        container.appendChild(messageContainer);
        scrollBottom(container);
    }

    /**
     * Kasutaja kustusamise nupu vajutuse peale käivitatav JS funktsioon.
     * Siin kutsume välja meie PHP delete funktsiooni üle HTTP päringu
     * @param {PointerEvent} event
     */
    function deleteMessage(event) {
        const button = event.target;
        const messageId = button.dataset.id;

        const Http = new XMLHttpRequest();
        const url=`/replybot/logic/delete.php?message_id=${messageId}`;

        Http.open('DELETE', url);
        Http.send();

        // Kuulame päringu erinevaid evente
        Http.onreadystatechange = (e) => {
            // Püüame kinni done(4) event'i kui status on 200 (OK)
            if (Http.readyState === 4 && Http.status === 200) {
                const messageContainer = button.parentNode;
                messageContainer.remove()
            } else if (Http.readyState === 4 && Http.status !== 200) {
                console.log('Ilnes viga!');
            }
        };
    }

    function checkInput(event) {
        const value = event.target;
        const sendButton = document.getElementById('sendButton');
        sendButton.disabled = target.value.length > 0;
    }
};

/**
 *
 * @param {HtmlElement} container
 */
function scrollBottom(container) {
    container.scrollTop = container.scrollHeight;
}
