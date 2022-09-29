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
let city = "";
let weatherApiKey = '2c73f79417295159a86a0353b1677f02';


function showWeather (city) {
    console.log(city)
    const urlToFetch = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperical&appid=${weatherApiKey}`;
    console.log(urlToFetch)
    fetch(urlToFetch) 
.then(response => {
    console.log(response);
    return response.json();

}) 
.then( data => {
    console.log(data);
})
    }

const displayForecast = (list) => {
    document.getElementsByClassName("temp")[0].innerHTML = "Temp: " + data.main.temp + "°F";
    document.getElementsByClassName("condition")[0].innerHTML = "Condition: " + data.weather[0].discription;
    document.getElementsByClassName("icon")[0].innerHTML = `http://openweathermap.org/img/wn/${list.weather[0].icon}@2x.png`
}

$(".search").on('click',(event)=>{
    event.preventDefault();
    city = $('.city').val();
    console.log(city);
    showWeather(city);
})


var currentDay = moment();
$(".day").text(date.format("dddd"))