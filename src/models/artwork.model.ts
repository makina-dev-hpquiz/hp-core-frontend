import { Artwork } from 'src/entities/artwork';
import { Lecture } from 'src/entities/lecture';
import { DateUtils } from 'src/utils/date-utils';


export class ArtworkModel {

    private lectures: Lecture[];

    public id: number;
    public title: string;
    public type: string;

    public dateRecentLecture: Date;

    // constructor(public id: number, public title?: string, public type?: ArtworkType) { }

    constructor(artwork: Artwork) {
        this.id = artwork.id;
        this.title = artwork.title;
        this.type = artwork.type;
        this.dateRecentLecture = this.getDefaultDate();
    }

    public setLectures(lectures: Lecture[]) {
        this.lectures = lectures;
        this.determinateRecentLecture();
    }

    public determinateRecentLecture() {
        if (this.lectures && this.lectures.length > 0) {
            if (this.lectures.length > 1) {
                this.lectures.sort((lecture1: Lecture, lecture2: Lecture) =>
                    DateUtils.compare(lecture1.date, lecture2.date)
                );
            }
            this.dateRecentLecture = new Date(this.lectures[0].date);
        } else {
            this.dateRecentLecture = this.getDefaultDate();
        }
    }

    private getDefaultDate(){
        return new Date(2022, 1, 1, 0, 0, 1);
    }
}


