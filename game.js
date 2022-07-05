var game_started = false;
var level = 0;
const buttonColors = ['red','blue','green','yellow'];
var gamePattern = [];
var userClickedPattern = [];

function playSound(name){
  var sound_file = new Audio(`sounds/${name}.mp3`);
  sound_file.play();
}

function animatePress(currentColor){
  $(`.${currentColor}`).addClass('pressed');
  setTimeout(function(){$(`.${currentColor}`).removeClass('pressed');},100);
}

function nextSequence(){
  level += 1;
  $('h1').text(`Level ${level}`);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  playSound(randomChosenColor);
  $(`.${randomChosenColor}`).fadeOut(100).fadeIn(100);
}

function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]==userClickedPattern[currentLevel]){
    if(currentLevel==gamePattern.length-1){
      setTimeout(function(){nextSequence()},1000);
      userClickedPattern=[];
    }
  }
  else{
    playSound('wrong');
    userClickedPattern=[];
    gamePattern=[];
    $('body').addClass('game-over');
    $('h1').text('Game Over, Press Any Key to Restart');
    level = 0;
    game_started=false;
    setTimeout(function(){$('body').removeClass('game-over');},200);
  }
}

$(document).keypress(function(){
  if(game_started == false){
    $('h1').text(`Level ${level}`);
    nextSequence();
    game_started = true;}
});


$('.btn').click(function(){
  var userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  $(`.${userChosenColor}`).fadeOut(100).fadeIn(100);
  checkAnswer(userClickedPattern.length-1);
})
