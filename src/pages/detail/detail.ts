import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {AngularFirestoreCollection} from "angularfire2/firestore";
import {ToDo} from "../../models/todo";

/**
 * Generated class for the DetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  public todo: ToDo;
  public postCollection: AngularFirestoreCollection<ToDo>;
  public comments: Observable<any[]>;
  public commentText: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.todo = navParams.get('todo');
    this.postCollection = navParams.get('todoCollection');

    this.comments = this.postCollection
      .doc(this.todo.id)
      .collection("comments")
      .valueChanges();
  }

}
