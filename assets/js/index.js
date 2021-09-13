const errorMessage = document.getElementById("error");
const loadingSpinner = document.getElementById("loading__spinner");
const modalContainer = document.getElementById("modal__container");
errorMessage.style.display = "none";
loadingSpinner.style.display = "none";
modalContainer.style.display = "none";

//load data from api

const loadAlCountry = () => {
  loadingSpinner.style.display = "block";
  fetch("https://restcountries.eu/rest/v2/all")
    .then((res) => res.json())
    .then((data) => {
      loadingSpinner.style.display = "none";
      displayAllCountry(data);
    })
    .catch((error) => {
      errorMessage.style.display = "block";
      errorMessage.innerHTML = `
            <p class="error">${error}</p>
      `;
    });
};

// call function
loadAlCountry();

// display data from api

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

//  show details in a modal

const openModal = (name) => {
  loadingSpinner.style.display = "block";
  fetch(`https://restcountries.eu/rest/v2/name/${name}`)
    .then((res) => res.json())
    .then((data) => {
      loadingSpinner.style.display = "none";
      displayModal(data[0]);
    });
};

// display modal contents

const displayModal = (country) => {
  // destructure object properties

  const {
    name,
    region,
    population,
    numericCode,
    nativeName,
    demonym,
    capital,
    topLevelDomain,
    subregion,
    area,
    alpha3Code,
    languages,
    translations,
    timezones,
    currencies,
    callingCodes,
  } = country;

  modalContainer.textContent = "none";
  modalContainer.style.display = "block";
  const modal = document.createElement("div");
  modal.classList.add("modal");
  modal.innerHTML = `
          <div class = "modal__content">
            <div class="modal__header">
              <h2>Name: ${name}</h2>
              <button id="close__modal" onclick = "closeModal()">&times;</button>
            </div>
            <div class="modal__body">
            <table>
              <tbody>
                <tr>
                  <td>Capital</td>
                  <td>${capital} </td>
                </tr> 
                <tr>
                  <td>Area</td>
                  <td> ${area} </td>
                </tr> 
                <tr>
                  <td>Alpha3 Code</td>
                  <td>${alpha3Code} </td>
                </tr>  
                <tr>
                  <td>Calling Code</td>
                  <td>${callingCodes[0]} </td>
                </tr> 
                <tr>
                  <td>Region</td>
                  <td> ${region}</td>
                </tr> 
                <tr>
                  <td>Subregion</td>
                  <td> ${subregion}</td>
                </tr> 
                <tr>
                  <td>Population</td>
                  <td>${population}</td>
                </tr> 
                <tr>
                  <td>Translations</td>
                  <td>${translations.de}</td>
                </tr> 
                <tr>
                  <td>Currencies Name</td>
                  <td>${currencies[0].name}</td>
                </tr> 
                <tr>
                  <td>Currencies Symbol</td>
                  <td>${currencies[0].symbol}</td>
                </tr> 
                <tr>
                  <td>Numeric Code</td>
                  <td>${numericCode}</td>
                </tr> 
                <tr>
                  <td>Native Name</td>
                  <td>${nativeName}</td>
                </tr> 
                <tr>
                  <td>Timezones</td>
                  <td>${timezones[0]}</td>
                </tr> 
                <tr>
                  <td>Top Level Domain</td>
                  <td>${topLevelDomain[0]}</td>
                </tr>
                <tr>
                  <td>Demonym</td>
                  <td>${demonym}</td>
                </tr>          
              </tbody>
            </table>
            </div>
            <div class="modal__footer">
              <h4>Language : ${languages[0].name}</h4>
            </div>
          </div>
  `;

  modalContainer.appendChild(modal);
};

// modal close button

const closeModal = () => {
  modalContainer.style.display = "none";
};
