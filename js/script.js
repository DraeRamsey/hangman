'use strict';

const play_btn = document.getElementById('play');
const greetings = document.getElementById('greetings');
const btn_container = document.getElementById( "btn-container" );
const guessed_cont = document.getElementById( "guessed-cont" );
const dashed_word = document.getElementById('dashed-word');
const hang_man_img = document.getElementById('hang-man-img');
const refresh_btn = document.getElementById('refresh-btn');

var playing = false;
var randWord = "";
var guess = 10;
var wrong = 0;
var answerArray = [];

const words = [
  "helicopter",
  "anaconda",
  "biscuit",
  "elephant",
  "brontosaurus",
  "unicorn",
  "happiness",
  "astronaut",
  "centaur",
  "broccoli"
    ];


play_btn.addEventListener('click', function()
{
    if (playing == false)
    {
      greetings.style.top = '-1500px';
      newGame();
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
    btn_container.innerHTML = "";

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
     var currentLetter = letter.toLowerCase();
     console.log(currentLetter);

     // currentLetter = currentLetter.replace(/\s+/g, '');
     // console.log(currentLetter);

     //if letter is correct, add it to the dashed word
     if (randWord.includes(currentLetter))
     {

        for (var i = 0; i < randWord.length; i ++)
        {
          if (randWord[i] === currentLetter)
          answerArray[i] = currentLetter;

        }
        dashed_word.innerHTML = answerArray.join(" ");
      }

    //if it's a wrong guess
     else{
       wrong ++;
       guess --;
       //change the guesses left html here

       //change picture
       var img_src = "img/" + wrong + ".png";
       hang_man_img.src = img_src;
     }

// TODO: change to 9
     if(wrong > 9)
     {
      btn_container.classList.remove('is-visible');

     }
}

function setWord()
{
  //pick random word
  randWord = words[Math.floor(Math.random()*words.length)];
  var randWordIndex = words.indexOf(randWord);
  console.log(randWord);

 //replace letters with dashes
  for (var i = 0; i < randWord.length; i ++)
  {
    answerArray[i] = "_";
  }

 //join letters with spaces instead of commas
  var space = answerArray.join(" ");
  dashed_word.innerHTML = space;


}


function newGame()
{
  refresh_btn.addEventListener("click", function()
  {   setKeyboard();
      wrong = 0;
      btn_container.classList.add('is-visible');
  });

  setKeyboard();
  setWord();
}



//create keyboard
