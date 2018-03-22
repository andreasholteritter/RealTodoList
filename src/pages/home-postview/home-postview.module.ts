import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePostviewPage } from './home-postview';

@NgModule({
  declarations: [
    HomePostviewPage,
  ],
  imports: [
    IonicPageModule.forChild(HomePostviewPage),
  ],
})
export class HomePostviewPageModule {}
