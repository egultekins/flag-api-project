fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    const container = document.querySelector(".countries-card-container");
    const detailsContainer = document.querySelector(".countries-card-container-2");
    const MainContent = document.querySelector(".country-details-cont");                                                
    const backButton = document.querySelector("a.back.button");
    const flag = document.querySelector(".country-flag");
    const name = document.querySelector(".country-name");
    const native = document.querySelector(".data-native");
    const population = document.querySelector(".country-population");
    const region = document.querySelector(".country-region");
    const subregion = document.querySelector(".country-subregion")
    const capital = document.querySelector(".country-capital");
    const language = document.querySelector(".country-lang");
    const currency = document.querySelector(".country-currency");
    const domain = document.querySelector(".country-domain");
    const filters = document.querySelector(".search-filter");


    // Render country cards
    const countryCards = data.map((country) => {
        console.log(data)
      return `
        <div class="country" 
             data-name="${country.name.common}"
             data-native="${country.name.official}" 
             data-population="${country.population}" 
             data-region="${country.region}" 
             data-subregion="${country.subregion ? country.subregion : "N/A" }"
             data-capital="${country.capital ? country.capital[0] : "N/A"}"
             data-lang="${country.languages ? Object.values(country.languages).join(", ") : "N/A"}"
             data-currency="${country.currencies ? Object.values(country.currencies).map(curr => `${curr.name}`).join(", ") : "N/A"}"
             data-domain="${country.tld ? country.tld.join(", ") : "N/A"}"
             data-flag="${country.flags.svg}">
          <img src="${country.flags.svg}" alt="${country.name.common}">
          <h3>${country.name.common}</h3>
          <div class="infos">
            <p><b>Population:</b> ${country.population.toLocaleString()}</p>
            <p><b>Region:</b> ${country.region}</p>
            <p><b>Capital:</b> ${country.capital ? country.capital[0] : "N/A"}</p>
          </div>
        </div>
      `;
    });

    container.innerHTML = countryCards.join('');

    // Add click event to each country card
    container.addEventListener("click", (e) => {
      const countryCard = e.target.closest(".country");
      if (!countryCard) return;

      // Get country details from data attributes
      const countryName = countryCard.dataset.name;
      const countryNative =countryCard.dataset.native;
      const countryPopulation = countryCard.dataset.population;
      const countryRegion = countryCard.dataset.region;
      const countrySubRegion = countryCard.dataset.subregion;
      const countryCapital = countryCard.dataset.capital;
      const countryFlag = countryCard.dataset.flag;
      const countryLang = countryCard.dataset.lang;
      const countryCurrency = countryCard.dataset.currency;
      const countryDomain = countryCard.dataset.domain;


  

      // Populate details container
      flag.src = countryFlag;
      name.textContent = countryName;
      native.textContent = countryNative;
      population.textContent = parseInt(countryPopulation).toLocaleString();
      subregion.textContent = countrySubRegion;
      region.textContent = countryRegion;
      capital.textContent = countryCapital;
      language.textContent = countryLang;
      currency.textContent = countryCurrency;
      domain.textContent = countryDomain;
     

     

      // Show details container and hide list
      container.style.display = "none";
      detailsContainer.style.display = "block";
      MainContent.style.display = "flex"
      filters.style.display = "none";
    });

    // Back button functionality
    backButton.addEventListener("click", (e) => {
      e.preventDefault(); // Prevent default anchor behavior
      detailsContainer.style.display = "none";
      MainContent.style.display = "none";
      container.style.display = "flex";
      filters.style.display = "flex";
    });
  })
  .catch((error) => {
    console.error("Error fetching country data:", error);
  });
