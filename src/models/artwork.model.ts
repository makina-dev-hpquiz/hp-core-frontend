import { Artwork } from 'src/entities/artwork';
import { Lecture } from 'src/entities/lecture';
import { ArtworkType } from './enums/typeArtworkEnum';

export class ArtworkModel {

    public id: number;
    public title: string;
    public type: string;

    private lectures: Lecture[];
    public dateRecentLecture;

    // constructor(public id: number, public title?: string, public type?: ArtworkType) { }
    
    constructor(artwork: Artwork) {
        this.id = artwork.id;
        this.title = artwork.title;
        this.type = artwork.type;
    }

    setLectures(lectures: Lecture[]){
        this.lectures = lectures;
        this.determinateRecentLecture();
    }

    public determinateRecentLecture(){}
}
