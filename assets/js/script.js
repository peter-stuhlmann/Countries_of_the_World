"use strict";

function countries() {

    let inputCountry = document.querySelector('#country-input').value || '1'

    fetch(`https://restcountries.eu/rest/v2/callingcode/${inputCountry}`)
        .then(
            response => response.json()
        )
        .then(
            country => {
                if (country.status == 404) {
                    document.querySelector('#country').innerHTML = country.status
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

                    document.querySelector('#country').innerHTML = countries.join('')
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

document.querySelector('#country-input').addEventListener('keypress', function (e) {
    if (e.keyCode === 13) {
        countries()
    }
});
