import { Component, OnInit } from '@angular/core';
import { Lecture } from 'src/entities/lecture';
import { LectureDaoService } from 'src/providers/dao/lecture-dao.service';
import { OrmService } from 'src/providers/orm.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(private ormService: OrmService, private lectureDao: LectureDaoService) { }

  public questions;

  public difficulties;
  public selectedDifficulty;
  public difficultyColor = "green";
  public test: Lecture[];


  async ngOnInit() {
    await this.ormService.ready();
 



    this.questions = [{"nb" : 13, "type" : "Question"},
    {"nb" : 3, "type" : "QCM"},
    {"nb" : 2, "type" : "Lexical"},
    {"nb" : 1, "type" : "Chaudron"},
    {"nb" : 2, "type" : "Débat"},
    {"nb" : 1, "type" : "Speech"},
    {"nb" : 3, "type" : "Gage"},
    {"nb" : 3, "type" : "Vrai ou faux"},
    {"nb" : 3, "type" : "Affirmation"}                    
  ];


  this.difficulties = ["FACILE", "MOYEN", "DIFFICILE"];
  this.selectedDifficulty = this.difficulties[0];
  }


  async ionViewWillEnter(){
    console.log("##############")
    this.test = await this.lectureDao.findAllLectures();
    console.log(this.test);
    console.log("##############")
    console.log("ionViewWillEnter home")
  }


  public countNbOfAnswersForSelectedDifficulty(){
    var totalNbOfAnswers = 0;
   if(this.questions != undefined) {
    this.questions.forEach(question => {
      totalNbOfAnswers += question.nb;
    });
  }

    return totalNbOfAnswers;
  }

  public difficultyChange(event){
    this.selectedDifficulty = event.detail.value;
    switch(this.selectedDifficulty){
      case "FACILE" : 
        this.difficultyColor = "green";
      break;
      case "MOYEN" : 
        this.difficultyColor = "orange";
      break;
      case "DIFFICILE" : 
        this.difficultyColor = "red";
      break;
    }
  }

}
