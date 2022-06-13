const input = document.getElementById('input');
const grid = document.getElementsByClassName('grid')[0];
const url = 'https://api.unsplash.com/search/photos/?query=';

input.addEventListener('keydown', function(e) {
    if(e.key === 'Enter') loadImages();
});

function loadImages() {
    removeImages();
    const searchUrl = url+input.value+'&per_page=12&client_id=eX7rkrcCsaU_lOKOuah-MsmKA7zJxOO3jpVIad5G9yQ';
    
    fetch(searchUrl)
    .then(response => {
        console.log(response)
        if(response.ok) return response.json();
        else 
            alert(response.status);
    })
    .then(data => {
        const imageNodes = [];
        for(let i = 0; i < data.results.length; i++){
            let div = imageNodes[i] = document.createElement('div');
            let imageElem = imageNodes[i] = document.createElement('img');
            div.appendChild(imageElem);
            imageElem.src = `${data.results[i].urls.small}`;
            // imageNodes[i].style.backgroundImage = 'url('+data.results[i].urls.small+')';
            // imageNodes[i]
            grid.appendChild(div);
            console.log(imageNodes)
        };
    });
};

function removeImages() {
    grid.innerHTML = '';
};