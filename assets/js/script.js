var date = moment();
$('#time').text(date.format('MMMM Do, YYYY h:mm a'));
// when click on the 'stay in' card, redirect the page to search recipe
document.getElementById('in').addEventListener('click', () => {
    window.location.assign('./spoon/spoon.html')
})


document.getElementById('out').addEventListener('click', () => {
    window.location.assign('./map/map.html')
})
