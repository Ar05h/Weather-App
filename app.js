// This function retrieves weather data from the OpenWeather API
async function getWeather() {
  const apiKey = "763674141b24e7d5ef1093db1988227a";
  const location = document.getElementById("locationInput").value;
  const output = document.getElementById("weatherOutput");

  if (!location) {
    output.innerHTML = "<p>Please enter a location.</p>";
    return;
  }

  // Store the location in localStorage for future reference
  localStorage.setItem("lastLocation", location);

  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=imperial`);
    const data = await res.json();

    if (data.cod !== 200) {
      output.innerHTML = `<p>Error: ${data.message}</p>`;
      return;
    }

    const temp = Math.round(data.main.temp);
    const high = Math.round(data.main.temp_max);
    const low = Math.round(data.main.temp_min);
    const desc = data.weather[0].description;
    const humidity = data.main.humidity;
    const wind = Math.round(data.wind.speed);
    const icon = data.weather[0].icon;
    const city = data.name;
    const country = data.sys.country;

    // Create a table to display weather data directly
    const weatherTable = `
      <table>
        <tr>
          <td>${city}, ${country}</td>
        </tr>
        <tr>
          <td>Temperature: ${temp}°F</td>
        </tr>
        <tr>
          <td>High: ${high}°F</td>
        </tr>
        <tr>
          <td>Low: ${low}°F</td>
        </tr>
        <tr>
          <td>Description: ${desc}</td>
        </tr>
        <tr>
          <td>Humidity: ${humidity}%</td>
        </tr>
        <tr>
          <td>Wind Speed: ${wind} mph</td>
        </tr>
      </table>
    `;

    // Update the weather output with the table data
    output.innerHTML = `
      <div class="weather-box-grid">
        <div class="weather-box wide">
          <h2>${city}, ${country}</h2>
          <p class="time">As of ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
        </div>
        <div class="weather-box main-temp">
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="${desc}" class="weather-icon"/>
          <div class="temp">${temp}°F</div>
          <div class="description">${desc}</div>
        </div>
      </div>
      ${weatherTable}
    `;
  } catch (err) {
    output.innerHTML = "<p>Failed to fetch weather data.</p>";
    console.error(err);
  }
}
