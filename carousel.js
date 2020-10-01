// slides section
let index = 0;
let amount = 0;//amount of images
let currTransl = []
let translationComplete = true;
let valueWidth = document.querySelectorAll('#carousel a')[0].offsetWidth + 10;
let valueWidth2;
let startValue = (document.querySelectorAll('#carousel a')[0].offsetWidth + 10) * 2;


let transitionCompleted = function(){
    translationComplete = true;
}

document.addEventListener("DOMContentLoaded", function() 
{
    amount = document.querySelectorAll('#carousel a').length;
    for(let i = 0; i < amount; i++)
    {
        currTransl[i] = -startValue;
        document.querySelectorAll('#carousel a')[i].addEventListener("transitionend", transitionCompleted, true);                    
        document.querySelectorAll('#carousel a')[i].addEventListener("webkitTransitionEnd", transitionCompleted, true);                    
        document.querySelectorAll('#carousel a')[i].addEventListener("oTransitionEnd", transitionCompleted, true);                    
        document.querySelectorAll('#carousel a')[i].addEventListener("MSTransitionEnd", transitionCompleted, true);                  
    }
    console.log("DOM fully loaded and parsed");
});

function right()
{
    if(translationComplete === true) {

        translationComplete = false;
        index--;
        if(index == -1)
        {
            index = amount-1;
        }

        let outerIndex = (index) % amount;
        globalIndex = outerIndex;
   
        for(let i = 0; i < amount; i++)
        {
            let img = document.querySelectorAll("#carousel a")[i]; 
            img.style.transition = 'transform .1s';   
            img.style.opacity = '1'; 
            img.style.pointerEvents = 'auto';  
            img.style.transform = 'translate('+(currTransl[i]+valueWidth2)+'px)';
       
            currTransl[i] = currTransl[i]+valueWidth2;
        }
        let outerImg = document.querySelectorAll("#carousel a")[outerIndex];
        
        outerImg.style.transform = 'translate('+(currTransl[outerIndex]-valueWidth2*(amount))+'px)';
        outerImg.style.opacity = '0';
        currTransl[outerIndex] = currTransl[outerIndex]-valueWidth2*(amount);
     
    }
}

function left()
{   

    if(translationComplete === true)
    {
        translationComplete = false;
        index++;
        let outerIndex = (index-1) % amount;
 
        for(let i = 0; i < amount; i++)
        {
            let img = document.querySelectorAll("#carousel a")[i];    
            img.style.transition = 'transform .1s';   
            img.style.opacity = '1';    
            img.style.pointerEvents = 'auto';
            img.style.transform = 'translate('+(currTransl[i]-valueWidth2)+'px)';
            currTransl[i] = currTransl[i]-valueWidth2;
        }
        let outerImg = document.querySelectorAll("#carousel a")[outerIndex];
        outerImg.style.transform = 'translate('+(currTransl[outerIndex]+valueWidth2*(amount))+'px)';
        outerImg.style.opacity = '0';
        currTransl[outerIndex] = currTransl[outerIndex]+valueWidth2*(amount);
    }
}

// reset size, and resestart
function reset() {

    valueWidth2 = document.querySelectorAll('#carousel a')[0].offsetWidth + 10;
    let resetStart = (document.querySelectorAll('#carousel a')[0].offsetWidth + 10) * 2;
    if(valueWidth != valueWidth2) {
        valueWidth = valueWidth2;
        index = 0;
        const itemsLength = document.querySelectorAll('#carousel a').length;
        for(let i = 0; i < itemsLength; i++)
            {
                currTransl[i] = -resetStart;
                let img = document.querySelectorAll("#carousel a")[i];    
                img.style.opacity = '1';    
                img.style.transform = 'translateX('+(-resetStart)+'px)';
            }   
    } 
}
setInterval(reset,0);

// dragable section
let initialTouch = 0;
const threshold = 100;
let diference;
const animesItems = document.querySelector('#carousel');

//Touch events
animesItems.addEventListener('touchstart', dragStart);
animesItems.addEventListener('touchend', dragEnd);
animesItems.addEventListener('touchmove', dragAction);

animesItems.onmousedown = dragStart;


function dragStart(e) {
    e = e || window.event;
    e.preventDefault();

    if(e.type == 'touchstart') {
        initialTouch = e.touches[0].clientX;
    } else {
        initialTouch = e.clientX;
        
        document.onmousemove = dragAction;
        document.onmouseup = dragEnd;
    }

}

function dragAction (e) { 
    e = e || window.event; 

    if(e.type == 'touchmove'){
        diference = e.touches[0].clientX;
    } else {
        diference = e.clientX - initialTouch;
    }


    const animesItemsList = document.querySelectorAll('#carousel a');

    for(let i = 0; i < animesItemsList.length; i++) {
        animesItemsList[i].style.pointerEvents = 'none';
        animesItemsList[i].style.transform = `translateX(${currTransl[i] + diference}px)`; 
    }

    if(e.type == 'touchmove') {

        if(diference <= -valueWidth2) {
            initialTouch = e.touches[0].clientX; 
            leftShift();
        } 
        else if(diference >= valueWidth2) {
            initialTouch = e.touches[0].clientX;
            rightShift();
        }

    } else {

        if(diference <= -valueWidth2) {
            initialTouch = e.clientX; 
            leftShift();
        } 
        else if(diference >= valueWidth2) {
            initialTouch = e.clientX;
            rightShift();
        }
    }
  
}


function dragEnd (e) {
    
    if(diference < -threshold) {
        console.log('ok, left');
        left();
    } else if(diference > threshold) {
        console.log('ok, right');
        right();
    } 
    else {
        console.log('ok, comeback');

        for(let i = 0; i < amount; i++) {
            const img = document.querySelectorAll('#carousel a')[i];
            img.style.pointerEvents = 'auto';
            img.style.transform = `translateX(${currTransl[i]}px)`;
        }
    }
    diference = 0;

    document.onmousemove = null;
    document.onmouseup = null;
}

function leftShift() {

        index++;
        let outerIndex = (index - 1) % amount;

        
        for(let i = 0; i < amount; i++) {
            const img = document.querySelectorAll('#carousel a')[i];
            img.style.pointerEvents = 'auto';
            img.style.opacity = '1';
            currTransl[i] = currTransl[i] - valueWidth2;
        }
        let outerImg = document.querySelectorAll("#carousel a")[outerIndex];
        outerImg.style.opacity = '0';
        outerImg.style.transition = 'none';
        outerImg.style.transform = 'translate('+(currTransl[outerIndex]+valueWidth2*(amount))+'px)';
        setTimeout(()=> outerImg.style.transition = 'transform .1s', 0);
   
        currTransl[outerIndex] = currTransl[outerIndex]+valueWidth2*(amount);
        
}

function rightShift() {

        index--;
        if(index == -1)
        {
            index = amount-1;
        }

        let outerIndex = (index) % amount;
   
        for(let i = 0; i < amount; i++)
        {
            let img = document.querySelectorAll("#carousel a")[i];    
            img.style.pointerEvents = 'auto';
            img.style.opacity = '1'; 
            currTransl[i] = currTransl[i]+valueWidth2;
        }
        let outerImg = document.querySelectorAll("#carousel a")[outerIndex]; 
        outerImg.style.opacity = '0';
        outerImg.style.transition = 'none';
        outerImg.style.transform = 'translate('+(currTransl[outerIndex]-valueWidth2*(amount))+'px)';
        setTimeout(()=> {
            outerImg.style.transition = 'transform .1s';
        }, 0);
        currTransl[outerIndex] = currTransl[outerIndex]-valueWidth2*(amount);
}
