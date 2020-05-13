
import React from 'react';


function friendsReword(count, {friendsCount}){
    return {
        name: `Invite ${count} frineds to workout`,
        isAchived: !!friendsCount && friendsCount >= count,
        code: `friends${count}`,
        desc: "Complete lease 50% from workout's duraion with more then one frined",
        medal: medal('./assets/medals/friends.svg', count, '#000000'),
        link: '/singles'
    }

}


function workoutReword(count, {workoutsCount}){
    return {
        name: `Do ${count} workouts`,
        isAchived: !!workoutsCount && workoutsCount >= count,
        code: `workout${count}`,
        desc: "Complete lease 50% from workout's duraion",
        medal: medal('./assets/medals/workout.svg', count, '#FF7C2E'),
        link: '/singles'
    }

}

function takeChallenge(count, {challengeCount}) {
    return {
        name: `Take ${count} challenges`,
        isAchived: !!challengeCount && challengeCount >= count,
        code: `challenge${count}`,
        desc: "Take a  challenge and complete lease one day",
        medal: medal('./assets/medals/challenge.svg', count, '#293D7C'),
        link: '/challenges'
    }
}

function addVideos(count, {addVideosCount}) {
    return {
        name: `Add ${count} video`,
        isAchived: !!addVideosCount && addVideosCount >= count,
        code: `addVideos${count}`,
        desc: "Help us add a new Youtube workout's video to our platform",
        medal: medal('./assets/medals/computer.svg', count, '#FF6187'),
        link: '/addVideo'
    }
}

function addChallenges(count, {addChallengesCount}) {
    return {
        name: `Create ${count} challenge`,
        isAchived: !!addChallengesCount && addChallengesCount >= count,
        code: `addVideos${count}`,
        desc: "Create new challenge on our platform and help others to be better",
        medal: medal('./assets/medals/plan.svg', count, '#FF6187'),
        link: '/addChallenge'
    }
}


function signIn({uid}){
    return {
        name: 'Create new user',
        isAchived: !!uid,
        code: 'signin',
        desc: 'SignIn with your Google account',
        medal: medal('./assets/medals/newuser.svg', ''),
        func: (callback) => callback() 
    }

}

export const Rewords = [
    (user) => signIn(user),
    (user) => workoutReword(1,user),
    (user) => takeChallenge(1,user),
    (user) => friendsReword(1,user),
    (user) => addVideos(1,user),
    (user) => addChallenges(1,user),
    (user) => workoutReword(3,user),
    (user) => addVideos(3,user),
    (user) => friendsReword(5,user),
    (user) => addChallenges(3,user),
    (user) => takeChallenge(3,user),
    (user) => workoutReword(10,user),
    (user) => addVideos(5,user),
    (user) => takeChallenge(5,user),
    (user) => friendsReword(10,user),
    (user) => addVideos(10,user),
    (user) => addChallenges(5,user),
    (user) => workoutReword(20,user),
    (user) => takeChallenge(7,user),
    (user) => addVideos(15,user),
    (user) => friendsReword(20,user),
    (user) => addChallenges(7,user),
    (user) => workoutReword(50,user),
    (user) => addVideos(20,user),
    (user) => friendsReword(50,user),
    (user) => addChallenges(10,user),
    (user) => takeChallenge(10,user),
    (user) => workoutReword(75,user),
    (user) => addChallenges(13,user),
    (user) => addVideos(30,user),
    (user) => takeChallenge(15,user),
    (user) => addChallenges(18,user),
    (user) => friendsReword(100,user),
    (user) => addVideos(40,user),
    (user) => addChallenges(25,user),
    (user) => workoutReword(100,user),
    (user) => takeChallenge(20,user),
    (user) => addChallenges(32,user),
    (user) => addVideos(60,user),
    (user) => friendsReword(150,user),
    (user) => addChallenges(40,user),
    (user) => friendsReword(225,user),
    (user) => addVideos(85,user),
    (user) => workoutReword(150,user),
    (user) => addChallenges(50,user),
    (user) => takeChallenge(25,user),
    (user) => addVideos(115,user),
    (user) => workoutReword(300,user),
    (user) => addVideos(150,user),
    (user) => friendsReword(300,user),
]


const medal = (url, label,color) => {
    return(    <a style={{position:"relative", display: 'inline-block'}}>
                    <img src={url} alt="medal" width="45"  className="media-object" />
                    <span style={{position: "absolute",color, bottom: "0px", fontWeight: 'bolder', backgroundColor: 'white', borderRadius: "5px", padding: '1px 2px'}}>{label}</span>
                </a>)
}