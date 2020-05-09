function handleSubmitLang(event) {
    event.preventDefault()

    // check what text was put into the form field
    let formText = document.getElementById('language').value

    // checking if empty
    if (checkInputLang(formText)) {

        console.log("::: Language Submitted :::");
        checkLang(formText)
            .then(function(data) {
                console.log(data)
                document.getElementById('language-out').innerHTML = `--> ${data.lang} <--`;
                document.getElementById('confidence-lang').innerHTML = `The API gives a confidence of ${data.confidence.toFixed(2)}.`
            })
    }
}

function checkInputLang(text) {
    if (!text) {
        alert("Please enter a phrase in the language of your choice!");
        return false;
    }
    if (text.length <= 3) {
        alert("Pleaser enter a longer phrase!");
        return false;
    }
    return true;
}


const checkLang = async(text) => {
    const res = await fetch('/lang', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    })
    try {
        const data = await res.json();
        return data;
    } catch (error) {
        console.log("error", error);
    };
}

export {
    handleSubmitLang,
    checkLang,
    checkInputLang,
}