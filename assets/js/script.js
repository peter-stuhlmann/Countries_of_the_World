function countries() {

    let inputCountry = document.querySelector('#country-input').value || '49'

    fetch(`https://restcountries.eu/rest/v2/callingcode/${inputCountry}`)
        .then(
            response => response.json()
        )
        .then(
            country => {
                let countries = [];

                countries.push(`
                <h2>${country[0].name} (${country[0].alpha2Code})</h2>
                <p><strong>${country[0].name}</strong> <i>(in ${country[0].languages[0].name}: "${country[0].nativeName}")</i>, officially the <strong>${country[0].altSpellings[1]}</strong> is a country in ${country[0].subregion}. The capital is ${country[0].capital}. ${country[0].name} has about ${country[0].population} inhabitants and covers an area of ${country[0].area} square kilometres. </p>
                <div class="flag"><img src="${country[0].flag}"><br>
                <i>Flag of ${country[0].name}.</i></div> 
            `)

                document.querySelector('#country').innerHTML = countries.join('')
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