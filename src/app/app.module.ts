import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GcdComponent } from './gcd/gcd.component';
import { DropfileComponent } from './dropfile/dropfile.component';

@NgModule({
  declarations: [
    AppComponent,
    GcdComponent,
    DropfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
