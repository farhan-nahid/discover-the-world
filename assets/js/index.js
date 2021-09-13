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

// call function
loadAlCountry();

const displayAllCountry = (countryData) => {
  const countryContainer = document.getElementById("country__container");
  for (const country of countryData) {
    const singleCountry = document.createElement("div");
    singleCountry.classList.add("single__country");
    singleCountry.innerHTML = `
        <img src="${country.flag}" alt="${country.name}" />
        <h3>${country.name}</h3>
        <center> 
          <button class = "open__modal" onclick = "openModal('${country.name}')" >Details</button>
        </center>
    `;
    countryContainer.appendChild(singleCountry);
  }
};

// open modal

const openModal = (name) => {
  fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then((res) => res.json())
    .then((data) => displayModal(data[0]));
};

const displayModal = (country) => {
  console.log(country);
  const {
    name,
    region,
    population,
    numericCode,
    nativeName,
    demonym,
    capital,
    area,
    alpha3Code,
    languages,
  } = country;

  const modalContainer = document.getElementById("modal__container");
  modalContainer.textContent = "none";
  modalContainer.style.display = "block";
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
            <div class="modal__header">
              <h2>Name: ${name}</h2>
              <button id="close__modal" onclick = "closeModal()">&times;</button>
            </div>
            <div class="modal__body">
              <h5>Capital: ${capital} </h5>
              <h5>Area: ${area} </h5>
              <h5>Alpha3Code: ${alpha3Code} </h5>
              <h5>Region: ${region} </h5>
              <h5>Population: ${population} </h5>
              <h5>NumericCode: ${numericCode} </h5>
              <h5>NativeName: ${nativeName} </h5>
              <h5>Demonym: ${demonym} </h5>    
            </div>
            <div class="modal__footer">
              <h4>Language : ${languages[0].name}</h4>
            </div>

  `;

  modalContainer.appendChild(modal);
};

const closeModal = () => {
  document.getElementById("modal__container").style.display = "none";
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
