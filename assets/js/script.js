var date = moment();
$('#time').text(date.format('MMMM Do, YYYY h:mm a'));
// when click on the 'stay in' card, redirect the page to search recipe
document.getElementById('in').addEventListener('click', () => {
    window.location.assign('./spoon/spoon.html')
})


document.getElementById('out').addEventListener('click', () => {
    window.location.assign('./map/map.html')
})

// show the weather for that night 
const newName = document.querySelector('.city');
const fetchButton = document.querySelector('.search')
let weatherApiKey = '2c73f79417295159a86a0353b1677f02';
let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=' + newName.value + '&units=imperical&appid=' + weatherApiKey;

const showWeather = async (city) => {
    const urlToFetch = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperical&appid=${weatherApiKey}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const forecastJsonResponse = await response.json();
            const list = forecastJsonResponse;
            return list;
        }
    } catch (err) {
        console.log(err);
    }
}


const displayForecast = (list) => {
    document.getElementsByClassName("temp")[0].innerHTML = "Temp: " + data.main.temp + "°F";
    document.getElementsByClassName("condition")[0].innerHTML = "Condition: " + list.weather[0].discription;
    document.getElementsByClassName("icon")[0].innerHTML = `http://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png`
}


const searchForcast=async()=>{
    const list = await showWeather(city);
    displayForecast(list);
}


$(".search").on('click',(event)=>{
    event.preventDefault();
    city = $('.city').val();
    showWeather();
    searchForcast();
})

fetchButton.addEventListener("click", showWeather);

var currentDay = moment();
$(".day").text(date.format("dddd"))