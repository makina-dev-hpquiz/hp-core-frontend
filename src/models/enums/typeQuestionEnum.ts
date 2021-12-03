export enum TypeQuestion {
    QUESTION = "QUESTION",
    QCM = "QCM",
    LEXICAL = "LEXICAL",
    CHAUDRON = "CHAUDRON",
    DEBAT = "DEBAT",
    SPEECH = "SPEECH",
    GAGE = "GAGE",
    VRAI_OU_FAUX = 'VRAI OU FAUX',
    AFFIRMATION = 'AFFIRMATION'
  }
  
  export const TypeQuestionList: string[] = Object.values(TypeQuestion);