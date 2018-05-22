import { Photos } from "src/app/shared/model/photos";

export class Albums {
    id: number;
    title: string;
    photos: Array<Photos> = new Array<Photos>();
}
