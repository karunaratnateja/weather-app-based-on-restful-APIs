async function getWeather() {
  const city = document.getElementById("cityInput").value;

  const loading = document.getElementById("loading");
  const errorBox = document.getElementById("error");
  const card = document.getElementById("weatherCard");

  loading.classList.remove("hidden");
  errorBox.classList.add("hidden");
  card.classList.add("hidden");

  try {
    const url = `${CONFIG.BASE_URL}?q=${city}&appid=${CONFIG.API_KEY}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("City not found or API error");
    }

    const data = await response.json();

    // Parsing JSON
    document.getElementById("cityName").innerText = data.name;
    document.getElementById("temp").innerText = data.main.temp;
    document.getElementById("humidity").innerText = data.main.humidity;
    document.getElementById("wind").innerText = data.wind.speed;
    document.getElementById("condition").innerText = data.weather[0].description;

    card.classList.remove("hidden");

  } catch (error) {
    errorBox.innerText = error.message;
    errorBox.classList.remove("hidden");
  } finally {
    loading.classList.add("hidden");
  }
}