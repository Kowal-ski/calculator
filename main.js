//Moving animation to happen
const calculator = document.querySelector('.calculator');
const container = document.querySelector('.animation-container');

//Popout items
const display = document.querySelector('.display');
const buttonHousing = document.querySelector('.button-housing');

//Moving animation event
container.addEventListener('mousemove', e => {
    let xAxis = (window.innerWidth / 2 - e.pageX) /15;
    let yAxis = (window.innerHeight / 2 - e.pageY) /15;
    calculator.style.transform = 'rotateY('+xAxis+'deg) rotateX('+yAxis+'deg)';
})

//Animate in
container.addEventListener('mouseenter', e => {
    calculator.style.transition = 'none';
    //Popout effect
    display.style.transform = 'translateZ(20px)';
    buttonHousing.style.transform = 'translateZ(20px)';
})

//Animate out
container.addEventListener('mouseleave', e => {
    calculator.style.transition = 'all 0.5s ease'
    calculator.style.transform = 'rotateY(0deg) rotateX(0deg)';
    //Popback effect
    display.style.transform = 'translateZ(0px)';
    buttonHousing.style.transform = 'translateZ(0px)';
})