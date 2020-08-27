'use strict';

function formatQueryParams(params) {
    const queryItems = Object.keys(params).map(key => `${[encodeURIComponent(key)]}=${encodeURIComponent(params[key])}`);
    return queryItems.join('&');
}
function watchForm1() {
    $('.js-form').on('submit', function() {
        event.preventDefault();
        const newUrl = 'https://api.nps.gov/api/v1/parks'
        const stateArr = $('.js-state-entered').val().split(",");
        const maxResults = $('.js-result-amt').val();
        
        const apiKey = 'KfgL4a45v2k0Ce8DMr7fzfr3RUhPgXm7wRhJbgU6'
        getParks(newUrl, stateArr, maxResults, apiKey);
    })
}
function displayResults(responseJson, maxResults) {
    console.log(responseJson);
    
    $('.js-error').empty();
    $('.results-list').empty();
  
    for (let i = 0; i < responseJson.data.length & i < maxResults; i++) {
        $('.results-list').append(`<li><h3><a href="${responseJson.data[i].url}">${responseJson.data[i].fullName}</a></h3>
        <p>${responseJson.data[i].description}</p>
        </li>`);
    }
    $('.results').removeClass('hidden');
}

function getParks(newUrl, stateArr, maxResults, apiKey) {
   
    const params = {
        stateCode: stateArr,
        limit: maxResults
    }
   
    const queryString = formatQueryParams(params);
    const url = newUrl + '?' + queryString + '&api_key=' + apiKey;
    console.log(url);
   
    
    fetch(url)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
        $('.js-error').text(`Something went wrong: ${err.message}`);
    });
}




$(watchForm1);