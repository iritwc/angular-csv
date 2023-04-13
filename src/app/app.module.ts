import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GcdComponent } from './gcd/gcd.component';
import { DropfileComponent } from './dropfile/dropfile.component';
import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [
    AppComponent,
    GcdComponent,
    DropfileComponent,
    MessagesComponent
  ],
  imports: [
      BrowserModule,
      FormsModule,
      AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
