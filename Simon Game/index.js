
var level=0;

var pattern =[];

function music(color){
  var audio = new Audio("./sounds/"+color+".mp3");
  audio.play();
}

function add(color){
  pattern.push(color);
  $("."+color).fadeOut(100).fadeIn(100);//flash effect
  music(color);
}

function next_step(){
  level++;
  $("h1").text("Level "+level);
  var num=Math.floor(Math.random()*4);
  switch(num){
    case 0:
      add("green");
      break;
    case 1:
      add("red");
      break;
    case 2:
      add("blue");
      break;
    case 3:
      add("yellow");
      break;
  }
}

var user_pattern=[];
function user_chosen_color(color){
  if(level==0){
    music(color);
    return ;
  }
  user_pattern.push(color);
  var cl=user_pattern.length;
  if(pattern[cl-1]==user_pattern[cl-1]){
    music(color);
    if(level==cl){
      user_pattern=[];
      setTimeout(function(){
        next_step();
      },1000);
    }
  }else{
    music("wrong");
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("h1").text("wrong");
    setTimeout(function(){
      $("h1").text("Game Over, Press Any Key to Restart");
    },1000);
    level=0;
    pattern=[];
    user_pattern=[];
  }
}

$(".btn").click(function(event){
  user_chosen_color($(event.target).attr("id"));// or
  // user_chosen_color($(this).attr("id"));
  // here this = event.target
  $(this).addClass("pressed");
  setTimeout(function(){
    $(event.target).removeClass("pressed");
  },100);
});

$(document).keydown(function(){
  if(level==0){
    pattern=[];
    $("h1").text("Level "+level);
    next_step();
  }
});
