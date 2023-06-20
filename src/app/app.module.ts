import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { JsonDropdownComponent } from './json-dropdown/json-dropdown.component';

@NgModule({
  declarations: [
    AppComponent,
    JsonDropdownComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
