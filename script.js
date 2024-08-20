const accessKey = "R1zcvEWavCMscsS5yp0PwI2HBtf9GBwsvJKA81SlbUY";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButton = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
  try {
    inputData = searchInputEl.value.trim();
    if (!inputData) {
      alert("Please enter a search query");
      return;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;
    console.log(url);
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);

    // Clear previous search results
    searchResultsEl.innerHTML = "";

    // Display search results
    data.results.forEach((image) => {
      const imageEl = document.createElement("img");
      imageEl.src = image.urls.small;
      searchResultsEl.appendChild(imageEl);
    });

    // Show the "Show more" button
    showMoreButton.style.display = "block";
  } catch (error) {
    console.error(error);
    alert("Error fetching search results");
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  searchImages();
});

showMoreButton.addEventListener("click", () => {
  page++;
  searchImages();
});