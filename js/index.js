const input = document.getElementById("input");
const grid = document.getElementsByClassName("grid")[0];
const url = "https://api.unsplash.com/search/photos/?query=";

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") loadImages();
});

function loadImages() {
  removeImages();
  const searchUrl =
    url +
    input.value +
    "&per_page=12&client_id=eX7rkrcCsaU_lOKOuah-MsmKA7zJxOO3jpVIad5G9yQ";
    
  fetch(searchUrl)
    .then((response) => {
      if (response.ok) return response.json();
      ///edit code to say image is not found or your internet connection is not strong
      else alert(response.status);
    })
    .then((data) => {
      const imageNodes = [];
      for (let i = 0; i < data.results.length; i++) {
        let div = (imageNodes[i] = document.createElement("div"));

        let divChild = document.createElement("div");
        divChild.className = "img-siblingBox";

        // Declare a variable and create the child elements for divChild element
        let creatorImageBox = document.createElement("img");
        let creatorName = document.createElement("p");
        creatorImageBox.className = "creator-img-box";
        creatorName.className = "creator-name";
        let icon = document.createElement("i");
        icon.classList.add("fa-solid", "fa-download");

        // Assigning values to the child elements for divChild element
        creatorImageBox.src = `${data.results[i].user.profile_image.medium}`;
        creatorName.innerHTML = `${data.results[i].user.name}`;

        // append the creatorImageBox, creatorName and download button to their parent container which is divChild
        divChild.append(creatorImageBox, creatorName, icon);

        // declare a variable and create the image node
        let imageElem = (imageNodes[i] = document.createElement("img"));
        // get the source link of the images
        imageElem.src = `${data.results[i].urls.regular}`;
        console.log(data);
        console.log(imageElem.src);

        // A hover effect that reveals the overlay and imageboxsibling
        div.addEventListener("mouseover", () => {
          divChild.style.transform = "translateY(0%)";
          div.style.setProperty("--transform-up", "translateY(0%)");

          divChild.style.transition = "all .5s linear";
          div.style.setProperty("--image-before-transition", "all .5s linear");
        });

        div.addEventListener("mouseout", () => {
          divChild.style.transform = "";
          div.style.setProperty("--transform-up", "");

          divChild.style.transition = "all .01s linear";
          div.style.setProperty("--image-before-transition", "all .01s linear");
        });

        // Download image selected
        icon.addEventListener("click", () => {
          fetch(imageElem.src)
            .then((resp) => resp.blob())
            .then((blob) => {
              const url = window.URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.style.display = "none";
              a.href = url;
              // the filename you want
              a.download = input.value.replace("/ /g", "_");
              document.body.appendChild(a);
              a.click();
              window.URL.revokeObjectURL(url);
            })
            .catch(() => alert("Network Error! Please try again"));
        });

        // append the imageElement and it's sibling box to their parent container which is div
        div.append(imageElem, divChild);
        // append the div element to the grid which it's parent container
        grid.appendChild(div);
      }
    });
}

function removeImages() {
  grid.innerHTML = "";
}
