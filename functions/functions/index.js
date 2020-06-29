const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');
admin.initializeApp(functions.config().firebase);




exports.schedualsUpdateAnalitics = functions.pubsub
    .schedule('5 00 * * *')
    .onRun((context) => {
    updateAnalitics();
})



exports.updateAnalitics = functions.https.onRequest((request, response) => {
    updateAnalitics();
    response.status(200).send('OK');

})
exports.migrateVideosToFirestore = functions.https.onRequest((request,response) => {

})

exports.updateVideoDetails = functions.https.onRequest((request,response) => {
    admin.database().ref('videos_backup')
    .once('value', async(snapshot) => {
        let videos = snapshot.val();
        for(let videoId in videos) {
            let {data} = await getVideoDetails(videoId);
            response.status(200).send(data)
        }
        // for(let videoId in videos) {
            
        //     .then(({data}) => {
        //         videos[videoId] = {
        //             ...videos[videoId],
        //             ...convertDetails(data),
        //             videoUrl: `https://www.youtube.com/watch?v=${videoId}`
        //         };

        //         admin.database().ref('videos/'+videoId)
        //         .update(videos[videoId])
        
        //     })
        // }


    })
})

const convertDetails = (data) => {
    let { title, thumbnails } = data.items[0].snippet;
    let duration = data.items[0].contentDetails.duration;
    let length = "L";
    const { hours, minutes, seconds } = moment.duration(
      duration,
      "m"
    )._data;
    if (hours === 0) {
      if (minutes <= 30) {
        length = "S";
      } else {
        length = "M";
      }
    }
    return {
        title,
        allThumbnails: thumbnails,
        duration: {
            hours, minutes, seconds
        },
        length
    }
}


const KEY = "AIzaSyBVGMQU9KNm311Z-5b8jZJo8bnfQo_3i8U";
const BASE_URL = "https://www.googleapis.com/youtube/v3";
const part = "snippet,statistics,contentDetails";

const getVideoDetails = (videoId) => {
    console.log(videoId)
    return axios.get(`${BASE_URL}/videos?key=${KEY}&part=${part}&id=${videoId}`)
}



function updateAnalitics() {
    const lastTwoWeek = new Date(new Date().setDate(new Date().getDate() - 14)).getTime();
    console.log(lastTwoWeek);
    admin.database().ref('analytics')
    .once('value',snapshot => {
        const allAnalytics = snapshot.val();
        var usersSet = {};
        for(let userId in allAnalytics){
            const analytics = allAnalytics[userId];
            var counterTypes = {};
            var counterVideos = {};
            var challengeCounter = {};

            if(analytics && analytics.clickVideo){
                for(let id in analytics.clickVideo){
                    const {type,videoId,datetime} = analytics.clickVideo[id];
                    if(datetime > lastTwoWeek){
                        if(!counterTypes[type]) counterTypes[type] = 0;
                        if(!counterVideos[videoId]) counterVideos[videoId] = 0;
                        counterTypes[type] ++;
                        counterVideos[videoId] ++;
                    } else {
                        allAnalytics[userId] = null;
                    }
                }
            }

            if(analytics && analytics.clickChallenge){
                for(let cId in analytics.clickChallenge){
                    const {tagTypes,id,datetime} = analytics.clickChallenge[cId];
                    if(datetime){
                        if(tagTypes){
                            for(let index in tagTypes) {
                                const type = tagTypes[index];
                                if(!counterTypes[type]) counterTypes[type] = 0;
                                counterTypes[type] ++;
                            }
                        }
                        if(!challengeCounter[id]) challengeCounter[id] = 0;
                        challengeCounter[id] ++;
                    } else {
                        allAnalytics[userId] = null;
                    }

                }
            }

            var calcTypes = calculation(counterTypes)
            var calcVideo = calculation(counterVideos)
            var calcChallenge = calculation(challengeCounter)

            usersSet[userId] = {preference :{ calcTypes, calcVideo,calcChallenge}}
            admin.database().ref('users/'+userId).update(usersSet[userId]);
        }

        admin.database().ref('analytics').update(allAnalytics)
    })

}

function calculation(array) {
    var max = 0;
    var first = '', second = '', third = '';
    let count = 0;
    for(let item in array){
        if(count === 1) first = item;
        if(count === 2) second = item;
        if(count === 3) third = item;
        count++;
        if(count > 3) break;
    }
    for(let item in array){
        if(array[item] > max){
            if(first != item){
                max = array[item];
                third = second;
                second = first;
                first = item;
            }
        }
    }

    return {first,second,third}
}

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
