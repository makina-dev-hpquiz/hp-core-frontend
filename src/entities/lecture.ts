import { Artwork } from './artwork';

export class Lecture {

    id: number;

    public date: string;

    // @ManyToOne(() => Artwork)
    public artwork: Artwork;


    // @OneToMany(type => QuestionModel, question => question.lecture)
    // public questions: Array<QuestionModel>;

    public startPage: string;

    public endPage: string;

    public isInProgress: boolean;

    constructor() {
        this.date = new Date().toISOString();
        this.isInProgress = true;
    }
}
