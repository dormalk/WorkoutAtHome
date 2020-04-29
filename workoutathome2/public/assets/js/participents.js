
var participents = ['1','2','3','4','5'];
var connection = new RTCMultiConnection();
var audioMuted = false;
var videoMuted = false;


// comment-out below line if you do not have your own socket.io server
connection.socketURL = 'https://rtcmulticonnection.herokuapp.com:443/';

connection.socketMessageEvent = 'video-conference-demo';

connection.session = {
    audio: true,
    video: true
};

connection.sdpConstraints.mandatory = {
    OfferToReceiveAudio: true,
    OfferToReceiveVideo: true
};

function toggleAudio(){
    var audio_btn = document.getElementById('audio-button')
    if(audioMuted){
        connection.attachStreams[0].unmute('audio');
        audio_btn.classList.remove('muted');
        audioMuted = false;
    } else {
        audio_btn.classList.add('muted');
        connection.attachStreams[0].mute('audio');
        audioMuted = true;
    }
}

function toggleVideo(){
    var video_btn = document.getElementById('video-button')
    if(videoMuted){
        connection.attachStreams[0].unmute('video');
        video_btn.classList.remove('muted');
        videoMuted = false;
    } else {
        video_btn.classList.add('muted');
        connection.attachStreams[0].mute('video');
        videoMuted = true;
    }
}

function generateRandomImage(){
    var image = document.createElement('img')
    var value = Math.floor(Math.random() * 5) + 1; 
    image.src = '/images/'+value+'.svg';
    image.height = '50px';
    image.style.position = 'absolute';
    return image;
}

$(document).ready(function() {
    var params = deparam(window.location.search);
    var {sessionid} = params;
    connection.openOrJoin(sessionid, function() {})
        
    connection.onstream = function (event) {
        var width = '100%';
        var  videosContainer = document.getElementById('participents-list');
        var mediaElement = getMediaElement(event.mediaElement, {
            title: event.userid,
            buttons: ['mute-video', 'mute-audio'],
            width: width,
            showOnMouseEnter: true
        });
        mediaElement.className = 'participent-card';
        videosContainer.appendChild(mediaElement);
        mediaElement.appendChild(generateRandomImage());


        setTimeout(function () {
            mediaElement.media.play();
        }, 5000);

        mediaElement.id = event.streamid;
    };


    connection.onstreamended = function (event) {
        var mediaElement = document.getElementById(event.streamid);
        if (mediaElement) {
            mediaElement.parentNode.removeChild(mediaElement);
        }
    };

})