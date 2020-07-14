'use strict';

var play_btn = document.getElementById('play');
var greetings = document.getElementById('greetings');
var btn_container = document.getElementById( "btn-container" );
var guessed_cont = document.getElementById( "guessed-cont" );


var playing = false;


play_btn.addEventListener('click', function()
{
    if (playing == false)
    {
      greetings.style.top = '-1500px';
      setKeyboard();
      playing = true;
    }

   else {
     greetings.style.top = '0';
     playing = false;
   }
});

// NOTE: I based my setKeyboard function off of Stackoverdlow user Ostapische's solution -  https://stackoverflow.com/questions/30616925/creating-26-alphabet-letter-buttons-with-the-for-loop-and-string-fromcharcode

   function setKeyboard()
{
    var row, letter, button, btn_div;

    for (var i = 65; i <= 90; i++)
    {
        if (i == 65 || i == 75 || i == 85)
        {
            row = document.createElement( "div" );
            row.setAttribute( "class", 'btn-row' );
        }

        letter = String.fromCharCode(i);
        btn_div = document.createElement( "div" );
        btn_div.setAttribute( "class", 'btn-div' );

        button = document.createElement( "button" );
        button.innerHTML = letter;
        button.setAttribute( "data-letter", letter );
        button.setAttribute( "class", "alpha-btn" );

        row.appendChild(btn_div).appendChild(button);
        if (i == 74 || i == 83 || i == 90)
        {
            btn_container.appendChild(row);
        }
    }
};

//keyboard button click function
document.addEventListener('click',function(e){
   var target = e.target;
   if(target && target.classList.value === 'alpha-btn'){
        setGuessed(target.getAttribute("data-letter"));
        target.style.display = 'none';
    }
});

function setGuessed(letter)
{
     guessed_cont.innerHTML = guessed_cont.innerHTML + letter;
}


function newGame()
{
  //code go here
}



//create keyboard
