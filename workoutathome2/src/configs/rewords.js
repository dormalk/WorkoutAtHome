
import React from 'react';


function friendsReword(count, {frinedsCount}){
    return {
        name: `Invite ${count} frineds to workout`,
        isAchived: !!frinedsCount && frinedsCount >= count,
        code: `friends${count}`,
        desc: "Complete lease 50% from workout's duraion with more then one frined",
        medal: medal('./assets/medals/friends.svg', count, '#000000'),
    }

}


function workoutReword(count, {workoutsCount}){
    return {
        name: `Do ${count} workouts`,
        isAchived: !!workoutsCount && workoutsCount >= count,
        code: `workout${count}`,
        desc: "Complete lease 50% from workout's duraion",
        medal: medal('./assets/medals/workout.svg', count, '#26a69a')
    }

}

function takeChallenge(count, {challengeCount}) {
    return {
        name: `Take ${count} challenges`,
        isAchived: !!challengeCount && challengeCount >= count,
        code: `challenge${count}`,
        desc: "Take a  challenge and complete lease one day",
        medal: medal('./assets/medals/challenge.svg', count, '#293D7C')

    }
}

function signIn({uid}){
    return {
        name: 'Create new user',
        isAchived: !!uid,
        code: 'signin',
        desc: 'SignIn with your Google account',
        medal: medal('./assets/medals/newuser.svg', '')
    }

}

export const Rewords = [
    (user) => signIn(user),
    (user) => workoutReword(1,user),
    (user) => takeChallenge(1,user),
    (user) => friendsReword(1,user),
    (user) => workoutReword(3,user),
    (user) => friendsReword(5,user),
    (user) => takeChallenge(3,user),
    (user) => workoutReword(10,user),
    (user) => takeChallenge(5,user),
    (user) => friendsReword(10,user),
    (user) => workoutReword(20,user),
    (user) => takeChallenge(7,user),
    (user) => friendsReword(20,user),
    (user) => workoutReword(50,user),
    (user) => friendsReword(50,user),
    (user) => takeChallenge(10,user),
    (user) => workoutReword(75,user),
    (user) => takeChallenge(15,user),
    (user) => friendsReword(100,user),
    (user) => workoutReword(100,user),
    (user) => takeChallenge(20,user),
    (user) => friendsReword(150,user),
    (user) => friendsReword(225,user),
    (user) => workoutReword(150,user),
    (user) => takeChallenge(25,user),
    (user) => workoutReword(300,user),
    (user) => friendsReword(300,user),
]


const medal = (url, label,color) => {
    return(    <a style={{position:"relative", display: 'inline-block'}}>
                    <img src={url} alt="medal" width="45"  className="media-object" />
                    <span style={{position: "absolute",color, bottom: "0px", fontWeight: 'bolder', backgroundColor: 'white', borderRadius: "5px", padding: '1px 2px'}}>{label}</span>
                </a>)
}