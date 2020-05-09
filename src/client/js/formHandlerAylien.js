function handleSubmitAylien(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('phrase').value

    // checking if empty
    if (checkInputPhrase(formText)) {
        console.log("::: Phrase Submitted :::")
        checkPhrase(formText)
    };

}

function checkInputPhrase(text) {
    if (!text) {
        alert("Please enter a phrase about something of your choice!");
        return false;
    }
    if (text.length <= 8) {
        alert("Pleaser enter a longer phrase!");
        return false;
    }
    return true;
}

function checkPhrase(text) {
    fetch('/phrase', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ text }),
        })
        .then(res => {
            return res.json()
        })
        .then(function(data) {
            document.getElementById('phrase-polarity').innerHTML = `${data.polarity}`;
            document.getElementById('confidence-pol').innerHTML = `The API gives a polarity confidence of ${data.polarity_confidence.toFixed(2)}.`
        })
}

export { handleSubmitAylien, checkPhrase, checkInputPhrase }