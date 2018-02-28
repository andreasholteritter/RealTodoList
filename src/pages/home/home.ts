import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ToDo } from '../../models/todo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public collection: AngularFirestoreCollection<ToDo>;
  public posts: Observable<ToDo[]>;

  constructor(
    public navCtrl: NavController,
    private af: AngularFirestore) {

    this.collection = af.collection<ToDo>("todos");
    this.posts = this.collection.snapshotChanges()
      .map(actions =>  {
        return actions.map(action => {
          let data = action.payload.doc.data() as ToDo;
          let idt = action.payload.doc.id;

          return {
            idt,
            ...data
          };
        })
      });

  }

  logout() {
    this.af.app.auth().signOut();
  }

}
