import { Component }                    from '@angular/core';
import { AlertController }              from 'ionic-angular';
import { IonicPage }                    from 'ionic-angular';
import { NavController }                from 'ionic-angular';
import { NavParams }                    from 'ionic-angular';
import { AngularFirestore }             from 'angularfire2/firestore';
import { AngularFirestoreCollection }   from 'angularfire2/firestore';
import { ToDo }                         from '../../models/todo';
import { Camera }                       from "@ionic-native/camera";
import { Geolocation }                  from '@ionic-native/geolocation';
import { NativeGeocoder }               from "@ionic-native/native-geocoder";
import { Location }                     from '../../models/location';
import { AngularFireStorage }           from "angularfire2/storage";
import { NativeGeocoderReverseResult }  from '@ionic-native/native-geocoder';

@IonicPage()
@Component({
  selector: 'page-add',
  templateUrl: 'add.html',
})
export class AddPage {

    public    todoCollection  : AngularFirestoreCollection<ToDo>;
    public    todoText        : string = "";
    private   previewImage    : string = "";
    public    addressString   : string = "";
    public    location        : Location;

  constructor(
    public    navCtrl         : NavController,
    public    navParams       : NavParams,
    private   camera          : Camera,
    private   alertCtrl       : AlertController,
    private   geolocation     : Geolocation,
    private   nativeGeocode   : NativeGeocoder,
    private   af              : AngularFirestore,
    private   afStorage       : AngularFireStorage
  ) {
    this.todoCollection = navParams.get('todoCollection');
  }

  addTodo() {
    let imageFileName = `${this.af.app.auth().currentUser.email}_${new Date().getTime()}.png`;

    let task = this.afStorage
      .ref(imageFileName)
      .putString(this.previewImage, 'base64', { contentType: 'image/png' });

    let uploadEvent = task.downloadURL();

    uploadEvent.subscribe((uploadImageUrl) => {
      this.todoCollection.add({
        name: this.todoText,
        done: false,
        author: this.af.app.auth().currentUser.email,
        imgUrl: uploadImageUrl,
        location: this.location
      } as ToDo).then(() => {
        this.todoText = "";
      });
    });

  }

  findGeolocation() {
    this.geolocation.getCurrentPosition().then((resp) => {
      resp.coords.latitude;
      resp.coords.longitude;
      console.log("My latitude: ", resp.coords.latitude);
      console.log("My longitude: ", resp.coords.longitude);
      this.findPosition(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  findPosition(lat: number, lng: number) {

    this.nativeGeocode.reverseGeocode(lat, lng)
      .then((result: NativeGeocoderReverseResult) => {
        console.log(JSON.stringify(result));
        this.location = result[0];
        this.addressString = this.location.administrativeArea + ", " + this.location.locality;
      })
      .catch((error: any) => console.log(error));
  }

  presentAlert() {
    let alert = this.alertCtrl.create({
      title: 'There was a problem with your request',
      subTitle: 'There was an error with your todo. Please try again.',
    });
    alert.present();
  }

  executeCamera() {
    this.camera
      .getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        cameraDirection: this.camera.Direction.BACK,
        correctOrientation: true
      })
      .then(imgBase64 => {
        this.previewImage = imgBase64
      });
  }
}
