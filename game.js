var buttonColours=["red", "blue", "green", "yellow"];
var gamePattern=[];
var userClickedPattern=[];
var started = false;
var level=0;

$(document).keypress(function() {
    if (!started) {
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

$("#phone").click(function() {
  $("#phone").addClass("pressed");
  setTimeout(function () {
  $("#phone").removeClass("pressed");
  },100);
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


$(".btn").click(function(){
    var userChosenColour= $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
})

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("body").removeClass("gradient-background");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
        $("body").addClass("gradient-background");
      }, 200);

      startOver();
    }
}

function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play(); 
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);

    var randomNumber=Math.floor(Math.random()*3+1);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function () {
    $("#"+currentColour).removeClass("pressed");
    },100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
