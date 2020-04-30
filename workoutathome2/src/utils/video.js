export class Video {
    duration = {hours:{}, minutes:{}, seconds:{}};
    equipments = {Dumbbell:{checked:{}}, Mat: {checked:{}}};
    id;
    length;
    thumbnails;
    title;
    videoId;
    videoUrl;
    createBy;
}

export const convertDurationToString = (duration) => {
    return `${duration.hours}:${duration.minutes}:${duration.seconds}`
}