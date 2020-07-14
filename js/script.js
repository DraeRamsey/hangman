'use strict';

var play_btn = document.getElementById('play');
var greetings = document.getElementById('greetings');

var playing = false;


play_btn.addEventListener('click', function()
{
    if (playing == false)
    {
      greetings.style.top = '-1500px';
      playing = true;
    }

   else {
     greetings.style.top = '0';
     playing = false;
   }



});

//if you want to do something on load
window.addEventListener( "load", function()
{

});




//create keyboard
