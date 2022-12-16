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

INSERT or IGNORE INTO artwork(id, title, type) VALUES (1 'Le seigneur des anneaux 1', 'Film');
INSERT or IGNORE INTO artwork(id, title, type) VALUES (2 'Le Hobbit', 'Film');
INSERT or IGNORE INTO artwork(id, title, type) VALUES (3 'Harry Potter 7', 'Film');
INSERT or IGNORE INTO lecture(id, date, start, end, is_progress, artwork_id) VALUES (1, '2022-09-05T14:00:00.000Z', '', '', true, 2);
INSERT or IGNORE INTO lecture(id, date, start, end, is_progress, artwork_id) VALUES (1, '2022-10-05T14:00:00.000Z', '', '', true, 2);
INSERT or IGNORE INTO lecture(id, date, start, end, is_progress, artwork_id) VALUES (1, '2022-08-05T14:00:00.000Z', '', '', true, 2);
INSERT or IGNORE INTO lecture(id, date, start, end, is_progress, artwork_id) VALUES (1, '2020-10-05T14:00:00.000Z', '', '', true, 3);
