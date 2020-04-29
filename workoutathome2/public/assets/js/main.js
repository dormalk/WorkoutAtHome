
const types = ['Yoga', 'HIIT', 'Pilates', 'Cardio', 'Strength', 'Toning'];
const equipments = [{label:'Mat', id: 'Mat'}, {label:'Dumbbell', id: 'Dumbb'}];

const duration = [{id: 'S', label: 'Short', text: '30min'}, {id: 'M', label: 'Medium', text: '30m-60m'}, {id: 'L', label: 'Long', text: '60m'}]

const videosIds = [];
const videos = [];
let typefilter=[];
let equipmentfilter=[];
let durarionfilter=[];


function updateTypes(){
  var template = jQuery('#list-types').html();
  types.forEach((type => {
    var html = Mustache.render(template,{type});
    jQuery('#type').append(html);
  }))
}

function updateEquipments(){
  var template = jQuery('#list-equipment').html();
  equipments.forEach((({label, id}) => {
    var html = Mustache.render(template,{label, id});
    jQuery('#equipment').append(html);
  }))
}


function updateDuration(){
  var template = jQuery('#list-duration').html();
  duration.forEach((({label, id,text}) => {
    var html = Mustache.render(template,{label, id, text});
    jQuery('#duration').append(html);
  }))
}
//Here is the magic!
function addVideoToPanel(video){
  var template = jQuery('#video-panel-template').html();
  var html = Mustache.render(template,{
    img:video.img,
    title:video.title,
    type:video.type,
    link: `http://sleepy-beyond-48017.herokuapp.com/workout.html?sessionid=${generateSession(12)}=&videoid=${video.videoId}`
  });
  jQuery('#videos-container').append(html);
}

function generateSession(length){
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

function fetchVideos() {
  const ids = videos.join();
  $.get(`/videos/all?alreadyIn=${ids}`,function(data){
    data.forEach(function(video){
      videosIds.push(video.videoId);
      videos.push(video)
      addVideoToPanel(video)
    })
  }).fail(function(error){
    console.log(error.responseText)
  })
}

function filterRecord(){
  let displayedVideos = videos;
  console.log(displayedVideos);
  if(typefilter.length > 0){
    displayedVideos = videos.filter(video => typefilter.includes(video.type))
  } 
  if(equipmentfilter.length > 0){
      displayedVideos = displayedVideos.filter(video => equipmentfilter.includes(video.mat) || equipmentfilter.includes(video.dumbbell))
  }
  if(durarionfilter.length>0){
    displayedVideos=displayedVideos.filter(video=> durarionfilter.includes(video.length))
  }

  jQuery('#videos-container').empty();
  displayedVideos.forEach(displayedVideo => addVideoToPanel(displayedVideo))
}

$(document).ready(function() {
  updateTypes();
  updateEquipments();
  updateDuration();
  fetchVideos();


  $('.type-element a').click(function(){
      const id= $(this).parent().attr("id");
      if($('#'+id).hasClass('active')){
        $('#'+id).removeClass('active')
        typefilter.splice( typefilter.indexOf(id), 1 );
      }else{
        $('#'+id).addClass('active')
        typefilter.push(id);
      }
      filterRecord();
   })

   $('.equipment-element a').click(function(){
    const id= $(this).parent().attr("id");
    if($('#'+id).hasClass('active')){
      $('#'+id).removeClass('active')
      equipmentfilter.splice( equipmentfilter.indexOf(id), 1 );
    }else{
      $('#'+id).addClass('active')
      equipmentfilter.push(id);
    }
    filterRecord();
 })
 $('.duration-element a').click(function(){
  const id= $(this).parent().attr("id");
  if($('#'+id).hasClass('active')){
    $('#'+id).removeClass('active')
    durarionfilter.splice( durarionfilter.indexOf(id), 1 );
  }else{
    $('#'+id).addClass('active')
    durarionfilter.push(id);
  }
  filterRecord();
})



})


