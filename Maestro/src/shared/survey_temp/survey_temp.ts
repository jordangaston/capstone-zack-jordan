import {Component, ViewChild, Input} from '@angular/core';
import {Slides, LoadingController, Loading} from 'ionic-angular';
import { NavController } from 'ionic-angular';
import { UserPage } from "../../pages/user/user"
import {SurveyService} from "../../providers/survey/survey.service";

@Component({
  selector: 'survey-temp',
  templateUrl: 'survey_temp.html'
})
export class SurveyTemp {
  survey = [];
  users_answers: any = [];
  @ViewChild(Slides) slides: Slides;
  radioValue: number;
  @Input() survey_id: string;
  @Input() navigate: Component;
  @Input() hideSection: boolean;
  @Input() from_session_survey: boolean;
  loading: Loading;
  loaded: boolean;
  @Input() session = [];


  constructor(private nav: NavController, private survey_service:SurveyService, private loader: LoadingController) {
    this.showLoading();
  }

  getSurvey(){
    this.survey_service.getSurvey(this.survey_id).then(result=>{
      this.survey = result.questions;
      this.loading.dismiss();
      this.loaded = true;
    }).catch(err=>{
      throw err;
    })
  }

  showLoading(){
    this.loaded = false;
    this.loading = this.loader.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  ngOnInit(){

    this.getSurvey();
    this.slides.lockSwipeToNext(true);
    this.slides.lockSwipeToPrev(true);
  }

  nextSlide(question_id, question_title, section) {
    this.users_answers.push({question_title: question_title ,question_id: question_id, answer: this.radioValue, section: section});
    console.log(this.users_answers); //Testing
    this.slides.lockSwipeToNext(false);
    this.slides.slideNext();
    this.slides.lockSwipeToNext(true);
  }

  prevSlide() {
    this.users_answers.pop();
    console.log(this.users_answers); //Testing
    this.slides.lockSwipeToPrev(false);
    this.slides.slidePrev();
    this.slides.lockSwipeToPrev(true);
  }

  saveSurvey(question_id, question_title, section){
    this.users_answers.push({question_title: question_title ,question_id: question_id, answer: this.radioValue, section: section});
    console.log(this.users_answers);
    this.nav.setRoot(this.navigate, {
      answers: this.users_answers,
      from_session_survey: this.from_session_survey,
      session: this.session
    });
  }

}