const api = {
    key: "f44c93c9bd09b6ddd3fc53b51ad064a8",
    base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector('.search-box');
const backgroundVideo = document.querySelector('.background-video');

searchbox.addEventListener('keypress', setQuery);

function setQuery(e) {
    if (e.keyCode === 13) {
        getResults(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        .then((weather) => weather.json())
        .then(displayResults);
}

function displayResults(weather) {
    console.log(weather);

    let city = document.querySelector(".location .city");
    city.innerText = `${weather.name}, ${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);
    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C<span>`;
    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText = weather.weather[0].main;
    let hilow = document.querySelector('.hi-low');
    hilow.innerText = `${Math.round(weather.main.temp_min)}°C / ${Math.round(weather.main.temp_max)}°C`;

    // Обновление фонового видео в зависимости от типа погоды
    updateBackgroundVideo(weather.weather[0].main);
}

function updateBackgroundVideo(weatherType) {
    // Получите ссылку на видео-элемент
    let video = document.querySelector('.background-video');

    // Переключите источник видео в соответствии с типом погоды
    video.src = `./video/${weatherType.toLowerCase()}.mp4`;

    // Перезапустите воспроизведение видео
    video.load();
    video.play();
}

function dateBuilder(d) {
    let months = [
        'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
    ];

    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}


