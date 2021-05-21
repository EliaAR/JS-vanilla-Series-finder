// let series = {
//   name: "",
//   image: "",
// };

let searchContainer = document.querySelector(".js-searchContainer");
let inputText = document.querySelector(".js-inputText");
let button = document.querySelector(".js-buttonSearch");
let APIResults = [];

if (localStorage.getItem("APIResults")) {
  APIResults = JSON.parse(localStorage.getItem("APIResults"));
}

function printContent(evt) {
  let content = "";
  evt.forEach(function (serie) {
    if (serie.show.image) {
      content += `<li><img src="${serie.show.image.medium}"/> ${serie.show.name}</li>`;
    } else {
      content += `<li><img src="https://via.placeholder.com/210x295/ffffff/666666/?text=TV"/> ${serie.show.name}</li>`;
    }
  });
  searchContainer.innerHTML = `<ul> ${content}</ul>`;
}

function result() {
  fetch(`http://api.tvmaze.com/search/shows?q=${inputText.value}`)
    .then((response) => response.json())
    .then((data) => {
      let content = "";
      printContent(data);
      APIResults.push({
        searchValue: inputText.value,
        results: data,
      });
      localStorage.setItem("APIResults", JSON.stringify(APIResults));
    });
}

function comprobation(evt) {
  evt.preventDefault();
  let cachedResult = APIResults.find(
    (item) => item.searchValue === inputText.value
  );
  if (!cachedResult) {
    result();
  } else {
    printContent(cachedResult.results);
  }
}
button.addEventListener("click", comprobation);
