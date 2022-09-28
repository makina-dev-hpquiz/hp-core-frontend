import { Lecture } from 'src/entities/lecture';
import { v4 as uuidv4 } from 'uuid';

export class QuestionModel {

    public id: string;
    public dateOfCreation: string;

    public type: string;
    public difficulty: string;
    public nbPlayer: number;
    public particularity: string;
    public question: string;
    public answer: string;

    public lecture: Lecture;

    constructor() {
        this.id = uuidv4();
        this.dateOfCreation = new Date().toISOString();
     }

}
