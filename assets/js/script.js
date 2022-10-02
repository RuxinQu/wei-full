// when click on the 'stay in' card, redirect the page to search recipe
document.getElementById('in').addEventListener('click', () => {
    window.location.assign('./spoon/spoon.html')
})


document.getElementById('out').addEventListener('click', () => {
    window.location.assign('./map/map.html')
})


//make the window 100vh on phones 
let vh = window.innerHeight * 0.01;
document.documentElement.style.setProperty('--vh', `${vh}px`);

window.addEventListener('resize', () => {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });