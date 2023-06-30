import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { DivDeptDDComponent } from './div-dept-dd/div-dept-dd.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import {
  MatAutocomplete,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { SubjCrseDdComponent } from './subj-crse-dd/subj-crse-dd.component';
import { MaterialSearchDDComponent } from './material-search-dd/material-search-dd.component';
import { SubjCrseMatDDComponent } from './subj-crse-mat-dd/subj-crse-mat-dd.component';

@NgModule({
  declarations: [AppComponent, DivDeptDDComponent, SubjCrseDdComponent],
  imports: [
    BrowserModule,
    NgbModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MaterialSearchDDComponent,
    SubjCrseMatDDComponent,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
