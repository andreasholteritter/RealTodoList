import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { ToDo } from '../../models/todo';

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

  public todoCollection: AngularFirestoreCollection<ToDo>;
  public todoText: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.todoCollection = navParams.get('todoCollection');
  }

  addTodo() {
    this.todoCollection.add({name: this.todoText, done: false } as ToDo);
  }

}
