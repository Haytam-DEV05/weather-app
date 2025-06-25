const btn = document.querySelector('button')

function fetData () {
  const city01 = document.getElementById('city').value.trim()
  let apikey = '62364dbc11a306c162cc0c84eceefd01'

  if (city01 === '') {
    document.getElementById(
      'weatherResult'
    ).innerHTML = `<p class="error">Please enter a city name</p>`
    return
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city01}&appid=${apikey}&units=metric&lang=en`

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('City not found')
      return response.json()
    })
    .then(data => {
      let iconCode = data.weather[0].icon
      let description = data.weather[0].description
      let iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

      changeBackground(data.weather[0].main)

      let lat = data.coord.lat
      let lon = data.coord.lon
      let mapUrl = `https://www.google.com/maps?q=${lat},${lon}&z=12&output=embed`

      let mapLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;

      let result = `
            <div style="animation: fadeInUp 0.6s forwards;">
            <h3>${data.name}</h3>
            <img src="${iconUrl}" alt="Weather Icon">
            <p><strong>${description}</strong></p>
            <p>🌡️ Temp: ${data.main.temp}°C</p>
            <p>💨 Wind: ${data.wind.speed} m/s</p>
            <iframe 
            width="100%" 
            height="200" 
            frameborder="0" 
            style="" 
            src="${mapUrl}" 
            allowfullscreen>
            </iframe>
            <h4>📍 Map of ${data.name}</h4>
            <a href="${mapLink}" target="_blank" class="link">
              🌍 Open in Google Maps
              </a>
            </div>
          `
      document.getElementById('weatherResult').innerHTML = result
    })
    .catch(error => {
      document.getElementById(
        'weatherResult'
      ).innerHTML = `<p class="error">${error.message}</p>`
    })
}

btn.addEventListener('click', fetData)

function changeBackground (weatherMain) {
  const body = document.body

  switch (weatherMain) {
    case 'Clear':
      body.style.background = 'linear-gradient(to right, #fbc2eb, #a6c1ee)'
      break
    case 'Clouds':
      body.style.background = 'linear-gradient(to right, #bdc3c7, #2c3e50)'
      break
    case 'Rain':
    case 'Drizzle':
      body.style.background = 'linear-gradient(to right, #4b79a1, #283e51)'
      break
    case 'Thunderstorm':
      body.style.background = 'linear-gradient(to right, #485563, #29323c)'
      break
    case 'Snow':
      body.style.background = 'linear-gradient(to right, #e0eafc, #cfdef3)'
      break
    case 'Mist':
    case 'Fog':
    case 'Haze':
      body.style.background = 'linear-gradient(to right, #757f9a, #d7dde8)'
      break
    default:
      body.style.background = 'linear-gradient(to right, #83a4d4, #b6fbff)'
  }
}
