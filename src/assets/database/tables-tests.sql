CREATE TABLE IF NOT EXISTS artwork(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, type TEXT);
CREATE TABLE IF NOT EXISTS lecture (id INTEGER PRIMARY KEY AUTOINCREMENT, date TEXT, start TEXT, end TEXT, is_progress BOOLEAN, artwork_id INTEGER, FOREIGN KEY (artwork_id) 
    REFERENCES artwork (id) 
         ON DELETE CASCADE 
         ON UPDATE NO ACTION
);
CREATE TABLE IF NOT EXISTS question (id INTEGER PRIMARY KEY AUTOINCREMENT, question TEXT, answer TEXT, type TEXT, difficulty TEXT, nb_player INTEGER, particularity TEXT, isCreated TEXT, isUpdated TEXT, lecture_id INTEGER, FOREIGN KEY (lecture_id) 
    REFERENCES lecture (id) 
         ON DELETE CASCADE 
         ON UPDATE NO ACTION
);
CREATE TABLE IF NOT EXISTS groups (id INTEGER PRIMARY KEY AUTOINCREMENT, lecture_id INTEGER, FOREIGN KEY (lecture_id) 
    REFERENCES lecture (id) 
         ON DELETE CASCADE 
         ON UPDATE NO ACTION
);
CREATE TABLE IF NOT EXISTS groups_question (groups_id INTEGER, question_id INTEGER, PRIMARY KEY (groups_id, question_id),
FOREIGN KEY (groups_id) 
    REFERENCES groups (id) 
         ON DELETE CASCADE 
         ON UPDATE NO ACTION,
   FOREIGN KEY (question_id) 
      REFERENCES question (id) 
         ON DELETE CASCADE 
         ON UPDATE NO ACTION
);

DELETE FROM artwork;
DELETE FROM lecture;
DELETE FROM question;
INSERT or IGNORE INTO artwork(id, title, type) VALUES (1 'Le seigneur des anneaux 1', 'Film');
INSERT or IGNORE INTO artwork(id, title, type) VALUES (2 'Le Hobbit', 'Film');
INSERT or IGNORE INTO artwork(id, title, type) VALUES (3 'Harry Potter 7', 'Film');
INSERT or IGNORE INTO artwork(id, title, type) VALUES (4 'Harry Potter 1', 'Film');
INSERT or IGNORE INTO lecture(id, date, start, end, is_progress, artwork_id) VALUES (1, '2022-09-05T14:00:00.000Z', '', '', true, 2);
INSERT or IGNORE INTO lecture(id, date, start, end, is_progress, artwork_id) VALUES (2, '2022-10-05T14:00:00.000Z', '', '', true, 2);
INSERT or IGNORE INTO lecture(id, date, start, end, is_progress, artwork_id) VALUES (3, '2022-08-05T14:00:00.000Z', '', '', true, 2);
INSERT or IGNORE INTO lecture(id, date, start, end, is_progress, artwork_id) VALUES (4, '2020-10-05T14:00:00.000Z', '', '', true, 3);
INSERT or IGNORE INTO lecture(id, date, start, end, is_progress, artwork_id) VALUES (5, '2022-12-19T14:00:00.000Z', '', '', true, 4);

INSERT or IGNORE INTO question(id, question, answer, type, difficulty, nb_player, particularity, isCreated, isUpdated, lecture_id) VALUES (1, 'Comment s\’appelle le copain Roux d\’Harry Potter?', 'Ronald Weasley', 'QUESTION', 'FACILE', null, 'aucun', '2022-12-19T09:34:22.014Z', '2022-12-19T09:34:22.014Z', 5);
INSERT or IGNORE INTO question(id, question, answer, type, difficulty, nb_player, particularity, isCreated, isUpdated, lecture_id) VALUES (2, 'Quel est l\’animal d\’Harry Potter', 'Une chouette/Un rat/Un crapaud/Un chat', 'QCM', 'FACILE', null, 'aucun', '2022-12-19T09:36:22.014Z', '2022-12-19T09:36:22.014Z', 5);
INSERT or IGNORE INTO question(id, question, answer, type, difficulty, nb_player, particularity, isCreated, isUpdated, lecture_id) VALUES (3, 'Quels sont les animaux de compagnies possible pour un sorcier?', 'Une chouette, un hibou, un rat, un crapaud, un chat', 'LEXICAL', 'MOYEN', null, 'aucun', '2022-12-19T09:38:22.014Z', '2022-12-19T09:38:22.014Z', 5);
INSERT or IGNORE INTO question(id, question, answer, type, difficulty, nb_player, particularity, isCreated, isUpdated, lecture_id) VALUES (4, 'Dans mon chaudron, j\’ai des sortilèges !', '', 'CHAUDRON', 'MOYEN', null, 'aucun', '2022-12-19T09:39:22.014Z', '2022-12-19T09:39:22.014Z', 5);
INSERT or IGNORE INTO question(id, question, answer, type, difficulty, nb_player, particularity, isCreated, isUpdated, lecture_id) VALUES (5, 'Plutôt pour une chouette ou un chat comme animal de compagnie?', '', 'DEBAT', 'MOYEN', null, 'aucun', '2022-12-19T09:40:22.014Z', '2022-12-19T09:40:22.014Z', 5);
INSERT or IGNORE INTO question(id, question, answer, type, difficulty, nb_player, particularity, isCreated, isUpdated, lecture_id) VALUES (6, 'Le joueur X mime Vernon en colère au zoo', '', 'SPEECH', 'DIFFICILE', null, 'aucun', '2022-12-19T09:41:22.014Z', '2022-12-19T09:41:22.014Z', 5);
INSERT or IGNORE INTO question(id, question, answer, type, difficulty, nb_player, particularity, isCreated, isUpdated, lecture_id) VALUES (7, 'Tous les joueurs doivent lever la main avant de parler', '', 'GAGE', 'DIFFICILE', null, 'aucun', '2022-12-19T09:42:22.014Z', '2022-12-19T09:42:22.014Z', 5);
INSERT or IGNORE INTO question(id, question, answer, type, difficulty, nb_player, particularity, isCreated, isUpdated, lecture_id) VALUES (8, 'Le nom de la chouette d’Harry Potter est Hedwige.', 'Vrai', 'VRAI OU FAUX', 'DIFFICILE', null, 'aucun', '2022-12-19T09:43:22.014Z', '2022-12-19T09:43:22.014Z', 5);
INSERT or IGNORE INTO question(id, question, answer, type, difficulty, nb_player, particularity, isCreated, isUpdated, lecture_id) VALUES (9, 'Voldemort est le meilleur pote d\’Harry Potter ou Voldemort est le pire ennemi d\’Harry Potter', 'Voldemort est le pire ennemi d’Harry Potter.', 'AFFIRMATION', 'FACILE', null, 'aucun', '2022-12-19T09:44:22.014Z', '2022-12-19T09:44:22.014Z', 5);
INSERT or IGNORE INTO question(id, question, answer, type, difficulty, nb_player, particularity, isCreated, isUpdated, lecture_id) VALUES (10, 'Comment s\’appelle la tante d\’Harry Potter?', 'Pétunia', 'QUESTION', 'MOYEN', null, 'aucun', '2022-12-19T09:45:22.014Z', '2022-12-19T09:45:22.014Z', 5);
INSERT or IGNORE INTO question(id, question, answer, type, difficulty, nb_player, particularity, isCreated, isUpdated, lecture_id) VALUES (11, 'Comment s\’appelle l\’oncle d\’Harry Potter?', 'Vernon', 'QUESTION', 'MOYEN', null, 'aucun', '2022-12-19T09:46:22.014Z', '2022-12-19T09:46:22.014Z', 5);
INSERT or IGNORE INTO question(id, question, answer, type, difficulty, nb_player, particularity, isCreated, isUpdated, lecture_id) VALUES (12, 'Comment s\’appelle la meilleure amie d\’Harry Potter?', 'Hermione Granger', 'QUESTION', 'FACILE', 4, 'alcool', '2022-12-19T09:47:22.014Z', '2022-12-19T09:47:22.014Z', 5);
INSERT or IGNORE INTO question(id, question, answer, type, difficulty, nb_player, particularity, isCreated, isUpdated, lecture_id) VALUES (13, 'Comment s\’appelle le pire ennemi d\’Harry Potter?', 'Voldemort', 'QUESTION', 'FACILE', null, 'aucun', '2022-12-19T09:48:22.014Z', '2022-12-19T09:48:22.014Z', 5);