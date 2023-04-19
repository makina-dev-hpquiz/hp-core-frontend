import { Artwork } from './artwork';
import { Question } from './question';

export class Lecture {

    id: number;

    public date: string;

    // @ManyToOne(() => Artwork)
    public artwork: Artwork;


    // @OneToMany(type => QuestionModel, question => question.lecture)
    public questions: Array<Question>;

    public startPage = '';

    public endPage = '';

    public isInProgress: boolean;

    constructor(id?: number) {
        if (id) {
            this.id = id;
        } else {
            this.date = new Date().toISOString();
            this.isInProgress = true;
        }

        this.questions = new Array();
    }
}
