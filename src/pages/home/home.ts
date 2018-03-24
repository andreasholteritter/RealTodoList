import { Component } from '@angular/core';
import {FabContainer, NavController} from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ToDo } from '../../models/todo';

import { AddPage } from "../add/add";
import { DetailPage } from "../detail/detail";
import { HomePostviewPage} from "../home-postview/home-postview";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public collection: AngularFirestoreCollection<any>;
  public todos: Observable<ToDo[]>;
  public classPage: string = 'image-view';
  public classTab: string = 'apps';
  public viewModel: string = 'image-view';

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
        fab.close();
        this.viewModel = "image-view";
        console.log("image-view is " + this.viewModel);
        break;
      case "home-postview":
        fab.close();
        this.viewModel = "post-view";
        console.log("post-view is " + this.viewModel);
        break;
      default:
        fab.close();
        break;
    }
  }
}
