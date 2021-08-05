// Weather API_KEY
const API_KEY = 'e2a043a9335cebb9a6aa236f56f85a4b';

// constant to get the current position
const onLoad = () => {
    navigator.geolocation.getCurrentPosition(positionLog);
};

// Fetch Data and save it in a constant
const positionLog = position => {

    const { latitude, longitude } = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&lang=es&units=metric&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data));
};

const setWeatherData = data => {

    const weatherData = {
        location: data.name,
        description: data.weather[0].description,
        humidity: data.main.humidity + " %",
        pressure: data.main.pressure + " hPa",
        temperature: data.main.temp + " °",
        date: getDate()
    };

    Object.keys(weatherData).forEach( key => {
        document.getElementById(key).textContent = weatherData[key]; 
    });

    cleanUp();
}

const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
}

const cleanUp = () => {
    let container = document.getElementById("container");
    let footer = document.getElementById("footer");
    let loader = document.getElementById("loader");

    loader.style.display = 'none';
    container.style.display = 'flex';
    footer.style.display = 'block';
}
