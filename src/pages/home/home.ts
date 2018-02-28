import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ToDo } from '../../models/todo';

import { AddPage } from "../add/add";
import { DetailPage } from "../detail/detail";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public collection: AngularFirestoreCollection<ToDo>;
  public todos: Observable<ToDo[]>;

  constructor(
    public navCtrl: NavController,
    private af: AngularFirestore) {

    this.collection = af.collection<ToDo>("todos");
    this.todos = this.collection.snapshotChanges()
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

  pushAddPage() {
  this.navCtrl.push(AddPage);
}

  pushDetailPage(todo: ToDo) {
    this.navCtrl.push(DetailPage), {
      todo,
      postCollection: this.collection
    };
  }

}
