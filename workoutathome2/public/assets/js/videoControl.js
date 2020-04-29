var socket = io();

var player;
var praiseShown = false;
var lockScreen = false;

var randomParise = ['Good Job!', 'Well Done!!', 'You are GREAT!', 'GO GO GO', 'Almost there', 'Yeaaaa!', 'Have Fun!', 'You can Do It :-)']
var randomPraiseClass = ['random1','random2','random3','random4','random5','random6','random7'];

socket.on('connect', function () {});

function onPlayerStateChange(event){
  var params = deparam(window.location.search);
  var { sessionid } = params;
  if(!lockScreen){
    if (isAdmin() && (event.data == 1 || event.data == 2)) {
      socket.emit('updateVideoStateAndTime',{
        sessionid,
        current_time: player.getCurrentTime(),
        state: event.data
      });
      if(event.data == 1){
        lockScreen = true;
        if(isAdmin()) {
          $('#cover').css('display', 'inline-block')
        }
        player.pauseVideo();
        playVideoWithCount();
      }
  }
  }

}

function catchError(event){
  if(event.data == 100) console.log("De video bestaat niet meer");
}
function onPlayIsReady(event) {
  var params = deparam(window.location.search);

  var {sessionid,admin,videoid} = params;
  socket.emit('join',{ sessionid,admin,videoid },function(err){});
  updateLoadBar();

  setInterval(function(){
    updateLoadBar();
    if(isAdmin()){
      socket.emit('updateVideoTime',{
        sessionid,
        time: player.getCurrentTime()
      })
    }
  },1000)
  socket.on('changeVideoId', function(params){
    const {videoid} = params;
    player.loadVideoById(videoid)
  })

  socket.on('updateVideoFromServer',function(params) {
    const {current_time,state,video} = params;
    if(!isAdmin()){
      var timeout = 0;
      if(video){
        var curr_video = player.getVideoData()['video_id']
        if(curr_video!=video){
          player.loadVideoById(video)
          timeout = 1500;
        }
      }
      setTimeout(function(){
        if(current_time){
          player.seekTo(current_time);
          player.pauseVideo();
        }
        if(state == 1) playVideoWithCount();
        else if(state == 2) player.pauseVideo();
      },timeout)

    }
  })
  socket.on('praiseAllFromServer',function(params) {
    if(!praiseShown){
      const {word} = params;
      showPraise(5500,word)
    }
  })
}

socket.on('errorHandler',function(){
  window.location.href= 'https://workoutathome.online/';
})


function showPraise(duration,word){
  var praise = document.getElementById('prais-message');
  var value = Math.floor(Math.random() * randomPraiseClass.length);
  var praiseClass = randomPraiseClass[value];
  praise.innerText = word;
  praise.classList.add('active')
  praise.classList.add(praiseClass);
  praiseShown = true;
  setTimeout(function(){
    praise.classList.remove('active')
    praise.classList.remove(praiseClass);
    praiseShown = false;
  },duration)
}

function playVideoWithCount(){

  setTimeout(function(){
    showPraise(800,'3')
  },0)
  setTimeout(function(){
    showPraise(800,'2')
  },1000)
  setTimeout(function(){
    showPraise(800,'1')
  },2000)
  setTimeout(function(){
    player.playVideo();
  },3000)
  setTimeout(function() {
    lockScreen = false;
    if(isAdmin()) {
      $('#cover').css('display', 'none')
    }
  },4000)
}

function updateLoadBar(){
  var timeleft = document.getElementById('timeleft');
  var gamification = '';
  var secondLeft = Math.floor(player.getDuration() - player.getCurrentTime());
  var minutes = Math.floor(secondLeft/60);
  var seconds = Math.floor(secondLeft%60);
  var timeString = '';
  if(minutes >= 1){
    if(seconds < 10){
      seconds = `0${seconds}`;
    }
    timeString = `${minutes}:${seconds} Minutes`
  } else {
      timeString = `${seconds} Seconds`
  }

  var precetage = secondLeft/player.getDuration()*95;
  console.log(precetage)
  if(Math.floor(player.getDuration() - player.getCurrentTime())== 0){
    gamification = 'FINISH!'
    timeleft.innerText = `${gamification}`;
  }
  else if(precetage < 25){
    gamification = ', You Almost Done!'
    timeleft.innerText = `${timeString} ${gamification}`;
  }
  else if(precetage < 50){
    gamification = ', Half Way There!'
    timeleft.innerText = `${timeString} ${gamification}`;
  }
  else if(precetage < 75){
    gamification = ', Good Job!'
    timeleft.innerText = `${timeString} ${gamification}`;
  } else {
    gamification = ' Left'
    timeleft.innerText = `${timeString} ${gamification}`;
  }
  var load = document.getElementById('load');
  load.style.width = `${precetage}%`
}

function loadPlayer(videoId) {
    if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {

      var tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      window.onYouTubePlayerAPIReady = function() {
        onYouTubePlayer(videoId);
      };

    } else {
      onYouTubePlayer(videoId);
    }
}

function onYouTubePlayer(videoId) {
    player = new YT.Player('player', {
        videoId: videoId,
        events: {
          'onStateChange': onPlayerStateChange,
          'onError': catchError,
          'onReady': onPlayIsReady
        }
    });

}

function loadVideo(videoid){
  if(isAdmin()){
    var params = deparam(window.location.search);
    var {sessionid} = params;
    socket.emit('loadVideo',{videoid,sessionid})
  }
}


function isAdmin(){
  var params = deparam(window.location.search);
  var {admin} = params;
  return admin == undefined || admin == 1;
}

function sendPraise(){
  if(!praiseShown){
    var params = deparam(window.location.search);
    var value = Math.floor(Math.random() * randomParise.length);
    socket.emit('praiseAll',{sessionid: params.sessionid,word: randomParise[value]});
  }
}

$(document).ready( function() {
  var params = deparam(window.location.search);
  var {videoid} = params;
  loadPlayer(videoid)
  if(isAdmin()) {
    $('#cover').css('display', 'none')
  }
});

