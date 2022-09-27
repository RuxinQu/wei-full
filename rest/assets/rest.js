$(document).ready()  
    var googlePlacesApiKey = "AIzaSyDszuLl_M28FKlLy8cXvTphuTBYkhl4Yks";
    var baseUrl = 'https://maps.googleapis.com/maps/api/js?key=' + googlePlacesApiKey +'&callback=initMap&number=5';


const findPlace = async () => {
    const place = $('rest').val();
    $('#rest').val('');
    const endPoint = `/places/findPlace`;
    const requestParams = `?appid=${googlePlacesApiKey}&place=${place}&number=5`;
    const urlToFetch = `${baseUrl}${endPoint}${requestParams}`;
    try {
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const result = await response.json();
            console.log(result);
            return result;
        }
    } catch (error) {
        console.log(error.message);
    }
}
const renderTitle = title => {
    const titleEl = $('<h3>');
    titleEl.text(title);
    $('.output').append(titleEl);
}
const renderImg = (url) => {
    const img = $('<img>');
    img.attr({
        src: url,
        alt: 'place image'
    })
    $('.output').append(img);
}

const renderPlaceResult = (result) => {
    for (let x = 0; x < result.length; x++) {
        renderTitle(result[x].title);
        renderImg(result[x].image);
        $('.output').append('<hr>')
    }
}

const search = async () => {
    const result = await findPlace();
    renderPlaceResult(result);
}

$('.btn').on('click', (event) => {
    event.preventDefault();
    $('.output').text('')
    search();
})
