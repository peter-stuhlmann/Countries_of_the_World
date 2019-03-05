fetch("https://restcountries.eu/rest/v2/callingcode/49")
    .then(
        response => response.json()
    )
    .then(
        country => {
            let countries = [];

            countries.push(`
                <h2>${country[0].name}</h2>
                <div>${country[0].name} <i>(in ${country[0].languages[0].name}: "${country[0].nativeName}")</i> is a country in ${country[0].subregion}. The capital is ${country[0].capital}. ${country[0].name} has about ${country[0].population} inhabitants.</div> 
            `)

            document.querySelector('#country').innerHTML = countries.join('')
        }
    )
    .catch(
        err => console.log(`Error: ${err}`)
    )