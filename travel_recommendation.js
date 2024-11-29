const searchTxt = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn');
const clearBtn = document.getElementById('clearBtn');

clearBtn.onclick = () => {
    searchTxt.value = '';
}