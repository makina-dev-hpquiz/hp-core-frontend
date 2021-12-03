export class QuestionModel {
 
    constructor(
        public id: string,
        public type: string,
        public difficulty: string,
        public nbPlayer: number,
        public particularity: string,
        public question: string,
        public answer: string

    ) {}

}