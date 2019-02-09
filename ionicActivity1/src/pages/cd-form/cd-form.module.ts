import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CdFormPage } from './cd-form';

@NgModule({
  declarations: [
    CdFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CdFormPage),
  ],
})
export class CdFormPageModule {}
