export enum TypeQuestion {
    QUESTION,
    QCM,
    LEXICAL,
    CHAUDRON,
    DEBAT,
    SPEECH,
    GAGE,
    VRAI_OU_FAUX = 'VRAI OU FAUX',
    AFFIRMATION = 'AFFIRMATION'
  }
  
  export const TypeQuestionList: string[] = Object.keys(TypeQuestion);