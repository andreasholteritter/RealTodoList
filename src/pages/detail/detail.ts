import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Observable} from "rxjs/Observable";
import {AngularFirestoreCollection} from "angularfire2/firestore";
import {ToDo} from "../../models/todo";
import { Comment } from "../../models/comment";

@IonicPage()
@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html',
})
export class DetailPage {

  public todo: ToDo;
  public todoCollection: AngularFirestoreCollection<any>;
  public comments: Observable<Comment[]>;
  public commentText: string = "";
  public todoBool = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.todo = navParams.get('todo');
    this.todoCollection = navParams.get('todoCollection');

    this.comments = this.todoCollection
      .doc(this.todo.id)
      .collection('comments')
      .snapshotChanges()
      .map(actions => {
        return actions.map(action => {
          let data = action.payload.doc.data() as Comment;
          let id = action.payload.doc.id;

          return {
            id,
            ...data
          };
        })
      });
  }

  addComment() {
    this.todoCollection
      .doc(this.todo.id)
      .collection("comments")
      .add({
        body: this.commentText
      });
  }

  remove() {
    this.todoCollection.doc(this.todo.id).delete();
    this.navCtrl.pop();
  }

  toggleDone(){
    console.log("changing");
    if (this.todoBool == false) {
      console.log("to good");
      this.todoCollection.doc(this.todo.id).update({ done: true });
      this.todoBool = true;
    } else {
      console.log("to bad");
      this.todoCollection.doc(this.todo.id).update({ done: false });
      this.todoBool = false;
    }
  }
}
