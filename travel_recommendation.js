const searchTxt = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');
const resultDiv = document.getElementById('result');

const apiUrl = './travel_recommendation_api.json';

clearBtn.onclick = () => {
    searchTxt.value = '';
    resultDiv.innerHTML = '';
    resultDiv.style.display = 'none';
}

searchTxt.onkeydown = (e) => {
    if (e['key'] == 'Enter'){
        search();
    }
}

searchBtn.onclick = search;

function search() {
    // debugger;
    fetch(apiUrl).then(res => res.json())
    .then((data) => {
        const query = searchTxt.value.toLowerCase();
        const result = []
        for (const [key, val] of Object.entries(data)) {
            if (key == 'countries'){
                val.forEach(element => {
                    element['cities'].forEach(c => {
                        if (c.name.includes(query) || c.description.includes(query) || element.name.includes(query) || key.includes(query)) {
                            result.push({name: c.name, imageUrl: c.imageUrl, description: c.description});
                        }
                    })
                });
            }
            else {
                val.forEach(element => {
                    if (element.name.includes(query) || element.description.includes(query) || element.name.includes(query) || key.includes(query)) {
                        result.push({name: element.name, imageUrl: element.imageUrl, description: element.description});
                    }
                })
            }
        }

        displayResult(result);
        
    }).catch((err) => {
        console.error(err);
    });
}

function displayResult(result) {
    resultDiv.innerHTML = result.map(r => `
             <div class="result-card">
                <img src="${r.imageUrl}" alt="">
                <h2>${r.name}</h2>
                <p>${r.description}</p>
                <button>Visit</button>
            </div>
        `).join();
    resultDiv.style.display = 'flex';
}