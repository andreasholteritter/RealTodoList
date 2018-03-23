//TODO: CLean up, sort, and place imports
import { Component } from '@angular/core';
import {FabContainer, IonicPage, NavController, NavParams} from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ToDo } from '../../models/todo';

import { AddPage } from "../add/add";
import { DetailPage } from "../detail/detail";
import {HomePage} from "../home/home";

@IonicPage()
@Component({
  selector: 'page-home-postview',
  templateUrl: 'home-postview.html',
})
export class HomePostviewPage {
  public collection: AngularFirestoreCollection<any>;
  public todos: Observable<ToDo[]>;
  public classPage: string = 'post-view';
  public classTab: string = 'apps';

  constructor(
    public navCtrl: NavController,
    private af: AngularFirestore) {

    this.collection = af.collection<ToDo>("todos");
    this.todos = this.collection
      .snapshotChanges()
      .map(actions =>  {
        return actions.map(action => {
          let data = action.payload.doc.data() as ToDo;
          let id = action.payload.doc.id;

          return {
            id,
            ...data
          };
        })
      });

  }

  logout() {
    this.af.app.auth().signOut();
  }

  pushPageAdd(){
    this.navCtrl.push(AddPage, {
      todoCollection: this.collection
    });
  }

  pushPageDetail(todo: ToDo) {
    this.navCtrl.push(DetailPage, {
      todo,
      todoCollection: this.collection
    });
  }

  fabController(fabName: string, fab: FabContainer) {
    switch (fabName) {
      case "home":
        this.navCtrl.push(HomePage, {});
        fab.close();
        break;
      case "home-postview":
        fab.close();
        break;
      default:
        fab.close();
        break;
    }
  }
}
