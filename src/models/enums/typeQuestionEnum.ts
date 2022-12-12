export enum TypeQuestion {
    question = 'QUESTION',
    qcm = 'QCM',
    lexical = 'LEXICAL',
    chaudron = 'CHAUDRON',
    debat = 'DEBAT',
    speech = 'SPEECH',
    gage = 'GAGE',
    vraiOuFaux = 'VRAI OU FAUX',
    affirmation = 'AFFIRMATION'
  }

  export const typeQuestionList: string[] = Object.values(TypeQuestion);
