window.onload = function () {
    document.getElementById('search-input').focus();
};
const filePath = './travel_recommendation_api.json';
const searchButton = document.getElementById('search-button');
const resetButton = document.getElementById('reset-button');
const searchInput = document.getElementById('search-input');
const resultsContainer = document.getElementById('results');
searchButton.addEventListener('click', search);
searchInput.addEventListener('keypress', event => {
    if (event.key === 'Enter') {
        search();
    }
});
function search() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm === '') {
        resultsContainer.innerHTML = '<h3>No results found.</h3>';
        return;
    }
    resultsContainer.innerHTML = ''; // Clear previous results
    fetch(filePath)
        .then(response => response.json())
        .then(data => {
            const keys = Object.keys(data);
            if (keys.length > 0) {
                const filteredResults = keys.filter(key => key.toLowerCase().includes(searchTerm));
                filteredResults.map(key => {
                    const item = data[key];
                    if (key === 'countries') {
                        for (let i = 0; i < item.length; i++) {
                            for (let j = 0; j < item[i].cities.length; j++) {
                                const resultItem = document.createElement('div');
                                resultItem.className = 'result-item';
                                resultItem.innerHTML = `
                                <img src="${item[i].cities[j].imageUrl}" alt="${item[i].cities[j].name}" class="result-image">
                    <h2>${item[i].cities[j].name}</h2>
                    <p>${item[i].cities[j].description}</p>
                `;
                                resultsContainer.appendChild(resultItem);
                            }
                        }
                    } else {
                        //*********************************************************************************************** */

                        for (let i = 0; i < item.length; i++) {
                            const resultItem = document.createElement('div');
                            resultItem.className = 'result-item';
                            resultItem.innerHTML = `
                                <img src="${item[i].imageUrl}" alt="${item[i].name}" class="result-image">
                    <h2>${item[i].name}</h2>
                    <p>${item[i].description}</p>
                `;
                            resultsContainer.appendChild(resultItem);
                        }








                    }
                });
            }
        })
        .catch(error => {
            console.error('Error loading data:', error);
        });
}
resetButton.addEventListener('click', () => {
    searchInput.value = '';
    resultsContainer.innerHTML = ''; // Clear results
    document.getElementById('search-input').focus();
});