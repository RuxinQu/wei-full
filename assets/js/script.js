let weatherApiKey = '2c73f79417295159a86a0353b1677f02';
let baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=london&units=imperial&appid=' + weatherApiKey;

// when click on the 'stay in' card, redirect the page to search recipe
document.getElementById('in').addEventListener('click',()=>{
    window.location.assign('./spoon/spoon.html')
})


document.getElementById('out').addEventListener('click',()=>{
    window.location.assign('./map/map.html')
})

var time = moment();
$('#time').text(time.format('MMM Do, YYYY, h:mm a'));

// weather forecast
function showForecast () {
console.log('ready!')

fetch(baseUrl)
    .then(response => {
        console.log(response);
        return response.json();
    
    })
    .then(data => {
        console.log(data);
        
    })
} 
