import { BrowserModule }              from '@angular/platform-browser';
import { ErrorHandler, NgModule }     from '@angular/core';
import { IonicApp }                   from 'ionic-angular';
import { IonicErrorHandler }          from 'ionic-angular';
import { IonicModule }                from 'ionic-angular';
import { SplashScreen }               from '@ionic-native/splash-screen';
import { StatusBar }                  from '@ionic-native/status-bar';

import { AngularFireModule }          from 'angularfire2';
import { AngularFirestoreModule }     from 'angularfire2/firestore';
import { AngularFireAuthModule }      from 'angularfire2/auth';
import { AngularFireStorageModule }   from "angularfire2/storage";

import { MyApp }                      from './app.component';
import { HomePage }                   from '../pages/home/home';
import { AddPage }                    from '../pages/add/add';
import { DetailPage }                 from '../pages/detail/detail';

import env                            from './env';

import { Camera }                     from "@ionic-native/camera";
import { Geolocation }                from '@ionic-native/geolocation';
import { NativeGeocoder }             from '@ionic-native/native-geocoder';
import { GeocoderProvider }           from '../providers/geocoder/geocoder';

import { HttpProvider }               from '../providers/http/http';
import { PlacesProvider }             from '../providers/places/places';

import { HttpClientModule }           from "@angular/common/http";
import {HomePostviewPage} from "../pages/home-postview/home-postview";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddPage,
    DetailPage,
    HomePostviewPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false
    }),
    AngularFireModule.initializeApp(env),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddPage,
    DetailPage,
    HomePostviewPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide   : ErrorHandler,
      useClass  : IonicErrorHandler},
    Camera,
    Geolocation,
    GeocoderProvider,
    NativeGeocoder,
    HttpProvider,
    PlacesProvider,
  ]
})
export class AppModule {}
