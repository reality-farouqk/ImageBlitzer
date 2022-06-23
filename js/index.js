const input = document.getElementById('input');
const grid = document.getElementsByClassName('grid')[0];
const url = 'https://api.unsplash.com/search/photos/?query=';

input.addEventListener('keydown', function(e) {
    if(e.key === 'Enter') loadImages();
});

function loadImages() {
    removeImages();
    const searchUrl = url+input.value+'&per_page=12&client_id=eX7rkrcCsaU_lOKOuah-MsmKA7zJxOO3jpVIad5G9yQ';
    console.log(searchUrl)
    fetch(searchUrl)
    .then(response => {
        console.log(response)
        if(response.ok) return response.json();
        else 
            ///edit code to say image is not found or your internet connection is not strong
            alert(response.status);
    })
    .then(data => {
        const imageNodes = [];
        for(let i = 0; i < data.results.length; i++){
            let div = imageNodes[i] = document.createElement('div');

            let divChild = document.createElement('div');
            divChild.className = "img-siblingBox";

            // Declare a variable and create the child elements for divChild element
            let creatorImageBox = document.createElement('img');
            let creatorName = document.createElement('p');
            creatorImageBox.className = "creator-img-box";
            creatorName.className = "creator-name";
            let dlElem = document.createDocumentFragment()
            let icon = document.createElement('i')
            icon.classList.add('fa-solid', 'fa-download')
            dlElem.appendChild(icon)

            // Assigning values to the child elements for divChild element
            creatorImageBox.src = `${data.results[i].user.profile_image.medium}`
            creatorName.innerHTML = `${data.results[i].user.name}`

            // append the creatorImageBox, creatorName and download button to their parent container which is divChild
            divChild.append(creatorImageBox, creatorName, dlElem);

            // declare a variable and create the image node
            let imageElem = imageNodes[i] = document.createElement('img');
            // get the source link of the images 
            imageElem.src = `${data.results[i].urls.regular}`;
            
            // A hover effect that reveals the overlay and imageboxsibling
            div.addEventListener('mouseover', () => {
                divChild.style.transform = 'translateY(0%)'
                div.style.setProperty('--transform-up', 'translateY(0%)')
                
                divChild.style.transition = 'all .5s linear'
                div.style.setProperty('--image-before-transition', 'all .5s linear')
            })

            div.addEventListener('mouseout', () => {
                divChild.style.transform = ''
                div.style.setProperty('--transform-up', '')

                divChild.style.transition = 'all .01s linear'
                div.style.setProperty('--image-before-transition', 'all .01s linear')
            })
        
            // Download image selected 
            icon.addEventListener('click', ()=>{
                window.open(data.results[i].links.download,
                '_blank')
            })

            // append the imageElement and it's sibling box to their parent container which is div
            div.append(imageElem, divChild);
            // append the div element to the grid which it's parent container 
            grid.appendChild(div);    
        };
    });
};

function removeImages() {
    grid.innerHTML = '';
};
