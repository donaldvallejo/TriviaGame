$(document).ready(function() {
 var arr
 var timeUp;
 var wrong;
 var right;
 var index;
 var notAnswered;

 var Timer = {
     time: 30,

   reset: function() {
         Timer.time = 30;
   },
   start: function() {
     $("#time").html("Time Remaining: " + Timer.time).css("color", "#BCFEFF");;
     counter = setInterval(Timer.count, 1000);
   },
   stop: function() {
         clearInterval(counter);
   },
   count: function() {
         Timer.time--;
         $("#time").html("Time Remaining: " + Timer.time);
   }
 }

 function startTrivia() {
   arr = [{
     question: "What does 'Wubba Lubba Dub Dub' mean?",
     answers: ["i love you", "I am in great pain, please help me.", "IDGAF", "Bring me a taco"],
     correctanswer: 1
   }, {
     question: "what's mortys sisters name?",
     answers: ["Summer", "Jessica", "Khaleesi", "Gwen"],
     picright: "assets/images/q2_correct.gif",
     picwrong: "assets/images/q2_wrong.gif",
     correctanswer: 0
   }, {
     question: "what is Squanching?",
     answers: ["throwing up", "hang yourself and masturbate simultaneously", "Chillin", "Doing the deed"],
     picright: "assets/images/q3_correct.gif",
     picwrong: "assets/images/q3_wrong.gif",
     correctanswer: 1
   }, {
     question: "Whats Ricks relation to Morty?",
     answers: ["His science teacher", "A random encounter", "His Grandfather", "Guardian angle"],
     picright: "assets/images/q4_correct.gif",
     picwrong: "assets/images/q4_wrong.gif",
     correctanswer: 2
   }]
  right = 0;
  wrong = 0;
  notAnswered = 0;

  index = -1;

  $('#questions').html("<button class='button' id='start'>Start</button>");
  $('#answer0, #answer1, #answer2, #answer3').hide().off('click');

  $('#start').on("click", function() {
    advance();
  });
}

function askQuestions() {
    Timer.start();
    $('#questions').html(arr[index].question);
    $('#answer0').show().html(arr[index].answers[0]);
    $('#answer1').show().html(arr[index].answers[1]);
    $('#answer2').show().html(arr[index].answers[2]);
    $('#answer3').show().html(arr[index].answers[3]);

    onClickAnswer();
  }

  function onClickAnswer() {
    $('.button').on("click", function() {
      var buttonClick = parseInt($(this).attr("value"));
      if(buttonClick === arr[index].correctanswer) {
        rightAnswer();
      }
      else {
        wrongAnswer();
      }
    });
  }

function rightAnswer(){
  clearTimeout(timeUp);
  right++;
  Timer.stop();
  Timer.reset();
  $("#time").empty();
  $("#questions").html("<h3>Correct!</h3>");
  $('#answer0, #answer1, #answer2, #answer3').hide().off('click');

  timeUp = setTimeout(advance, 2 * 500);
}
function wrongAnswer() {
  clearTimeout(timeUp);
  wrong++;
  Timer.stop();
  Timer.reset();
  $("#time").empty();
  $("#questions").html("<h3>Incorrect!</h3>");
  $('#answer0, #answer1, #answer2, #answer3').hide().off('click');

  timeUp = setTimeout(advance, 2 * 500);
}

function timesUp() {
  clearTimeout(timeUp);
  notAnswered++;
  Timer.stop();
  Timer.reset();
  $("#time").empty();
  $("#question").html("<h2>No time left!</h2>");
  $('#answer0, #answer1, #answer2, #answer3').hide().off('click');

  timeUp = setTimeout(advance, 2 * 400);
}

function endScreen() {
  $("#time").html("<h2>Good job!</h2>");
  $("#questions").html("Your Results <br><br>Right: " + right + "<br>Wrong: " + wrong + "<br>Unanswered: " + notAnswered);
}

function advance() {
  index++;

  if(index < arr.length) {
    askQuestions();
    timeUp = setTimeout(timesUp, 30 * 1000);
  } else {
    endScreen();
  }
}

startTrivia();
});
