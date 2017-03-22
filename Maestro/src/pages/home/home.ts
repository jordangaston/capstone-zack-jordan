import {Component} from '@angular/core';
import {NavController, AlertController} from 'ionic-angular';
import {NewSessionPage} from '../new-session/new-session';
import {SessionInfoPage} from '../session-info/session-info';
import {SessionService} from "../../providers/sessions/session.service";
import {DatabaseService} from "../../providers/database/db.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  session_name = '';
  email = '';
  sessions = [];

  constructor(private nav: NavController, private alertCtrl: AlertController, private session_service: SessionService, private database_service: DatabaseService) {
    session_service.getPreviousSessions(5).then((sess) => {
      if (sess == null){
        this.sessions = [];
      } else {
        this.sessions = sess;
      }
    }).catch(err => {
      console.log("Error while getting previous sessions");
      throw err;
    })
  }

  /**
   * Navigates to New Session Page
   */
  newSession() {
    this.nav.push(NewSessionPage);
  }

  sessionInfo() {
    this.nav.push(SessionInfoPage);
  }

  deletePrompt() {
    let prompt = this.alertCtrl.create({
      title: 'Delete Session',
      message: "Are you sure you would like to delete this work session?",
      buttons: [
        {
          text: 'Yes',
          handler: data => {
            // Call session service and delete session
            console.log('Delete Session');
          }
        },
        {
          text: 'No',
          handler: data => {
            console.log('Cancel Delete Session');
          }
        }
      ]
    });
    prompt.present();
  }
}
