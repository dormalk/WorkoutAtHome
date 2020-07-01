import { FileDetails } from "./file";

export interface VideoDetails  extends FileDetails{
    name: string;
    fullPath: string;
}