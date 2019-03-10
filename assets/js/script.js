"use strict";

function countries() {

    let inputCallingCode = document.querySelector('#callingcode-input').value || `1`
    let inputCountry = document.querySelector('#country-input').value

    let fetchURL

    if (inputCountry == "") {
        fetchURL = `https://restcountries.eu/rest/v2/callingcode/${inputCallingCode}`
    } else {
        fetchURL = `https://restcountries.eu/rest/v2/name/${inputCountry}`
    }

    fetch(fetchURL)
        .then(
            response => response.json()
        )
        .then(
            country => {
                if (country.status == 404) {
                    document.querySelector('#country').innerHTML = `
                        Sorry, the calling code you entered does not exist.
                        <div class="flag"><img alt="404" src="assets/img/404.png">
                    `
                } else {

                    let countries = [];

                    for (let i = 0; i < country.length; i++) {

                        let alternateName = ""

                        if (country[i].altSpellings[1] !== undefined) {
                            alternateName = ` or also the <strong>${country[i].altSpellings[1]}</strong>`
                        } else {
                            alternateName = ""
                        }

                        countries.push(`
                            <div class="country">
                            <h2>${country[i].name} (${country[i].alpha2Code})</h2>
                            <p><strong>${country[i].name}</strong> <i>(in ${country[i].languages[0].name}: "${country[i].nativeName}")</i>${alternateName} is a country in ${country[i].subregion}. The capital is ${country[i].capital}. ${country[i].name} has about ${country[i].population} inhabitants and covers an area of ${country[i].area} square kilometres. </p>
                            <div class="flag"><img src="${country[i].flag}"><br>
                            <i>Flag of ${country[i].name}.</i></div> 
                            </div>
                        `)
                    }

                    document.querySelector('#country').innerHTML = `<strong>The results for callingcode +` + inputCallingCode + `</strong>` + countries.join('')
                }
            }
        )
        .catch(
            err => console.log(`Error: ${err}`)
        )
}

countries()
document.querySelector('#country-input-button').addEventListener('click', countries)


// 'Enter' instead of button click

document.querySelector('#callingcode-input').addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        countries()
    }
});

document.querySelector('#country-input').addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        countries()
    }
});