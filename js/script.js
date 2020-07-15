'use strict';

const play_btn = document.getElementById('play');
const greetings = document.getElementById('greetings');
const btn_container = document.getElementById( "btn-container" );
const guessed_cont = document.getElementById( "guessed-cont" );
const dashed_word = document.getElementById('dashed-word');
const hang_man_img = document.getElementById('hang-man-img');
const refresh_btn = document.getElementById('refresh-btn');
const win_lose_text = document.getElementById('win-lose-text');

var playing = false;
var rand_word = "";
var guess = 10;
var wrong = 0;
var answerArray = [];
var spaces = "";
var img_src = "";

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
     guessed_cont.innerHTML += letter;
     var currentLetter = letter.toLowerCase();
     console.log(currentLetter);

     if (rand_word.includes(currentLetter))
     {

        for (var i = 0; i < rand_word.length; i ++)
        {
          if (rand_word[i] === currentLetter)
          answerArray[i] = currentLetter;
        }
        dashed_word.innerHTML = answerArray.join(" ");
      }

    //if it's a wrong guess
     else{
       wrong ++;
       guess --;
       updateImg();
     }

     // LOSE CLAUSE
     if(wrong > 9)
     {
       let message = "Aw snap! The answer was ";
         winOrLose(message)
     }

    // WIN CLAUSE
  var  word_progress = dashed_word.innerHTML;
    word_progress = word_progress.replace(/\s+/g, '');

    if(word_progress === rand_word)
    {
        //win game
        let message = "You did it! You got ";
          winOrLose(message)
    }
}

function updateImg(){
  img_src = "img/" + wrong + ".png";
  hang_man_img.src = img_src;
}

function setWord()
{
  answerArray = [];
  //pick random word
  rand_word = words[Math.floor(Math.random()*words.length)];
  //replace letters with dashes
  for (var i = 0; i < rand_word.length; i ++)
  {
    answerArray[i] = "_";
  }
 //join letters with spaces instead of commas
  var space = answerArray.join(" ");
  dashed_word.innerHTML = space;
}

function winOrLose(message)
{
  btn_container.classList.remove('is-visible');
  win_lose_text.innerHTML = message + rand_word;
  win_lose_text.style.opacity = "1";
  win_lose_text.style.visibility = "visible";
}

refresh_btn.addEventListener("click", function()
{   setKeyboard();
    setWord();
    wrong = 0;
    updateImg();
    btn_container.classList.add('is-visible');
    win_lose_text.style.opacity = "0";
    win_lose_text.style.visibility = "hidden";
    guessed_cont.innerHTML = "";
});

function newGame()
{
  setKeyboard();
  setWord();
}
