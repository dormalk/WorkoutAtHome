import { FileDetails } from "./file";

export interface ImageDetails  extends FileDetails{
    name: string;
    fullPath: string;
}