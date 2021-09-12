const errorMessage = document.getElementById("error");
const loadingSpinner = document.getElementById("loading__spinner");
errorMessage.style.display = "none";
loadingSpinner.style.display = "none";

const loadAlCountry = () => {
  fetch("https://restcountries.eu/rest/v2/all")
    .then((res) => res.json())
    .then((data) => displayAllCountry(data))
    .catch((error) => {
      errorMessage.style.display = "block";
      errorMessage.innerHTML = `
            <p class="error">${error}</p>
      `;
    });
};

loadAlCountry();

const displayAllCountry = (countryData) => {
  const countryContainer = document.getElementById("country__container");
  for (const country of countryData) {
    const singleCountry = document.createElement("div");
    singleCountry.classList.add("single__country");
    singleCountry.innerHTML = `
        <img src="${country.flag}" alt="${country.name}" />
        <h3>${country.name}</h3>

    `;
    countryContainer.appendChild(singleCountry);
  }
};

/* 
const spinner = (show) => {
  if (show === true) {
    loadingSpinner.style.display = "block";
  } else {
    loadingSpinner.style.display = "none";
  }
};
 */
