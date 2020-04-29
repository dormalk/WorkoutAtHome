

export class Challenge {
    id;
    title;
    createBy;
    tagTypes = [];
    thumbnails;
    avgDuration = {hours: 0, minutes: 0}
    days = [[]]; //matrix day -> videoId 
}



export const getTagTypes = (challenge) => {
    var tags = [];
    console.log(challenge)
    challenge.days.forEach(day => {
        day.forEach(({type}) => {
            if(!tags.includes(type)) tags.push(type)
        })
    })
    return tags;
}

export const getDurationAvg = (challenge) => {
    var avg = 0;
    var counter = 0;
    challenge.days.forEach(day => {
        var totalDay = 0;
        day.forEach(({duration}) => {
            totalDay += duration.hours*60 + duration.minutes 
            counter++;
        })
        avg += totalDay;
    })
    avg /= counter;

    return {hours: Math.floor(avg/60), minutes: Math.floor(avg%60), seconds: 0}
}


export const convertDurationToString = (duration) => {
    if(duration.hours === 1){
        return `${duration.minutes} mins/day`
    } else {
        return `${duration.hours}:${duration.minutes} per day`
    }
}