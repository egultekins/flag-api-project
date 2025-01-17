fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    const container = document.querySelector(".countries-card-container");

  
    const countryCards = data.map((country) => {
      return `
       
        <div class="country">
          <a href="country.html"  rel="noopener noreferrer" class="country-link">
          <img src="${country.flags.svg}" alt="${country.name.common}">
          <h3>${country.name.common}</h3>
          <div class="infos">
            <p><b>Population:</b> ${country.population.toLocaleString()}</p>
            <p><b>Region:</b> ${country.region}</p>
            <p><b>Capital:</b> ${country.capital ? country.capital[0] : "N/A"}</p>
          </div>
          </a>
        </div>
       
      `;
    });

    container.innerHTML = countryCards.join('');
  })
  .catch((error) => {
    console.error("Error fetching country data:", error);
  });



