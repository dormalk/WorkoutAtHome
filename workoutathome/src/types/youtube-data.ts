import { FileDetails } from "./file";

export interface YoutubeDetails extends FileDetails{
    categoryId: string;
    channelId: string;
    channelTitle: string
    defaultAudioLanguage: string;
    defaultLanguage: string;
    description: string;
    liveBroadcastContent: string;
    localized: {title: string, description:string};
    publishedAt: string;
    tags: string[];
    thumbnails: any;    
    title: string;
    videoId: string;
}