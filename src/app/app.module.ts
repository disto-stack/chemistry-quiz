import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire';
import { AppRoutingModule } from './app.routing.module';
import { PagesModule } from './pages/pages.module';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { PagesRoutingModule } from './pages/pages.routing.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesRoutingModule,
    PagesModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
